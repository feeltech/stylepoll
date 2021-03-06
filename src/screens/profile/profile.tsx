import React from "react";
import {
    Image,
    KeyboardAvoidingView,
    SafeAreaView, ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import {Header, Icon} from "react-native-elements";
import {SCREEN_WIDTH, SCREEN_WIDTH_NEW} from "../../shared/constants";
import StoryBar from "../../shared/components/story/story-bar";
import WardrobeBar from "../../shared/components/wardrobe/wardrobe-bar";
import {PostDoc, User, WardRobe} from "../../modals";
import {
    getUserFollowers,
    getUserFollowings,
    getUserPolls,
    getUserPosts, getWardrobe,
    isFollowingUser
} from "../../services/firebase/firebaseService";
import {fetchLocalStorage, storeLocalStorage} from "../../utils/local-storage";
import {startCase,map,isEqual} from 'lodash'
import {goBack, navigate} from "../../services/navigation";
import {trackPromise} from "react-promise-tracker";
import {LawIcon} from "@primer/octicons-react";
import Loader from "../../shared/components/loader/loader";
import EditProfile from "./editProfile/editProfile";

interface IProfileStates {
    showWardrobe: boolean;
    posts: PostDoc[];
    user: any;
    profileUser: any;
    isFollowingUser: boolean,
    followings: User[],
    followers: User[],
    userPolls: PostDoc[],
    wardrobe: WardRobe[],
    isLoading:boolean,
    showEditProfile:boolean
}

interface IProfileProps {
    isUserProfile: boolean;
}

export default class Profile extends React.Component<any, IProfileStates> {

    private focusListener;
    private _isMounted = false
    constructor(props) {
        super(props);
        this.state = {
            showWardrobe: false,
            posts: [],
            user: '',
            isFollowingUser: false,
            followings: [],
            followers: [],
            userPolls: [],
            profileUser: '',
            wardrobe: [],
            isLoading:false,
            showEditProfile:false
        }
    }

    componentDidMount() {
        this._isMounted = true
        this.focusListener = this.props.navigation.addListener('focus', () => {
            const imageURL = this.props.route.params && this.props.route.params.imageUri ? this.props.route.params.imageUri : null;
            fetchLocalStorage("loggedUser").then(res => {

                if(this._isMounted){
                    const profileUser = res
                    if(imageURL){
                        profileUser.profileImage = imageURL
                    }
                    // if(updatedName){
                    //     profileUser.name = updatedName
                    // }
                    this.setState({
                        profileUser: profileUser,
                        isLoading:true
                    })

                    getUserPosts(profileUser.userId).then(res => {
                        const sortedPosts = res.sort(function compare(a, b) {
                            const dateA = a.createdAt.toDate()
                            const dateB = b.createdAt.toDate();
                            return dateB - dateA;
                        });
                        this.setState({posts: sortedPosts})
                    })

                    getUserFollowings(profileUser.userId).then(res => {
                        this.setState({
                            followings: res
                        })
                    })

                    getUserFollowers(profileUser.userId).then(res => {
                        this.setState({
                            followers: res
                        })
                    })

                    getUserPolls(profileUser.userId).then(res => {
                        this.setState({
                            userPolls: res,
                            isLoading:false
                        })
                    })


                    // isFollowingUser(res.userId, profileUser.userId).then(isFollowing => {
                    //     this.setState({
                    //         isFollowingUser: isFollowing,
                    //         user: res
                    //     })
                    // })

                    getWardrobe(profileUser.userId).then(res => {
                        this.setState({
                            wardrobe: res,
                            isLoading:false
                        })
                    })
                }

            })
        });

    }

    componentWillReceiveProps(nextProps: Readonly<any>, nextContext: any) {
        if(!isEqual(nextProps.route.params.imageUri,this.props.route.params ? this.props.route.params.imageUri : null)){
            this.setState({showEditProfile:true})
        }
    }

    private logout = () => {
        storeLocalStorage("loggedUser",null).then(()=>{
            navigate("login")
        })
    }

    componentWillMount() {
        this._isMounted = false
    }

    componentWillUnmount() {
        this.setState({showEditProfile:false})
        this.focusListener();
    }

    private onChangePicture = (name:string) => {
        this.setState({showEditProfile:false});
        navigate("edit-profile-camera",{name:name})
    }

    private onCloseModal = () => {
        fetchLocalStorage("loggedUser").then(res => {
            this.setState({
                showEditProfile:false,
                profileUser:res
            })
        })

    }

    render() {
        return (
            <View style={styles.container}>
                <Header
                    statusBarProps={{barStyle: "light-content"}}
                    barStyle="dark-content"
                    containerStyle={{
                        display: "flex",
                        backgroundColor: "#0C0D34",
                    }}
                    // leftComponent={<TouchableOpacity onPress={goBack}>
                    //     <Icon
                    //         name="chevron-left"
                    //         color="white"/>
                    // </TouchableOpacity>}
                    centerComponent={{
                        text: startCase(this.state.profileUser.name),
                        style: {color: "#FFF", fontWeight: "bold"},
                    }}
                    rightComponent={<TouchableOpacity onPress={this.logout}>
                        <Icon
                            name="logout"
                            color="white"/>
                    </TouchableOpacity>}
                />
                <Loader show={this.state.isLoading}/>
                <ScrollView style={{backgroundColor: 'none'}}>
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            margin: 10,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        <TouchableOpacity style={{flex: 1}} onPress={()=>{this.setState({showEditProfile:true})}}>
                            <Image
                                source={{uri: this.state.profileUser.profileImage}}
                                style={{borderRadius: 10, width: 75, height: 75}}
                            />
                        </TouchableOpacity>
                        <View style={{flex: 1}}>
                            <View style={{flexDirection: 'column', alignItems: 'center'}}>
                                <Text>{this.state.userPolls.length}</Text>
                                <Text>Poll</Text>
                            </View>
                        </View>
                        <View style={{flex: 1}}>
                            <View style={{flexDirection: 'column', alignItems: 'center'}}>
                                <Text>{this.state.posts.length}</Text>
                                <Text>Armadio</Text>
                            </View>
                        </View>
                        <View style={{flex: 1}}>
                            <View style={{flexDirection: 'column', alignItems: 'center'}}>
                                <Text>{this.state.followings.length}</Text>
                                <Text>Seguiti</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        margin: 10,
                        justifyContent: 'space-between'
                    }}>
                        <View style={{flex:1,flexDirection: 'column', alignItems: 'flex-start',justifyContent:'center'}}>
                            <Text style={{fontWeight:'bold',fontSize:15}}>{startCase(this.state.profileUser.name)}</Text>
                            {/*{this.state.followers.length != 0 &&*/}
                            {/*    <Text>{`Followed by ${this.state.followers[0]}and ${this.state.followers.length-1} others`}</Text>*/}
                            {/*}*/}
                        </View>
                        {/*<TouchableOpacity style={{flex:0,flexDirection: 'column', alignItems: 'center',justifyContent:'center',borderWidth:2,borderColor:'#004494',height:30}}>*/}
                        {/*    <Text style={{fontWeight:'bold',color:'#0b62d7',padding:30}}>Edit Profile</Text>*/}
                        {/*    /!*{this.state.followers.length != 0 &&*!/*/}
                        {/*    /!*    <Text>{`Followed by ${this.state.followers[0]}and ${this.state.followers.length-1} others`}</Text>*!/*/}
                        {/*    /!*}*!/*/}
                        {/*</TouchableOpacity>*/}
                    </View>
                    <View style={{
                        flex: 0,
                        flexDirection: 'row',
                        margin: 10,
                        justifyContent: 'space-between'
                    }}>
                        <View style={{flex: 1, flexDirection: 'column'}}>
                            <Text style={{fontWeight: 'bold', fontSize: 15}}>Il tuo armadio</Text>
                        </View>
                        <View style={{flex: 1, flexDirection: 'column', alignItems:'flex-end'}}>
                            <Switch value={this.state.showWardrobe} onValueChange={() => {
                                this.setState({showWardrobe: !this.state.showWardrobe})
                            }}/>
                        </View>
                        <View
                            style={{
                                borderBottomColor: 'black',
                                borderBottomWidth: 1,
                            }}
                        />
                    </View>
                    <View style={{borderColor:'#7c7c7c',borderWidth:0.3,marginLeft: 10,marginRight:10,marginBottom:5}}></View>
                    {this.state.showWardrobe && this.state.wardrobe.length != 0 &&
                    <View style={{flex: 1, marginBottom: 10}}>
                        <WardrobeBar posts={this.state.wardrobe}/>
                    </View>
                    }
                    {this.state.posts.length != 0 &&
                    <View style={{
                        flex: 5,
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                    }}>
                        {map(this.state.posts, post => {
                                return (
                                    <TouchableOpacity style={{ borderColor: 'white', borderWidth: 1,width: SCREEN_WIDTH_NEW/3, height: SCREEN_WIDTH_NEW/3}} onPress={ ()=>{navigate("post",{postId: post.postId,userId: post.user.userId})}}>
                                        <Image
                                            source={{uri: post.image}}
                                            style={{flex:1,width: undefined, height: undefined}}
                                        />
                                    </TouchableOpacity>
                                )
                            }

                        )}

                    </View>
                    }
                    {
                        this.state.posts.length == 0 &&
                        <View style={{flex:5,justifyContent:'center',alignItems:'center',flexDirection: 'column',}}>
                            <Text style={{color:"#3a464f",fontSize:25, fontWeight:'bold'}}>Ancora nessun Poll</Text>
                        </View>
                    }
                </ScrollView>
                <EditProfile
                    showEditProfile={this.state.showEditProfile}
                    onClose={this.onCloseModal}
                    name={this.state.profileUser.name}
                    image={this.state.profileUser.profileImage}
                    user={this.state.profileUser}
                    onChangePicture={this.onChangePicture}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        height: '100%'
    },
    keyboardAvoidingViewContainer: {
        position: "relative",
    },
    scrollContainer: {},
    loadingIcon: {
        position: "relative",
        height: 50,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    loginForm: {
        marginTop: 10,
        width: SCREEN_WIDTH * 0.9,
    },
    textInputWrapper: {
        position: 'relative',
        width: '100%',
        height: 44,
        borderRadius: 5,
        borderColor: '#ddd',
        borderWidth: 1,
        marginVertical: 7.5
    },
    dropDownWrapper: {
        width: '100%',
        borderRadius: 5,
        // borderColor: '#ddd',
        // borderWidth: 1,
        marginVertical: 7.5
    },
    centerContainer: {
        // height: SCREEN_HEIGHT - 50 - 40 - STATUS_BAR_HEIGHT,
        width: SCREEN_WIDTH,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        width: '100%',
        height: '100%',
        // paddingHorizontal: 15
    },
    input_label: {
        color: '#626060'
    },
    logoWrapper: {
        marginTop: 20
    },
    logo: {
        height: 300,
        width: 300,
        overflow: 'hidden'
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
    },
});
