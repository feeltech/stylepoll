import React from "react";
import {Alert, Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import Dialog, {DialogContent, SlideAnimation,DialogFooter,DialogButton} from 'react-native-popup-dialog';
import {SCREEN_HEIGHT, SCREEN_WIDTH_NEW} from "../../../shared/constants";
import {startCase} from 'lodash';
import {navigate} from "../../../services/navigation";
import {updateUser} from "../../../services/firebase/firebaseService";
import {storeLocalStorage} from "../../../utils/local-storage";
import {uploadImageAndGetUrl} from "../../../utils";
import Loader from "../../../shared/components/loader/loader";
import {isNull,isEqual} from 'lodash';

interface IEditProfileProps {
    showEditProfile: boolean,
    onClose: () => void,
    user:any;
    name:string;
    image:string;
    onChangePicture:()=>void;
}

interface IEditProfileStates {
    name: string;
    isLoading:boolean,
    updatedImage: boolean
}

class EditProfile extends React.Component<IEditProfileProps, IEditProfileStates> {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            isLoading:false,
            updatedImage:false
        }
    }

    componentWillReceiveProps(nextProps: Readonly<IEditProfileProps>, nextContext: any) {
        if(!isEqual(this.props.image, nextProps.image) && !isNull(this.props.image)){
            this.setState({updatedImage:true})
        }
    }

    private onEditProfile = () => {
        let user = this.props.user;
        this.setState({isLoading:true})
        if(this.state.updatedImage){
            user.profileImage = this.props.image;
            user.name = this.state.name;
            updateUser(user.userId,user).then(r => {
                storeLocalStorage("loggedUser",user).then(s => {
                    this.setState({isLoading:false})
                    this.props.onClose()
                })
            })
        }else{
            uploadImageAndGetUrl(this.props.image).then(res => {
                user.profileImage = res;
                user.name = this.state.name;
                updateUser(user.userId,user).then(r => {
                    storeLocalStorage("loggedUser",user).then(s => {
                        this.setState({isLoading:false})
                        this.props.onClose()
                    })
                })
            })
        }
    }

    render() {
        return (
            <View>
                <Dialog
                    visible={this.props.showEditProfile}
                    onTouchOutside={this.props.onClose}
                    dialogAnimation={new SlideAnimation({
                        slideFrom: 'top',
                    })}
                    width={SCREEN_WIDTH_NEW - 70}
                    height={SCREEN_HEIGHT - 500}
                    onShow={() => {
                        this.setState({name: this.props.user.name})
                    }}
                    footer={
                        <DialogFooter style={{marginTop:0}}>
                            <DialogButton
                                text="Save"
                                onPress={this.onEditProfile}
                            />
                        </DialogFooter>
                    }
                >
                    <DialogContent style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontWeight: 'bold', marginBottom: 20}}>Edit Profile</Text>
                        <TouchableOpacity onPress={this.props.onChangePicture}>
                            <Image source={{uri: this.props.image}}
                                   style={{borderRadius: 50, width: 100, height: 100, marginBottom: 20}}/>
                        </TouchableOpacity>

                        <View style={styles.textInputWrapper}>
                            <TextInput autoCapitalize="none" value={startCase(this.state.name)}
                                       onChangeText={(text) => {
                                           this.setState({name: text})
                                       }}
                                       placeholderTextColor={'#515151'}
                                       style={{textAlign:'center'}}
                            />
                        </View>


                    </DialogContent>
                </Dialog>
                <Loader show={this.state.isLoading}/>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    centeredView: {
        // flex: 1,
        justifyContent: undefined,
        alignItems: undefined,
        margin: 0
    },
    input: {
        width: '100%',
        // paddingHorizontal: 10
    },
    textInputWrapper: {
        position: 'relative',
        height: 44,
        borderRadius: 5,
        borderColor: '#ddd',
        borderWidth: 1,
        marginVertical: 7.5,
        width: '100%',
    },
})

export default EditProfile;
