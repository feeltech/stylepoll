import React from "react";
import {RNCamera} from "react-native-camera";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Icon from "react-native-dynamic-vector-icons";

interface ICameraStates {
    cameraView: any;
}

interface ICameraProps {
    onCapture: (imageURI: string) => void;
}

class Camera extends React.Component<ICameraProps, ICameraStates> {
    constructor(props: any) {
        super(props);
        this.state = {
            cameraView: RNCamera.Constants.Type.back,
        };
    }

    private cameraRef;

    private takePicture = () => {
        if (this.cameraRef) {
            const options = {quality: 0.5, base64: true};
            this.cameraRef.takePictureAsync(options).then(data => {
                this.props.onCapture(data.base64);
            });
        }
    };

    private changeViewMode = () => {
        const viewMode = this.state.cameraView === RNCamera.Constants.Type.back ? RNCamera.Constants.Type.front : RNCamera.Constants.Type.back;
        this.setState({
            cameraView: viewMode
        })
    }

    render() {
        return (
            <RNCamera
                ref={(ref) => {
                    this.cameraRef = ref;
                }}
                style={styles.preview}
                type={this.state.cameraView}
            >
                <View style={{flexDirection: "row"}}>
                    <TouchableOpacity
                        onPress={this.changeViewMode.bind(this)}
                        style={styles.change_mode}>
                        <Icon name={"refresh-cw"} type="Feather" size={30} color={"#FFFFFF"}/>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 1, flexDirection: "row"}}>
                    <TouchableOpacity
                        onPress={this.takePicture.bind(this)}
                        style={styles.capture}>
                        <Icon name={"circle"} type="Feather" size={70} color={"#FFFFFF"}/>
                    </TouchableOpacity>
                </View>
            </RNCamera>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "transparent",
    },
    preview: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    capture: {
        flex:1,
        borderRadius: 5,
        alignItems: "center",
        justifyContent:"flex-end",
        marginBottom: 10
    },
    change_mode: {
        flex:1,
        borderRadius: 5,
        alignItems: "flex-end",
        // justifyContent:"center",
        marginRight:10,
        marginTop:10
    },
});
export default Camera;
