import React, {useState} from "react";
import Icon from "react-native-dynamic-vector-icons";
import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";
import {isReadyRef, navigationRef} from "react-navigation-helpers";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

/**
 * ? Local Imports
 */
import {View} from "react-native";

import {SCREEN_HEIGHT, SCREENS, STATUS_BAR_HEIGHT} from "../../shared/constants";
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
import Register from "../../screens/auth/register";
import CameraContainer from "../../shared/components/camera/cameraContainer";
import Login from "../../screens/auth/login";
import {fetchLocalStorage} from "../../utils/local-storage";
import Profile from "../../screens/profile/profile";
import Discover from "../../screens/discover/discover";
import Posts from "../../screens/post/post";
import StoryView from "../../screens/story-view/story-view";
import OtherUserProfile from "../../screens/other-user-profile/otherUserProfile";
import WardrobeTagView from "../../screens/wardrobe-tag-view/wardrobe-tag-view";
// ? If you want to use stack or tab or both
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Navigation = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    React.useEffect(() => {
        return () => (isReadyRef.current = false);
    }, []);
    fetchLocalStorage("loggedUser").then(res => {
        console.log("res", res)
        setIsLoggedIn(true)
    }).catch(err => {
        console.log("no key")
    })

    const renderTabNavigation = () => {
        return (
            <Tab.Navigator
                screenOptions={({route}) => ({
                    tabBarIcon: ({focused, color, size}) => {
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
                            <Icon name={iconName} type="Feather" size={size} color={color}/>
                        );
                    },
                })}
                tabBarOptions={{
                    // activeTintColor: "tomato",
                    // inactiveTintColor: "gray",
                    tabStyle: {
                        backgroundColor: "#053280",
                    },
                    // inactiveBackgroundColor: "none",
                    activeBackgroundColor: "#C3C3C3",
                    keyboardHidesTabBar: true,
                    showLabel: false,
                    style: {marginTop: 0, marginBottom: 0, paddingBottom: 0}
                }}
            >
                <Tab.Screen name={SCREENS.HOME} component={HomeScreen}/>
                <Tab.Screen name={SCREENS.SEARCH} component={Discover}/>
                <Tab.Screen name={SCREENS.CAMERA} component={CameraScreen}/>
                <Tab.Screen name={SCREENS.FAVOURITES} component={SearchScreen}/>
                <Tab.Screen name={SCREENS.PROFILE} component={Profile}/>
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

            <View style={{flex: 12}}>
                {/*{*/}
                {/*    isLoggedIn &&*/}
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                    }}
                >
                    {!isLoggedIn &&
                    <Stack.Screen name={SCREENS.LOGIN} component={Login}/>
                    }
                    <Stack.Screen name={SCREENS.ROOT} component={renderTabNavigation}/>
                    {/*<Stack.Screen name={SCREENS.HOME} component={HomeScreen}/>*/}
                    {/*<Stack.Screen name={SCREENS.CAMERA} component={CameraScreen}/>*/}
                    {/*<Stack.Screen name={SCREENS.SEARCH} component={Discover}/>*/}
                    <Stack.Screen name={SCREENS.CAPTURE_ACTION} component={CaptureActions}/>
                    <Stack.Screen name={SCREENS.SEND_TO_FEED} component={SendFeed}/>
                    <Stack.Screen name={SCREENS.SEND_TO_FRIEND} component={SendToFriend}/>
                    <Stack.Screen name={SCREENS.FEED_TO_FRIEND} component={FeedToFriend}/>
                    <Stack.Screen name={SCREENS.ALERT_POLL} component={AlertPoll}/>
                    <Stack.Screen name={SCREENS.POLL_DETAILS} component={PollDetails}/>
                    <Stack.Screen name={SCREENS.POLL_STATS} component={PollStats}/>
                    <Stack.Screen name={SCREENS.POST} component={Posts}/>
                    <Stack.Screen name={SCREENS.STORY_VIEW} component={StoryView}/>
                    <Stack.Screen name={SCREENS.OTHER_USER_PROFILE} component={OtherUserProfile}/>
                    <Stack.Screen name={SCREENS.WARDROBE_VIEW} component={WardrobeTagView}/>
                    <Stack.Screen name={SCREENS.REGISTER} component={Register}/>
                </Stack.Navigator>
                {/*}*/}
                {/*{*/}
                {/*    !isLoggedIn &&*/}
                {/*    <Stack.Navigator*/}
                {/*        screenOptions={{*/}
                {/*            headerShown: false,*/}
                {/*        }}*/}
                {/*    >*/}
                {/*        <Stack.Screen name={SCREENS.LOGIN} component={Login}/>*/}
                {/*        <Stack.Screen name={SCREENS.REGISTER} component={Register}/>*/}
                {/*    </Stack.Navigator>*/}
                {/*}*/}
            </View>
        </NavigationContainer>
    );
};

export function navigate(name: string, params?: object): void {
    navigationRef.current?.navigate(name, params);
}

export function goBack(): void {
    navigationRef.current?.goBack()
}

export function getCurrentNavigationRef(){
    return navigationRef.current
}

export default Navigation;
