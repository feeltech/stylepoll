import React from "react";
import {navigate} from "../../../services/navigation";
import {View} from "react-native";

export default class CameraContainer extends React.Component<any, any>{

    componentDidMount() {
        navigate("camera")
    }

    render() {
        return (
            <View></View>
        );
    }
}
