import React from "react";
import { StyleSheet, Text, View, ScrollView, Animated } from "react-native";

import {SCREEN_WIDTH, STORY_LIST} from "../../constants";
import {AlertPoll, ExtraStory, StoryItem} from "../../../modals";

import AddStory from "./add-story";
import StoryPreviewItem from "./story-list";
import Carausal from "../carausal/carausal";


interface IStoryBarProps {
  polls:StoryItem[],
  currentUserPoll:AlertPoll,
  profileImage:string
}
export default class StoryBar extends React.Component<IStoryBarProps, any> {
  render() {
    const _loadingDeg = new Animated.Value(0);
    const _onAnimateDeg = () => {
      Animated.timing(_loadingDeg, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start(() => {
        if (true) {
          _loadingDeg.setValue(0);
          _onAnimateDeg();
        }
      });
    };
    return (
      <View style={styles.container}>
        {false && (
          <Animated.Image
            onLayout={_onAnimateDeg}
            style={{
              ...styles.loading,
              transform: [
                {
                  rotate: _loadingDeg.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0deg", "360deg"],
                  }),
                },
              ],
            }}
            source={require("../../../../assets/icons/waiting.png")}
          />
        )}
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          bounces={false}
        >
          <AddStory poll={this.props.currentUserPoll} profileImage={this.props.profileImage} />
          {this.props.polls.map((poll, index) => {
            return(
                <StoryPreviewItem index={index}  key={index} poll={poll}/>

            )
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    paddingVertical: 10,
    height: 104,
  },
  loading: {
    position: "absolute",
    width: 30,
    height: 30,
    left: (SCREEN_WIDTH - 30) / 2,
    top: (104 - 30) / 2,
    zIndex: 999,
  },
});
