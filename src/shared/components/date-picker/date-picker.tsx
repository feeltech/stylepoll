import React, { Component } from 'react'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {StyleSheet, Text, View} from "react-native";
import moment from 'moment';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
            date:new Date(),
        }
    }

    private onDateChange = (date:Date) => {
        this.setState({
            date:date,
            show: false,
        });
        this.props.onDateChange(date);
    }

     onFocus =()=>{
        this.setState({show:true})
    }

    render(){
        // @ts-ignore
        return (
            <View>
                <TouchableOpacity style={styles.textInputWrapper} onPress={this.onFocus}>
                    <Text style={styles.input}>{moment(this.state.date).format('MMMM Do YYYY, h:mm:ss a')}</Text>
                </TouchableOpacity>
                <DateTimePickerModal
                    isVisible={this.state.show}
                    mode="datetime"
                    onConfirm={this.onDateChange}
                    onCancel={()=>{
                        this.setState({show:false})
                    }}
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
        marginVertical: 7.5,
    },
    input: {
        paddingHorizontal: 10,
        paddingVertical:10,
        width: '100%',
    }
});

