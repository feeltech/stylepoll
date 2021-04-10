import React from "react";
import {
    Image, ImageBackground,
    KeyboardAvoidingView,
    SafeAreaView,
    ScrollView,
    StyleSheet, Text,
    TextInput,
    TouchableOpacity,
    View,
    Platform
} from "react-native";
import {Header} from "react-native-elements";
import {SCREEN_WIDTH, SCREEN_WIDTH_NEW} from "../../shared/constants";
import Icon, {default as Icons} from "react-native-vector-icons/MaterialCommunityIcons";
import {currentNavigationRef, getCurrentNavigationRef, navigate} from "../../services/navigation";
import {PostDoc, User} from "../../modals";
import {discoverAllUsers, fetchAllUsers, getRandomPosts} from "../../services/firebase/firebaseService";
import {isEmpty, map} from 'lodash';
import FastImage from "react-native-fast-image";
import {fetchLocalStorage} from "../../utils/local-storage";
import Loader from "../../shared/components/loader/loader";


interface IDiscoverStates {
    searchResults: User[],
    randomPosts: PostDoc[],
    user: string,
    isLoading:boolean
}

export default class Discover extends React.Component<any, IDiscoverStates> {

    private focusListener;

    constructor(props) {
        super(props);
        this.state = {
            searchResults: [],
            randomPosts: [],
            user: '',
            isLoading:false
        }
    }

    componentDidMount() {
        this.focusListener = this.props.navigation.addListener('focus', () => {
            fetchLocalStorage("loggedUser").then(res => {
                this.setState({
                    isLoading:true
                })
                this.onGetRandomPosts(res)
                this.setState({
                    user: res
                })
            })
        });
    }

    componentWillUnmount() {
        this.focusListener();
    }

    private onGetRandomPosts(user) {
        getRandomPosts(user.userId).then(res => {
            this.setState({randomPosts: res,isLoading:false})
        }).catch(err => {
            console.log("get random posts error ", err)
        })
    }

    // @ts-ignore
    private renderRandomPosts() {
        const posts = this.state.randomPosts.length >= 1 ? this.state.randomPosts.slice(1, this.state.randomPosts.length) : []
        return map(posts, post => {
            return (
                <TouchableOpacity style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    height: SCREEN_WIDTH_NEW / 2,
                    width: SCREEN_WIDTH_NEW / 2
                }} onPress={() => {
                    navigate("post", {postId: post.postId, userId: post.userId})
                }}>
                    <ImageBackground
                        source={{uri: post.image}}
                        style={{flex: 1, width: undefined, height: undefined}}
                    >
                        <View style={{flex: 5}}/>
                        <View style={{flexDirection: 'row', flexWrap: 'wrap', backgroundColor: 'black', opacity: 0.3}}>
                            {
                                post.tags.map(t => (
                                    <View style={{alignSelf: 'flex-start', marginRight: 5, flexDirection: 'column'}}>
                                        <Text
                                            style={{color: 'white', fontSize: 10, fontWeight: 'bold'}}>#{t.name}</Text>
                                    </View>
                                ))
                            }
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
            )
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <KeyboardAvoidingView
                    style={styles.keyboardAvoidingViewContainer}
                    behavior={Platform.OS === "ios" ? "padding" : 'height'}>
                    <Header
                        statusBarProps={{barStyle: "light-content"}}
                        barStyle="dark-content"
                        containerStyle={{
                            display: "flex",
                            backgroundColor: "#0C0D34",
                        }}
                        centerComponent={{
                            text: 'Esplora',
                            style: {color: "#FFF", fontWeight: "bold"},
                        }}
                    />
                    <Loader show={this.state.isLoading}/>
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
                                autoFocus={false}
                                style={{
                                    width: SCREEN_WIDTH - 30 - 50,
                                    height: 40,
                                    fontSize: 16
                                }}
                                onFocus={()=>{navigate("search-discover",{user:this.state.user})}}
                                placeholder={"Cerca"}
                            />
                        </View>
                    </View>
                    <ScrollView style={{backgroundColor: 'none', marginBottom: 100}}>
                        {this.state.randomPosts.length !== 0 &&
                        <>

                            <TouchableOpacity style={{display: 'flex', flex: 1, flexDirection: 'row'}} onPress={() => {
                                navigate("post", {
                                    postId: this.state.randomPosts[0].postId,
                                    userId: this.state.randomPosts[0].userId
                                })
                            }}>
                                <ImageBackground
                                    source={{uri: this.state.randomPosts[0].image}}
                                    style={{width: '100%', height: 300}}
                                >
                                    <View style={{flex: 5}}></View>
                                    <View style={{
                                        flexDirection: 'row',
                                        flexWrap: 'wrap',
                                        backgroundColor: 'black',
                                        opacity: 0.3
                                    }}>
                                        {
                                            this.state.randomPosts[0].tags.map(t => (
                                                <View style={{alignSelf: 'flex-start', margin: 10}}>
                                                    <Text style={{color: 'white', fontWeight: 'bold'}}>#{t.name}</Text>
                                                </View>
                                            ))
                                        }
                                    </View>
                                </ImageBackground>
                            </TouchableOpacity>
                            <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
                                {
                                    this.state.randomPosts.length > 1 && this.renderRandomPosts()
                                }
                            </View>
                        </>
                        }
                    </ScrollView>
                </KeyboardAvoidingView>
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
    searchWrapper: {
        zIndex: 999,
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'center',
        height: 50,
        backgroundColor: '#fff',
        width: SCREEN_WIDTH
    },
    postHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderTopColor: '#ddd',
        borderTopWidth: 0.5,
        borderBottomColor: '#ddd',
        borderBottomWidth: 0.5,
    },
    infoWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        borderColor: '#ddd',
        borderWidth: 0.3,
        height: 36,
        width: 36,
        borderRadius: 36,
        marginRight: 10,
    },
})
