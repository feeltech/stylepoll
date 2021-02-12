import React from "react";
import {RNCamera} from "react-native-camera";
import {Platform, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Icon from "react-native-dynamic-vector-icons";
import {launchImageLibrary} from "react-native-image-picker";

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

    private accessGallery = () => {
        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
            mediaType:'photo',
            includeBase64:true
        };
        launchImageLibrary(options, (response) => {
            if (response.base64 != null) {
                this.props.onCapture(response.base64);
            }
        });

    }

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
                <View style={{flex:1,flexDirection:'row'}}>
                    <TouchableOpacity
                        onPress={this.changeViewMode.bind(this)}
                        style={{  flex:1,
                            alignItems: "flex-end",
                            justifyContent:"flex-start",
                            paddingTop:30,
                            paddingRight:20
                            }}>
                        <Icon name={"refresh-cw"} type="Feather" size={30} color={"#FFFFFF"}/>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 1, flexDirection: "row"}}>
                    <View style={{flex:1,flexDirection:'column'}}>
                        <TouchableOpacity
                            onPress={this.accessGallery.bind(this)}
                            style={{flex:1,
                                alignItems: "flex-start",
                                justifyContent:"flex-end",
                            padding:20}}>
                            <Icon name={"image"} type="Feather" size={30} color={"#FFFFFF"}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:1,flexDirection:'column'}}>
                        <TouchableOpacity
                            onPress={this.takePicture.bind(this)}
                            style={{flex:1,
                                alignItems: "center",
                                justifyContent:"flex-end",
                            marginBottom:10}}>
                            <Icon name={"circle"} type="Feather" size={50} color={"#FFFFFF"}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:1}}></View>
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
        ...Platform.select({
            android: {
                marginTop: 44
            },
            ios: {
                marginTop: 22
            },
        })
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
