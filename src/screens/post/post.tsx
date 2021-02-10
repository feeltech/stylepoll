import React from "react";
import {KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Header, Icon} from "react-native-elements";
import {POST_LIST, SCREEN_HEIGHT, SCREEN_WIDTH} from "../../shared/constants";
import PostItem from "../../shared/components/post-list/postItem";
import {goBack, navigate} from "../../services/navigation";
import {fetchLocalStorage} from "../../utils/local-storage";
import {followUser, getPost, isFollowingUser, unFollowUser} from "../../services/firebase/firebaseService";
import {PostDoc} from "../../modals";
import {startCase} from 'lodash';

interface IPostStates {
    userId: string,
    postId: string,
    post:PostDoc| null,
    userIsFollowing:boolean,
    user:any
}

export default class Post extends React.Component<any, IPostStates> {
    private focusListener;

    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            postId: '',
            post:null,
            userIsFollowing:false,
            user:"any"
        }
    }

    componentDidMount() {
        const userId = this.props.route.params && this.props.route.params.userId;
        const postId = this.props.route.params && this.props.route.params.postId
        this.setState({
            userId: userId,
            postId: postId
        })

        this.focusListener = this.props.navigation.addListener('focus', () => {
            getPost(userId,postId).then(res => {
                this.setState({
                    post:res
                })
            }).catch(err => {
                console.log("Failed to fetch post ",err)
            })

            fetchLocalStorage("loggedUser").then(res => {
                if(res){
                    isFollowingUser(res.userId,userId).then(isFollowing => {
                        this.setState({
                            user:res,
                            userIsFollowing:isFollowing
                        })
                    })
                }

            })
        });

    }


    private onFollowHandle = () => {
        if(this.state.userIsFollowing){
            unFollowUser(this.state.user.userId,this.state.userId).then(res => {
                this.setState({
                    userIsFollowing:false
                })
            })
        }else{
            followUser(this.state.user.userId,this.state.userId).then(res => {
                this.setState({
                    userIsFollowing:true
                })
            })
        }
    }

    private isUserPost = () => {
        if(this.state.user.userId === this.state.post?.user.userId){
            return true
        }else {
            return false
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView style={{backgroundColor: 'none'}}>
                    <Header
                        statusBarProps={{barStyle: "dark-content"}}
                        barStyle="dark-content"
                        containerStyle={{
                            display: "flex",
                            backgroundColor: "#ffffff",
                        }}
                        leftComponent={<TouchableOpacity onPress={goBack}>
                            <Icon
                                name="chevron-left"
                                color="black"/>
                        </TouchableOpacity>}
                        centerComponent={<View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <Text style={{fontSize: 10}}>{startCase(this.state.post?.user.name)}</Text>
                            </View>
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <Text style={{fontSize: 15, fontWeight: 'bold'}}>Posts</Text>
                            </View>
                        </View>}
                        rightComponent={this.isUserPost() ? <View/> :<TouchableOpacity onPress={this.onFollowHandle}>
                            <Text style={{color: "#45b5f3", fontWeight: "bold"}}>{this.state.userIsFollowing ? 'Unfollow' : 'Follow'}</Text>
                        </TouchableOpacity>}
                    />
                    <View>
                        <PostItem
                            key={1} item={POST_LIST[0]} post={this.state.post}/>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
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
    searchWrapper: {
        zIndex: 999,
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'center',
        height: 50,
        backgroundColor: '#fff',
        width: SCREEN_WIDTH
    }
})

