import "react-native-gesture-handler";
import React from "react";
import { AsyncStorage, Platform, StatusBar, StyleSheet, } from "react-native";
import StackNavigation, {navigate} from "./src/services/navigation/index";
import { fetchLocalStorage, storeLocalStorage } from "./src/utils/local-storage";
import { updateDeviceId } from "./src/services/firebase/firebaseService";
import messaging from "@react-native-firebase/messaging";
import PushNotification from "react-native-push-notification";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import { NOTIFICATION_TYPES } from "./src/shared/constants";

function onUpdateDeviceId(deviceId) {
  fetchLocalStorage("loggedUser").then(res => {
    updateDeviceId(res.userId, deviceId)
  })
}

// TODO - add react-native-community/push-notification-ios
// TODO - black screen after react-native-splash-screen

// firebase request permission
async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  // logger.verbose(FILE_NAME, "Firebase User permission Status - ", authStatus);
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log("rnfirebase.io authorization status : ", authStatus);
    generateDeviceToken();
  }
}

// generate firebase device token
export function generateDeviceToken() {
  // Get the device token
  messaging()
    .getToken()
    .then((token) => {
      console.log("rnfirebase.io token : ", token);
      // logger.verbose(FILE_NAME, "Firebase device id -", token);
      onRegister(token);
    });

  // Listen to whether the token changes
  messaging().onTokenRefresh((token) => {
    // logger.verbose(FILE_NAME, "Firebase device id refresh - ", token);
    onRegister(token);
  });
}

// set device token
function onRegister(token) {
  AsyncStorage.setItem("deviceToken", token)
    .then((res) => {
      console.log("rnfirebase.io token set to AsyncStorage");
      AsyncStorage.getItem("deviceToken").then((dt) => {
        console.log("rnfirebase.io  device_token from storage : ", dt)
        onUpdateDeviceId(dt)
      }
      );
      handleForegroundMessage();
      handleBackgroundMessage();
    })
    .catch((e) => {
      // logger.error(FILE_NAME, "Token Async storage set error - ", e);
    });
}

// handle message when app is open
function handleForegroundMessage() {
  messaging().onMessage(async (message) => {
    // logger.verbose(FILE_NAME, "Firebase foreground message - ", message);
    console.log("rnfirebase.io handleForegroundMessage", message);
    handlePushNotification(message);
  });
}

// handle background message
function handleBackgroundMessage() {
  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    // logger.verbose(FILE_NAME, "Firebase background message - ", remoteMessage);
    handlePushNotification(remoteMessage);
  });
}

function handleNotificationClick(){
  messaging().onNotificationOpenedApp(async (remoteMessage) => {
    navigate("favourites")
  })
}

function configureLocalPush() {
  PushNotification.configure({
    onRegister: function (token) {
      console.log("TOKEN:", token);
    },
    onNotification: function (notification) {
      console.log("NOTIFICATION:", notification);
    },
    onAction: function (notification) {
      console.log("ACTION:", notification.action);
      console.log("NOTIFICATION:", notification);
    },
    onRegistrationError: function (err) {
      console.error(err.message, err);
    },
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
    popInitialNotification: true,
    requestPermissions: true,
  });
}

function handlePushNotification(firebaseMessage) {
  console.log("rnfirebase.io handlePushNotification", firebaseMessage);
  console.log("rnfirebase.io device platform : ", Platform.OS);
  const messageData = firebaseMessage.data
  if (Platform.OS === "ios") {
    sendPushIOS(
      messageData.title,
      messageData.message
    );
  } else {
    sendPushAndroid(
        messageData.title,
        messageData.message
    );
  }
}

function sendPushIOS(title, message) {
  console.log("rnfirebase.io send push ios : ", title, message);
  PushNotificationIOS.presentLocalNotification({
    alertTitle: title,
    alertBody: message,
  });
}

function sendPushAndroid(title, message) {
  console.log("rnfirebase.io send push android : ", title, message);
  PushNotification.localNotification({
    title: title,
    message: message,
  });
}

console.disableYellowBox = true;
export default class App extends React.Component<any, any> {
  constructor(props: Readonly<{}>) {
    super(props);
  }
  async componentDidMount() {
    configureLocalPush();
    handleNotificationClick()
    await requestUserPermission();
    PushNotificationIOS.addEventListener('notification', function(){
      navigate("favourites")
    });
  }
  render() {
    return (
      <StackNavigation />
    );
  }
}
