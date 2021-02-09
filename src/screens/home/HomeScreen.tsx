import React, { useEffect, useRef, useState } from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  View,
} from "react-native";
import { Header } from "react-native-elements";
import { map, isEqual } from "lodash";
import { useFocusEffect } from "@react-navigation/native";

import { POST_LIST } from "../../shared/constants";
import StoryBar from "../../shared/components/story/story-bar";
import Posts from "../../shared/components/post-list/postList";
import {
  fetchFeedPosts,
  getFollowingUserPolls,
  getUserPolls,
  getUserPosts,
} from "../../services/firebase/firebaseService";
import { fetchLocalStorage } from "../../utils/local-storage";
import { AlertPoll, ExtraPost, PostDoc, PostList } from "../../modals";

const HomeScreen = () => {
  const _scrollRef = useRef<ScrollView>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [user, setUser] = useState<any>();
  const [userPolls, setUserPolls] = useState<AlertPoll[]>([]);
  const [followingPolls, setFollowingPolls] = useState<AlertPoll[]>([]);
  const [postList, setPostList] = useState<PostDoc[]>([]);
  const ref = useRef<{
    scrollHeight: number;
    preOffsetY: number;
    currentCommentId: number;
    commentContents: {
      id: number;
      content: string;
    }[];
  }>({
    scrollHeight: 0,
    preOffsetY: 0,
    commentContents: [],
    currentCommentId: 0,
  });
  const _onScroll = ({
    nativeEvent: {
      contentOffset: { y },
      contentSize: { height },
    },
  }: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (
      y / height > 0.45 &&
      y > ref.current.preOffsetY &&
      !loadingMore &&
      !refreshing
    ) {
      setLoadingMore(false);
    }
    ref.current.preOffsetY = y;
  };

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
    getUserPosts(user.userId).then((res) => {
      setPostList(res);
    });
  };

  const fetchAlertPoll = (user) => {
    getUserPolls(user.userId).then((res) => {
      setUserPolls(res);
    });
  };

  const fetchFollowingAlertPoll = (user) => {
    getFollowingUserPolls(user.userId).then((res) => {
      setFollowingPolls(res);
    });
  };


  return (
    // <SafeAreaView style={styles.container}>
    <View>
      <Header
        statusBarProps={{ barStyle: "dark-content" }}
        barStyle="dark-content"
        containerStyle={{
          display: "flex",
          backgroundColor: "#053280",
        }}
        centerComponent={{
          text: "STYLEPOLL",
          style: { color: "#FFF", fontWeight: "bold" },
        }}
      />
      <ScrollView
        style={{
          backgroundColor: "none",
        }}
      >
        <StoryBar
          polls={followingPolls}
          currentUserPoll={userPolls[0]}
          profileImage={user ? user.profileImage : ""}
        />
        <Posts data={POST_LIST} posts={postList} />
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
