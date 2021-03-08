import React from "react";
import {View, UIManager, findNodeHandle, TouchableOpacity, StyleSheet} from 'react-native'
import {Icon} from "react-native-elements";

interface IPostOptionProps {
    actions:string[],
    onPress:(eventName:string,index:number|undefined)=>void
}

interface IPostOptionStates{
    icon: number,
}

class PostOption extends React.Component<IPostOptionProps, IPostOptionStates> {

    constructor (props) {
        super(props)
        this.state = {
            icon: 0
        }
    }

    onError () {
        console.log('Popup Error')
    }

    onPress = () => {
        if (this.state.icon) {
            UIManager.showPopupMenu(
                findNodeHandle(this.state.icon) as number,
                this.props.actions,
                this.onError,
                this.props.onPress
            )
        }
    }

    render () {
        return (
            <View>
                <TouchableOpacity onPress={this.onPress}>
                    <Icon
                        name='more-vert'
                        size={24}
                        color={'grey'}
                        ref={this.onRef} />
                </TouchableOpacity>
            </View>
        )
    }

    onRef = icon => {
        if (!this.state.icon) {
            this.setState({icon})
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    rectangle: {
        width: 200,
        height: 200,
    }
});

export default PostOption;
