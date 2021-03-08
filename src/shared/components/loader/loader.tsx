import React from "react";
import Spinner from 'react-native-loading-spinner-overlay';
import {ActivityIndicator, StyleSheet, View} from "react-native";

interface ILoaderProps {
    show: boolean
}

class Loader extends React.Component<ILoaderProps, any> {
    render() {
        return (
            <Spinner
                visible={this.props.show}
                textStyle={styles.spinnerTextStyle}
            />
        );
    }
}

export default Loader;
const styles = StyleSheet.create({
    spinnerTextStyle: {
        color: '#FFF'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
    }
});
