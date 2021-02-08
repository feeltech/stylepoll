import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import * as NavigationService from "react-navigation-helpers";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import {AlertPoll} from "../../../modals";


interface IAddStoryProps {
  poll: AlertPoll,
  profileImage:string
}
export default class AddStory extends React.Component<IAddStoryProps, any> {
  render() {
    return (
      <TouchableOpacity
        onPress={() => NavigationService.navigate("camera")}
        activeOpacity={0.8}
        style={styles.container}
      >
        <Image
          style={styles.avatar}
          source={{
            uri: this.props.profileImage
          }}
        />
        <View style={styles.btnAdd}>
          <Icons name="plus" size={16} color="#fff" />
        </View>
        <View style={styles.username}>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 12,
              color: "#000",
            }}
          >
            Start Poll
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    position: "relative",
  },
  username: {
    maxWidth: 64,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    borderRadius: 64,
    height: 64,
    width: 64,
  },
  btnAdd: {
    position: "absolute",
    bottom: 17.5,
    right: -2.5,
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#318bfb",
  },
});
