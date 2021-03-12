import React from "react";
import {Alert, Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import Dialog, {DialogContent, SlideAnimation,DialogFooter,DialogButton,DialogTitle} from 'react-native-popup-dialog';
import {SCREEN_HEIGHT, SCREEN_WIDTH_NEW} from "../../../shared/constants";


interface IReportOptionsProps {
    showEditProfile: boolean,
    onClose: () => void,
    user?:any;
    name?:string;
    image?:string;
    onChangePicture?:()=>void;
}

interface IReportOptionsStates {
    name: string;
    isLoading:boolean,
    updatedImage: boolean
}

class ReportOptions extends React.Component<IReportOptionsProps, IReportOptionsStates> {

    private onEditProfile = () => {
        this.props.onClose()
    }

    render() {
        return (
                <Dialog
                    visible={this.props.showEditProfile}
                    onTouchOutside={this.props.onClose}
                    dialogAnimation={new SlideAnimation({
                        slideFrom: 'top',
                    })}
                    width={SCREEN_WIDTH_NEW-20}
                    height={SCREEN_HEIGHT/2}
                    dialogTitle={<DialogTitle title="Report" />}
                    footer={
                        <DialogFooter style={{marginTop:0}}>
                            <DialogButton
                                text="It's spam"
                                onPress={this.onEditProfile}
                            />
                            <DialogButton
                                text="It's inappropriate"
                                onPress={this.onEditProfile}
                            />
                        </DialogFooter>
                    }
                >
                    <DialogContent style={{flex: 1, justifyContent: 'center', alignItems: 'flex-start'}}>
                        <Text style={{fontWeight: 'bold', marginBottom: 20}}>Why are you reporting this post?</Text>
                        <Text style={{marginBottom: 20}}>Your report is anonymous, except if you're reporting an intellectual property infringement. If someone is immediate danger, call the local emergency services - don't wait</Text>
                    </DialogContent>
                </Dialog>
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

export default ReportOptions;
