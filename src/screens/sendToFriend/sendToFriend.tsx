import React from "react";
import {
    KeyboardAvoidingView,
    SafeAreaView,
    ScrollView,
    StyleSheet, Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import {Header} from "react-native-elements";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {SCREEN_WIDTH} from "../../shared/constants";
import {goBack, navigate} from "../../services/navigation";
import {PostDoc, User} from "../../modals";
import {
    createPost,
    discoverAllUsers,
    fetchAllUsers, getFollowingUsers,
    sendPollToFeed,
    sendPollToFriends
} from "../../services/firebase/firebaseService";
import {includes,map,startCase} from 'lodash';
import {uploadImageAndGetUrl} from "../../utils";
import {fetchLocalStorage} from "../../utils/local-storage";
import Loader from "../../shared/components/loader/loader";

interface ISendToFriendStates{
    postDoc:any;
    selectedFriends:string[],
    imageURI: string,
    followingFriends:User[],
    isAlertPoll:boolean,
    user:any,
    isLoading:boolean
}

class SendToFriend extends React.Component<any, ISendToFriendStates> {

    constructor(props) {
        super(props);
        this.state = {
            postDoc: null,
            selectedFriends:[],
            imageURI:'',
            followingFriends:[],
            isAlertPoll:false,
            user:"",
            isLoading:false
        }
    }

    componentDidMount() {
        const postDoc = this.props.route.params && this.props.route.params.postDoc
        const imageURI = this.props.route.params && this.props.route.params.imageURI
        const isAlertPoll = this.props.route.params && this.props.route.params.isAlertPoll;
        if(isAlertPoll){
            this.setState({isAlertPoll:isAlertPoll})
        }
        fetchLocalStorage("loggedUser").then(res => {
            this.setState({user:res,isLoading:true})
            this.getFollowingUsers(res);
        })
        this.setState({
            postDoc:postDoc,
            imageURI:imageURI
        })
    }

    private onSave = () => {
        const postDoc = this.state.postDoc;
        postDoc.DMList = this.state.selectedFriends;
        this.setState({isLoading:true})
        uploadImageAndGetUrl(this.state.imageURI).then(res => {
            postDoc.image = res
            createPost(postDoc).then(res => {
                this.setState({isLoading:false})
                navigate("home")
            }).catch(err => {
                this.setState({isLoading:false})
                console.log(err)
            })
        }).catch(err => {
            console.log(err)
        })
    }

    private sendPollToFriend= () => {
        const postDoc = this.state.postDoc;
        postDoc.DMList = this.state.selectedFriends;
        this.setState({isLoading:true})
        sendPollToFriends(this.state.postDoc).then(res => {
            this.setState({isLoading:false})
            navigate("home")
        }).catch(err => {

        })
    }

    private handleFriendsToSend = (userId:string) => {
        const selectedFriends = this.state.selectedFriends;
        if(includes(selectedFriends,userId)){
            let index = 0
            map(selectedFriends,(friend,i) => {
                if(friend === userId){
                    index = i
                }
            })
            selectedFriends.splice(index,1)
        }else{
            selectedFriends.push(userId)
        }
        this.setState({selectedFriends:selectedFriends})
    }

    private onSearch = (search: string) => {
        this.setState({
            isLoading:true
        })
        this.getFollowingUsers(search);
    }

    private getFollowingUsers = (search:string | null) =>{
        getFollowingUsers(this.state.user.userId).then(res => {
            this.setState({
                followingFriends:res,
                isLoading:false
            })
        }).catch(err => {
        })
    }


    render() {
        return (
            <View style={styles.container}>
                <KeyboardAvoidingView
                    style={styles.keyboardAvoidingViewContainer}
                    behavior="height"
                >
                    <Header
                        statusBarProps={{barStyle: "dark-content"}}
                        barStyle="dark-content"
                        containerStyle={{
                            display: "flex",
                            backgroundColor: "#0C0D34",
                        }}
                        leftComponent={<TouchableOpacity onPress={()=>{goBack()}}>
                            <Icon
                                name="close"
                                color="white"
                                size={22}
                            />
                        </TouchableOpacity>}
                        centerComponent={{
                            text: "Send to Friend",
                            style: {color: "#FFF", fontWeight: "bold"},
                        }}
                        rightComponent={
                            <TouchableOpacity onPress={this.state.isAlertPoll ? this.sendPollToFriend : this.onSave}>
                                <Text style={{color: "#FFF", fontWeight: "bold"}}>Send</Text>
                            </TouchableOpacity>
                        }
                    />
                    <Loader show={this.state.isLoading}/>
                    <ScrollView
                        style={{
                            backgroundColor: 'none'
                        }}
                    >
                        <View style={styles.searchWrapper}>
                            <View style={{
                                width: SCREEN_WIDTH - 30,
                                flexDirection: 'row',
                                alignItems: 'center',
                                borderBottomColor: "#ddd",
                                borderBottomWidth: 1
                            }}>
                                <View style={{
                                    width: 40,
                                    height: 40,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Icon name="magnify" size={24} color={"#ddd"}/>
                                </View>
                                <TextInput
                                    onChangeText={this.onSearch}
                                    autoFocus={false}
                                    style={{
                                        width: SCREEN_WIDTH - 30 - 50,
                                        height: 40,
                                        fontSize: 16
                                    }}
                                    placeholder={"Search"}
                                />
                            </View>
                        </View>
                        <View style={{marginLeft:15}}>
                            <Text style={styles.input_label}>SEARCH TO WHO YOU WANT TO SEND IT</Text>
                        </View>
                        {
                            map(this.state.followingFriends,friend => (
                                <View style={styles.searchWrapper}>
                                    <View style={{
                                        width: SCREEN_WIDTH - 30,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        borderBottomColor: "#ddd",
                                        borderBottomWidth: 1
                                    }}>
                                        <Text
                                            style={{
                                                width: SCREEN_WIDTH - 30 - 50,
                                                // height: 40,
                                                fontSize: 16
                                            }}
                                        >
                                            {startCase(friend.name)}
                                        </Text>
                                        <View style={{
                                            width: 40,
                                            height: 40,
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                            <Switch value={includes(this.state.selectedFriends,friend.userId)}  onValueChange={() => {this.handleFriendsToSend(friend.userId)}}/>
                                        </View>
                                    </View>
                                </View>
                            ))
                        }
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        );
    }
}

export default SendToFriend;
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        height:'100%'
    },
    keyboardAvoidingViewContainer: {
        position: "relative",
    },
    searchWrapper: {
        zIndex: 999,
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'center',
        height: 50,
        backgroundColor: '#fff',
        width: SCREEN_WIDTH
    },
    input_label: {
        color: '#a2a2a2',
        marginTop:10
    }
})

