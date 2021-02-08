import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  ImageBackground,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FastImage from "react-native-fast-image";

import {PostDoc, PostImage} from "../../../modals";
import { SCREEN_WIDTH } from "../../constants";
import ScaleImage from "../scale-image/scaleImage";
import {map} from  'lodash';
import * as Progress from 'react-native-progress';

export interface PhotoShowerProps {
  onChangePage?: (page: number) => any;
  post?:PostDoc
}

const SCREEN_RATIO = SCREEN_WIDTH / 414;
const PhotoShower = ({  onChangePage,post }: PhotoShowerProps) => {
  const [showTags, setShowTags] = useState<boolean>(false);
  const myUsername = "store.getState().user.user.userInfo?.username";
  const maxImageHeight = Math.max(SCREEN_WIDTH);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const scrollRef = useRef<ScrollView>(null);
  const _onEndDragHandler = ({
    nativeEvent: {
      contentOffset: { x },
    },
  }: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currIndex = Math.floor(x / SCREEN_WIDTH);
    const offsetXpercent =
      (x - Math.floor(x / SCREEN_WIDTH) * SCREEN_WIDTH) / SCREEN_WIDTH;
    if (offsetXpercent > 0.5) {
      scrollRef.current?.scrollTo({
        x: (currIndex + 1) * SCREEN_WIDTH,
        y: 0,
        animated: true,
      });
      if (onChangePage) {
        onChangePage(currIndex + 2);
      }
      setCurrentPage(currIndex + 2);
    } else {
      scrollRef.current?.scrollTo({
        x: currIndex * SCREEN_WIDTH,
        y: 0,
        animated: true,
      });
      if (onChangePage) {
        onChangePage(currIndex + 1);
      }
      setCurrentPage(currIndex + 1);
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollRef}
        onScrollEndDrag={_onEndDragHandler}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        horizontal={true}
      >
            <TouchableOpacity
              activeOpacity={1}
            >
              <ImageBackground
                source={{ uri: post?.image }}
                // blurRadius={20}
                style={{
                  height: maxImageHeight,
                  width: SCREEN_WIDTH,
                  backgroundColor: "white",
                  // justifyContent: "center",
                  // alignItems: "center",
                }}
              >
                <View style={{flex:5}}></View>
                <View style={{flex:0,backgroundColor:'#292929',opacity:0.5,flexDirection:'column'}}>
                  {/*{map(img.hashtags,tag => (*/}
                  {/*    <Text style={{color:'#FFF',margin:4,fontWeight:"bold"}}>{`#${tag}`}</Text>*/}
                  {/*))}*/}
                  <View style={{flexDirection:'row',marginLeft:5,marginRight:5,opacity:10}}>
                    {post?.tags.map(tag => {
                      return (
                          <View style={{flexDirection:'column'}}>
                            <Text style={{color:'#ffffff',margin:4,fontWeight:"bold",fontSize:10}}>{`#${tag.name}`}</Text>
                          </View>
                      )

                    })}
                  </View>
                    {post?.isPollPost &&
                    <View style={{marginBottom:5,flexDirection:'row',marginLeft:5,marginRight:5,opacity:10}}>
                      <View style={{flexDirection:'column',justifyContent:'center'}}>
                        <Progress.Bar progress={0.8} width={SCREEN_WIDTH-40} color={'#57ff00'} height={5} borderRadius={10}/>
                      </View>
                      <View style={{flexDirection:'column',marginLeft:6}}>
                        <Text>🥰</Text>
                      </View>
                    </View>
                    }
                </View>
              </ImageBackground>
            </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default React.memo(PhotoShower);

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  paging: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.9)",
    padding: 5,
    paddingHorizontal: 10,
    zIndex: 99,
    borderRadius: 50,
    top: 10,
    right: 10,
  },
  label: {
    backgroundColor: "rgba(0,0,0,0.9)",
    zIndex: 1,
    borderRadius: 5,
  },
});

function getLabelOpacity(
  _animTags: Animated.Value[][],
  index: number,
  index2: number,
) {
  return _animTags[index][index2].interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });
}

function getLabelHeight(
  _animTags: Animated.Value[][],
  index: number,
  index2: number,
  tag: {
    x: number;
    y: number;
    width: number;
    height: number;
    username: string;
  },
) {
  return _animTags[index][index2].interpolate({
    inputRange: [0, 1],
    outputRange: [0, tag.height * SCREEN_RATIO],
    extrapolate: "clamp",
  });
}

function getLabelWidth(
  _animTags: Animated.Value[][],
  index: number,
  index2: number,
  tag: {
    x: number;
    y: number;
    width: number;
    height: number;
    username: string;
  },
) {
  return _animTags[index][index2].interpolate({
    inputRange: [0, 1],
    outputRange: [0, tag.width * SCREEN_RATIO],
    extrapolate: "clamp",
  });
}
