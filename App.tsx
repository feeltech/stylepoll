import "react-native-gesture-handler";
import React from "react";
import { StatusBar } from "react-native";

import StackNavigation from "./src/services/navigation/index";

console.disableYellowBox = true;

const App = () => {
  const [isLoaded, setIsLoaded] = React.useState(false);

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
        <StackNavigation/>
  );
};

export default App;
