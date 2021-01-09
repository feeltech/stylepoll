import React, { Component } from 'react'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {StyleSheet, TextInput, View} from "react-native";
import moment from 'moment';

interface IDatePickerProps{
    onDateChange:(date:any)=>void
}

interface IDatePickerStates{
    show:boolean;
    date:Date;
}
export default class MyDatePicker extends Component<IDatePickerProps,IDatePickerStates> {

    constructor(props:IDatePickerProps) {
        super(props);
        this.state = {
            show:false,
            date:new Date()
        }
    }

    private onDateChange = (date:Date) => {
        this.setState({
            date:date
        });
        this.props.onDateChange(date);
    }
    render(){
        // @ts-ignore
        return (
            <View>
                <View style={styles.textInputWrapper}>
                    <TextInput autoCapitalize="none" value={moment(this.state.date).format('MMMM Do YYYY, h:mm:ss a')}
                               onChangeText={() => {
                               }} placeholder="Select date and time"
                               style={styles.input}
                               onFocus={()=>{this.setState({show:true})}}
                    />
                </View>
                <DateTimePickerModal
                    isVisible={this.state.show}
                    mode="datetime"
                    onConfirm={this.onDateChange}
                    onCancel={()=>{this.setState({show:false})}}
                    isDarkModeEnabled={true}
                />
            </View>

        )
    }
}

const styles = StyleSheet.create({
    textInputWrapper: {
        position: 'relative',
        width: '100%',
        height: 44,
        borderRadius: 5,
        borderColor: '#ddd',
        borderWidth: 1,
        marginVertical: 7.5
    },
    input: {
        width: '100%',
        height: '100%',
        // paddingHorizontal: 15
    }
});

