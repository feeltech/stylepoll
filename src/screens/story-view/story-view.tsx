import React from "react";
import {
  Animated,
  Image,
  ImageBackground, Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Header, Icon } from "react-native-elements";

import {SCREEN_HEIGHT, SCREEN_WIDTH, SCREEN_WIDTH_NEW} from "../../shared/constants";
import { goBack } from "../../services/navigation";
import {AlertPoll, StoryItem} from "../../modals";
import { fetchLocalStorage } from "../../utils/local-storage";
import {
  hasReactedToPoll,
  reactToPoll,
} from "../../services/firebase/firebaseService";
import * as Progress from "react-native-progress";
import moment from "moment";
import {getProgressBarValue} from "../../utils";
import {startCase} from 'lodash';
import { ParallaxImage} from 'react-native-snap-carousel';
import Carousal from "../../shared/components/carausal/carausal";
import post from "../post/post";
import StoryViewContent from "./story-view-content";

interface IStoryViewStates {
  polls: any;
  user: any;
  isUserReacted: boolean;
  remainingTime:string;
  pollCompleted:boolean;
  pollDuration:number,
  durationDiff:number,
}

export default class StoryView extends React.Component<any, IStoryViewStates> {
  private focusListener;

  constructor(props) {
    super(props);
    this.state = {
      polls: [],
      user: "",
      isUserReacted: false,
      remainingTime:'',
      pollCompleted:false,
      pollDuration:0,
      durationDiff:0,
    };
  }

  componentDidMount() {
    let polls = this.props.route.params && this.props.route.params.polls;
      fetchLocalStorage("loggedUser").then((res) => {
        this.setState({
          user: res,
          polls:polls
        });
        })
  }

  private _renderItem = (item,index, parallaxProps) => {


    return (
        <StoryViewContent poll={item} user={this.state.user}/>
    );
  }

  render() {
    return (
      <>
        <Header
          statusBarProps={{ barStyle: "dark-content" }}
          barStyle="dark-content"
          containerStyle={{
            display: "flex",
            backgroundColor: "#ffffff",
          }}
          leftComponent={
            <TouchableOpacity onPress={goBack}>
              <Icon name="close" color="black" />
            </TouchableOpacity>
          }
          centerComponent={{
            text: this.state.polls && this.state.polls.userName?`${startCase( this.state.polls.userName)}'s Alert poll` :'Alert poll',
            style: { color: "#000", fontWeight: "bold" },
          }}
        />
        <Carousal renderCarousalData={({item,index},parallaxProps)=>{return this._renderItem(item,index,parallaxProps)}} carousalData={this.state.polls.polls}/>
      </>
    );
  }
}

