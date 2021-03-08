import "react-native-gesture-handler";
import React from "react";
import {ActivityIndicator, Platform, StatusBar, StyleSheet, Text, View} from "react-native";
import {usePromiseTracker} from "react-promise-tracker";
import messaging from "@react-native-firebase/messaging";
import PushNotification from "react-native-push-notification";
import PushNotificationIOS from "@react-native-community/push-notification-ios";

import StackNavigation from "./src/services/navigation/index";
import Loader from "./src/shared/components/loader/loader";
import {fetchLocalStorage, storeLocalStorage} from "./src/utils/local-storage";
import {updateDeviceId} from "./src/services/firebase/firebaseService";

async function  requestUserPermission () {
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

function onUpdateDeviceId(deviceId){
  fetchLocalStorage("loggedUser").then(res => {
    updateDeviceId(res.userId,deviceId)
  })
}

// set device token
function onRegister(token) {
  storeLocalStorage("deviceToken", token)
      .then((res) => {
        console.log("rnfirebase.io token set to AsyncStorage");
        handleForegroundMessage();
        handleBackgroundMessage();
        onUpdateDeviceId(token)
      })
      .catch((e) => {
        // logger.error(FILE_NAME, "Token Async storage set error - ", e);
      });
}

// handle message when app is open
function handleForegroundMessage() {
  messaging().onMessage(async (message) => {
    // logger.verbose(FILE_NAME, "Firebase foreground message - ", message);
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
    popInitialNotification: false,
    requestPermissions: true,
  });
}

function handlePushNotification(firebaseMessage) {
  console.log("rnfirebase.io handlePushNotification", firebaseMessage);
  console.log("rnfirebase.io device platform : ", Platform.OS);
  if (Platform.OS === "ios") {
    sendPushIOS(
        firebaseMessage.notification.title,
        firebaseMessage.notification.body
    );
  } else {
    sendPushAndroid(
        firebaseMessage.notification.title,
        firebaseMessage.notification.body
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



  componentDidMount() {
    // configureLocalPush();
    // requestUserPermission();
  }

  render() {
    return (
        <StackNavigation/>
    );
  }
}
