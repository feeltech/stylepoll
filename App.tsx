import "react-native-gesture-handler";
import React from "react";
import {ActivityIndicator, StatusBar, StyleSheet, View} from "react-native";

import StackNavigation from "./src/services/navigation/index";
import { usePromiseTracker } from "react-promise-tracker"

console.disableYellowBox = true;

const App = () => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const { promiseInProgress } = usePromiseTracker();

  React.useEffect(() => {
    StatusBar.setBarStyle("light-content");
    // StatusBar.setHidden(true);
    StatusBar.setBackgroundColor("#B0DDFC");
    StatusBar.setTranslucent(false);
    // if (isAndroid) {
    //   StatusBar.setBackgroundColor("#B0DDFC");
    //   StatusBar.setTranslucent(false);
    // }
    setTimeout(() => {
      setIsLoaded(true);
    }, 1350);
  }, []);

  return (
      <>
        {
          promiseInProgress ?
          <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator color="#0000ff" />
          </View> :
              <StackNavigation/>

        }
      </>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});
