import React, { Component } from 'react'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {StyleSheet, Text, View} from "react-native";
import moment from 'moment';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Appearance } from 'react-native'

interface IDatePickerProps{
    onDateChange:(date:any)=>void
    date:Date,
    disabled:boolean
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
                <TouchableOpacity style={this.props.disabled ? [styles.textInputWrapper,{backgroundColor:'#7e7d7d'}] : styles.textInputWrapper} onPress={this.onFocus} disabled={this.props.disabled}>
                    <Text style={styles.input}>{moment(this.props.date).format('MMMM Do YYYY, h:mm:ss a')}</Text>
                </TouchableOpacity>
                <DateTimePickerModal
                    isVisible={this.state.show}
                    mode="datetime"
                    onConfirm={this.onDateChange}
                    onCancel={()=>{
                        this.setState({show:false})
                    }}
                    isDarkModeEnabled={Appearance.getColorScheme() === 'dark' ? true : false}
                    date={this.props.date}

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

