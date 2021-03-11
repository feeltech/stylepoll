import "react-native-gesture-handler";
import React from "react";
import StackNavigation from "./src/services/navigation/index";
import {fetchLocalStorage, storeLocalStorage} from "./src/utils/local-storage";
import {updateDeviceId} from "./src/services/firebase/firebaseService";


function onUpdateDeviceId(deviceId){
  fetchLocalStorage("loggedUser").then(res => {
    updateDeviceId(res.userId,deviceId)
  })
}

console.disableYellowBox = true;
export default class App extends React.Component<any, any> {
  constructor(props: Readonly<{}>) {
    super(props);
  }
  componentDidMount() {
  }
  render() {
    return (
        <StackNavigation/>
    );
  }
}
