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
import {
    followUser,
    getUserFollowers,
    getUserFollowings,
    getUserPolls,
    getUserPosts, getWardrobe,
    isFollowingUser, unFollowUser
} from "../../services/firebase/firebaseService";
import {PostDoc, User, WardRobe} from "../../modals";
import {startCase,map} from 'lodash';
import {fetchLocalStorage} from "../../utils/local-storage";
import {goBack, navigate} from "../../services/navigation";
import WardrobeBar from "../../shared/components/wardrobe/wardrobe-bar";
import Loader from "../../shared/components/loader/loader";

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
    isLoading:boolean
}

interface IProfileProps {
    isUserProfile: boolean;
}

export default class OtherUserProfile extends React.Component<any, IProfileStates> {
    private focusListener;
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
            wardrobe:[],
            isLoading:false
        }
    }

    componentDidMount() {
        const profileUser = this.props.route.params && this.props.route.params.user;
        this.setState({
            profileUser: profileUser,
            isLoading:true
        })
        this.focusListener = this.props.navigation.addListener('focus', () => {
            getUserPosts(profileUser.userId).then(res => {
                this.setState({posts: res})
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

            fetchLocalStorage("loggedUser").then(res => {
                isFollowingUser(res.userId, profileUser.userId).then(isFollowing => {
                    this.setState({
                        isFollowingUser: isFollowing,
                        user: res
                    })
                })

            })

            getWardrobe(profileUser.userId).then(res => {
                this.setState({
                    wardrobe:res,
                    isLoading:false
                })
            })});

    }

    private onFollowHandle = () => {
        this.setState({
            isLoading:true
        })
        if (this.state.isFollowingUser) {
            unFollowUser(this.state.user.userId, this.state.profileUser.userId).then(res => {
                this.setState({
                    isFollowingUser: false,
                    isLoading:false
                })
            })
        } else {
            followUser(this.state.user.userId, this.state.profileUser.userId).then(res => {
                this.setState({
                    isFollowingUser: true,
                    isLoading:false
                })
            })
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={{backgroundColor: 'none'}}>
                    <Header
                        statusBarProps={{barStyle: "light-content"}}
                        barStyle="dark-content"
                        containerStyle={{
                            display: "flex",
                            backgroundColor: "#0C0D34",
                        }}
                        leftComponent={<TouchableOpacity onPress={goBack}>
                            <Icon
                                name="chevron-left"
                                color="white"/>
                        </TouchableOpacity>}
                        centerComponent={{
                            text: startCase(this.state.profileUser.name),
                            style: {color: "#FFF", fontWeight: "bold"},
                        }}
                        rightComponent={this.props.isUserProfile ? (<TouchableOpacity>
                            <Text style={{color: "#45b5f3", fontWeight: "bold"}}>Edit</Text>
                        </TouchableOpacity>) : <View></View>}
                    />
                    <Loader show={this.state.isLoading}/>
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            margin: 10,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        <View style={{flex: 1}}>
                            <Image
                                source={{uri: this.state.profileUser.profileImage}}
                                style={{borderRadius: 10, width: 75, height: 75}}
                            />
                        </View>
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
                        flex: 0,
                        flexDirection: 'row',
                        margin: 10,
                    }}>
                        <View style={{flexDirection: 'column', alignItems: 'flex-start'}}>
                            <Text>{this.state.profileUser.name}</Text>
                            {/*{this.state.followers.length != 0 &&*/}
                            {/*    <Text>{`Followed by ${this.state.followers[0]}and ${this.state.followers.length-1} others`}</Text>*/}
                            {/*}*/}
                        </View>
                    </View>

                    <View style={{
                        flex: 0,
                        flexDirection: 'row',
                        margin: 10,
                        justifyContent: 'space-between'
                    }}>
                        <View style={{flex: 1, flexDirection: 'column'}}>
                            <TouchableOpacity style={{
                                borderColor: '#888888',
                                borderWidth: 0.8,
                                alignItems: 'center',
                                marginRight: 3,
                                padding: 3
                            }} onPress={this.onFollowHandle} disabled={this.state.user.userId === this.state.profileUser.userId}>
                                <Text style={{fontSize: 12}}>{this.state.isFollowingUser ? 'Smetti di seguire' : 'Seguire'}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{flex: 1, flexDirection: 'column'}}>
                            <TouchableOpacity style={{
                                borderColor: '#888888',
                                borderWidth: 0.8,
                                alignItems: 'center',
                                marginLeft: 3,
                                padding: 3
                            }} onPress={() => {
                                this.setState({showWardrobe: !this.state.showWardrobe})
                            }}>
                                <Text style={{fontSize: 12}}>Mostra l'armadio</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{borderColor:'black',borderWidth:1}}></View>
                    {this.state.showWardrobe && this.state.wardrobe.length != 0 &&
                    <View style={{flex: 1, margin: 10}}>
                        <WardrobeBar posts={this.state.wardrobe}/>
                    </View>
                    }
                    {this.state.posts.length != 0 &&
                    <View style={{
                        flex: 5,
                        flexDirection: 'row',
                        flexWrap: 'wrap'
                    }}>
                        {map(this.state.posts, post => {
                            return (
                                <TouchableOpacity style={{borderColor: 'white', borderWidth: 1,width: SCREEN_WIDTH_NEW/3, height: SCREEN_WIDTH_NEW/3}} onPress={ ()=>{navigate("post",{postId: post.postId,userId: post.user.userId})}}>
                                    <Image
                                        source={{uri: post.image}}
                                        style={{flex:1,height:undefined,width:undefined}}
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
