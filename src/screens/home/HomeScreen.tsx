import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Keyboard,
  TextInput,
  TouchableOpacity,
} from "react-native";
import * as NavigationService from "react-navigation-helpers";
import {POST_LIST, SCREEN_HEIGHT, STATUS_BAR_HEIGHT} from "../../shared/constants";
import StoryBar from "../../shared/components/story/story-bar";
import Posts from "../../shared/components/post-list/postList";
import {NavigationContainer} from "@react-navigation/native";
import { Header } from "react-native-elements";


const HomeScreen = () => {
  const _scrollRef = useRef<ScrollView>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
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
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingViewContainer}
        behavior="height"
      >
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
          // keyboardDismissMode="on-drag"
          // ref={_scrollRef}
          style={{
           backgroundColor:'none'
          }}
          // // refreshControl={
          // //   <RefreshControl refreshing={refreshing} onRefresh={_onRefresh} />
          // // }
          // // scrollEventThrottle={10}
          // // onScroll={_onScroll}
          // showsVerticalScrollIndicator={false}
        >
          <StoryBar />
          <Posts data={POST_LIST} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff"
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
