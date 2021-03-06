import React from "react";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import Camera from "../../shared/components/camera/camera";
import {navigate} from "../../services/navigation";
import ImagePicker from 'react-native-image-picker'

interface ICameraScreenStates{
    isEditProfileCapture:boolean
}
class CameraScreen extends React.Component<any, ICameraScreenStates> {


    constructor(props) {
        super(props);
        this.state = {
            isEditProfileCapture:false
        }
    }

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
        backgroundColor: "#0C0D34",
    }
});
export default CameraScreen;
