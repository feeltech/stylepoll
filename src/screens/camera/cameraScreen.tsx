import React from "react";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import Camera from "../../shared/components/camera/camera";
import {navigate} from "../../services/navigation";
import Icon from "react-native-dynamic-vector-icons";
import storage from '@react-native-firebase/storage';
import {generateGUID} from "../../utils";


class CameraScreen extends React.Component<any, any> {


    private onCapture = (imageURI: string) => {
        navigate("capture_action", {imageUri: `data:image/jpeg;base64,${imageURI}`})
    }

    render() {
        return (
            <View style={styles.container}>
                <Camera onCapture={this.onCapture}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "transparent",
    }
});
export default CameraScreen;
