import React from "react";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import Camera from "../../shared/components/camera/camera";
import {navigate} from "../../services/navigation";
import ImagePicker from 'react-native-image-picker'

interface ICameraScreenStates{
    isEditProfileCapture:boolean
}
class CameraScreen extends React.Component<any, ICameraScreenStates> {

    private focusListener;

    constructor(props) {
        super(props);
        this.state = {
            isEditProfileCapture:false
        }
    }

    componentDidMount() {
        this.focusListener = this.props.navigation.addListener('focus', () => {
            const isEditProfile = this.props.route.params && this.props.route.params.isEditProfile ? this.props.route.params.isEditProfile : false;
            this.setState({
                isEditProfileCapture:isEditProfile
            })
        })

    }

    private onCapture = (imageURI: string) => {
        if(!this.state.isEditProfileCapture){
            navigate("capture_action", {imageUri: `data:image/jpeg;base64,${imageURI}`})
        }else{
            navigate("profile", {imageUri: `data:image/jpeg;base64,${imageURI}`})
        }
    }

    componentWillUnmount() {

        this.focusListener();
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
