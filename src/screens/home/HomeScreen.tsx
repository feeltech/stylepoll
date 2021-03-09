import React, {useEffect, useRef, useState} from "react";
import {
    NativeScrollEvent,
    NativeSyntheticEvent,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    KeyboardAvoidingView,
    View, Text,
} from "react-native";
import {Header} from "react-native-elements";
import {map, isEqual} from "lodash";
import {useFocusEffect} from "@react-navigation/native";

import {POST_LIST} from "../../shared/constants";
import StoryBar from "../../shared/components/story/story-bar";
import Posts from "../../shared/components/post-list/postList";
import {
    deletePost,
    fetchFeedPosts,
    getFollowingUserPolls, getUserFeed,
    getUserPolls,
} from "../../services/firebase/firebaseService";
import {fetchLocalStorage} from "../../utils/local-storage";
import {AlertPoll, ExtraPost, PostDoc, PostList, StoryItem} from "../../modals";
import Loader from "../../shared/components/loader/loader";

interface IHomeScreenStates {
    user: any,
    postList: PostDoc[],
    followingPolls: AlertPoll[],
    userPolls: AlertPoll[]
}


const HomeScreen = () => {
    const [user, setUser] = useState<any>();
    const [userPolls, setUserPolls] = useState<AlertPoll[]>([]);
    const [followingPolls, setFollowingPolls] = useState<StoryItem[]>([]);
    const [postList, setPostList] = useState<PostDoc[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);


    useFocusEffect(
        React.useCallback(() => {
            fetchLocalStorage("loggedUser").then((res: any) => {
                fetchFeed(res);
                fetchAlertPoll(res);
                fetchFollowingAlertPoll(res);
                setUser(res);
            });
            if (user) {
            }
            return () => {
                setPostList([]);
            };
        }, []),
    );
    const fetchFeed = (user) => {
        setIsLoading(true)
        getUserFeed(user.userId).then((res) => {
            setIsLoading(false)
            setPostList(res);
        });
    };

    const fetchAlertPoll = (user) => {
        setIsLoading(true)
        getUserPolls(user.userId).then((res) => {
            setIsLoading(false)

            setUserPolls(res);
        });
    };

    const fetchFollowingAlertPoll = (user) => {
        setIsLoading(true)
        getFollowingUserPolls(user.userId).then((res) => {
            setIsLoading(false)
            setFollowingPolls(res);
        });
    };

    const onDeletePost = (postId: string) => {
        setIsLoading(true)
        deletePost(postId, user.userId).then(res => {
            fetchFeed(user);
        })
    }

    const sortByCreatedDate = (arr) => {
        return arr.sort(function compare(a, b) {
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);
            // @ts-ignore
            return dateB - dateA ;
        });

    }

    return (
        // <SafeAreaView style={styles.container}>
        <View>
            <Header
                statusBarProps={{barStyle: "dark-content"}}
                barStyle="dark-content"
                containerStyle={{
                    display: "flex",
                    backgroundColor: "#0C0D34",
                }}
                centerComponent={{
                    text: "STYLEPOLL",
                    style: {color: "#FFF", fontWeight: "bold"},
                }}
            />
            <Loader show={isLoading}/>
            <ScrollView
                style={{
                    backgroundColor: "none",
                    marginBottom: 80
                }}
            >
                <StoryBar
                    polls={followingPolls}
                    currentUserPoll={sortByCreatedDate(userPolls)[0]}
                    profileImage={user ? user.profileImage : ""}
                />
                <Posts data={POST_LIST} posts={postList} onDeleteItem={onDeletePost}/>

            </ScrollView>
        </View>
        // </SafeAreaView>
    );
};

export default HomeScreen;


const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
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
});
