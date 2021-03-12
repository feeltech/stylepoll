import React from "react";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import Camera from "../../shared/components/camera/camera";
import {navigate} from "../../services/navigation";
import ImagePicker from 'react-native-image-picker'
import {uploadImageAndGetUrl} from "../../utils";
import Loader from "../../shared/components/loader/loader";


interface ICameraScreenStates{
    isEditProfileCapture:boolean,
    isLoading:boolean,
    updatedName:string
}
class EditProfileCamera extends React.Component<any, ICameraScreenStates> {

    constructor(props) {
        super(props);
        this.state = {
            isEditProfileCapture:false,
            isLoading:false,
            updatedName:''
        }
    }

    componentDidMount() {
        const updatedName = this.props.route.params && this.props.route.params.name ? this.props.route.params.name : '';
        this.setState({
            updatedName: updatedName
        })
    }

    private onCapture = (imageURI: string) => {
        this.setState({isLoading:true})
        uploadImageAndGetUrl(`data:image/jpeg;base64,${imageURI}`).then(res => {
            this.setState({isLoading:false})
            navigate("profile", {imageUri:res,updatedName:this.state.updatedName,isUserUpdating:true })
        })
    }





    render() {
        return (
            <View style={styles.container}>
                <Camera onCapture={this.onCapture}/>
                <Loader show={this.state.isLoading}/>
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
export default EditProfileCamera;
