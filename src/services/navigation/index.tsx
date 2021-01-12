import React from "react";
import Icon from "react-native-dynamic-vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { isReadyRef, navigationRef } from "react-navigation-helpers";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

/**
 * ? Local Imports
 */
import { View } from "react-native";

import { SCREENS } from "../../shared/constants";
// ? Screens
import HomeScreen from "../../screens/home/HomeScreen";
import SearchScreen from "../../screens/search/SearchScreen";
import CameraScreen from "../../screens/camera/cameraScreen";
import CaptureActions from "../../screens/camera/captureActions";
import SendToFriend from "../../screens/sendToFriend/sendToFriend";
import SendFeed from "../../screens/send-feed/sendFeed";
import FeedToFriend from "../../screens/feed-to-friend/feedToFriend";
import AlertPoll from "../../screens/alert-poll/alertPoll";
import PollDetails from "../../screens/poll-details/pollDetails";
import PollStats from "../../screens/poll-stats/pollStats";
// ? If you want to use stack or tab or both
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Navigation = () => {
  React.useEffect(() => {
    return () => (isReadyRef.current = false);
  }, []);

  const renderTabNavigation = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = "";

            if (route.name === SCREENS.HOME) {
              iconName = "home";
            } else if (route.name === SCREENS.SEARCH) {
              iconName = "search";
            } else if (route.name === SCREENS.CAMERA) {
              iconName = "camera";
            } else if (route.name === SCREENS.FAVOURITES) {
              iconName = "heart";
            } else if (route.name === SCREENS.PROFILE) {
              iconName = "user";
            }

            // You can return any component that you like here!
            return (
              <Icon name={iconName} type="Feather" size={size} color={color} />
            );
          },
        })}
        tabBarOptions={{
          // activeTintColor: "tomato",
          // inactiveTintColor: "gray",
          tabStyle: {
            backgroundColor: "#053280",
            paddingBottom:0,
          },
          // inactiveBackgroundColor: "none",
          activeBackgroundColor: "#C3C3C3",
          keyboardHidesTabBar: true,
          showLabel: false,
        }}
      >
        <Tab.Screen name={SCREENS.HOME} component={HomeScreen} />
        <Tab.Screen name={SCREENS.SEARCH} component={SearchScreen} />
        <Tab.Screen name={SCREENS.CAMERA} component={CameraScreen} />
        <Tab.Screen name={SCREENS.FAVOURITES} component={SearchScreen} />
        <Tab.Screen name={SCREENS.PROFILE} component={HomeScreen} />
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        isReadyRef.current = true;
      }}
    >

      <View style={{ flex: 12 }}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name={SCREENS.HOME} component={renderTabNavigation} />
          <Stack.Screen name={SCREENS.CAMERA} component={renderTabNavigation} />
          <Stack.Screen name={SCREENS.CAPTURE_ACTION} component={CaptureActions} />
          <Stack.Screen name={SCREENS.SEND_TO_FEED} component={SendFeed} />
          <Stack.Screen name={SCREENS.SEND_TO_FRIEND} component={SendToFriend} />
          <Stack.Screen name={SCREENS.FEED_TO_FRIEND} component={FeedToFriend} />
          <Stack.Screen name={SCREENS.ALERT_POLL} component={AlertPoll} />
          <Stack.Screen name={SCREENS.POLL_DETAILS} component={PollDetails} />
          <Stack.Screen name={SCREENS.POLL_STATS} component={PollStats} />
          {/*<Stack.Screen name={SCREENS.DETAIL}>*/}
          {/*  {(props) => <DetailScreen {...props} />}*/}
          {/*</Stack.Screen>*/}
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
};

export function navigate(name: string, params?: object): void {
  navigationRef.current?.navigate(name, params);
}

export default Navigation;
