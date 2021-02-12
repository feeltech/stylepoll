import "react-native-gesture-handler";
import React from "react";
import {ActivityIndicator, StatusBar, StyleSheet, Text, View} from "react-native";
import {usePromiseTracker} from "react-promise-tracker";

import StackNavigation from "./src/services/navigation/index";
import Loader from "./src/shared/components/loader/loader";

console.disableYellowBox = true;

const App = () => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const {promiseInProgress} = usePromiseTracker()
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
          promiseInProgress ? <Loader show={true}/> :
              <StackNavigation/>
        }
      </>
  );
};

export default App;

