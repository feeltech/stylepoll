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
                this.props.onCapture(data.uri);
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
                children={
                    <View
                        style={{
                            flex: 0,
                            flexDirection: "row",
                            justifyContent: "center",
                        }}
                    >

                        <TouchableOpacity
                            onPress={this.takePicture.bind(this)}
                            style={styles.capture}
                        >
                            <Icon name={"circle"} type="Feather" size={50} color={"#FFFFFF"}/>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={this.changeViewMode}
                            style={styles.change_mode}
                        >
                            <Icon name={"refresh-cw"} type="Feather" size={35} color={"#FFFFFF"}/>
                        </TouchableOpacity>

                    </View>
                }
            />
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
        justifyContent: "flex-end",
        alignItems: "center",
    },
    capture: {
        flex: 10,
        borderRadius: 5,
        alignItems: "center",
        marginBottom:10
    },
    change_mode: {
        flex: 1,
        borderRadius: 5,
        alignItems: "flex-end",
    },
});
export default Camera;
