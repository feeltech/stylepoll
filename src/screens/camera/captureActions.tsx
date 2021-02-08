import React from "react";
import {Alert, ImageBackground, StyleSheet, TouchableOpacity, View} from "react-native";
import Share from 'react-native-share';
import {navigate} from "../../services/navigation";


interface ICaptureActionStatus {
    imageURI: string
}

class CaptureActions extends React.Component<any, ICaptureActionStatus> {

    constructor(props: any) {
        super(props);
        this.state = {
            imageURI: ''
        }
    }

    componentDidMount() {
        const imageURL = this.props.route.params && this.props.route.params.imageUri ? this.props.route.params.imageUri : 'https://i.pinimg.com/736x/cd/83/f5/cd83f51c1cf0dc3f1e9f632640fed7b7.jpg';
        this.setState({
            imageURI: imageURL
        })
    }

    private yellowButtonActions = () => {
        Alert.alert(
            "Do you want to send to feed",
            "Choose an option below",
            [
                {
                    text: "OK!",
                    onPress: () => {navigate("send_to_feed",{imageUri: this.state.imageURI})},
                    style: "destructive"
                },
                {
                    text: "Send to a friend",
                    onPress: () => {navigate("feed_to_friend",{imageUri: this.state.imageURI})},
                },
                {
                    text: "Cancella",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                }
            ],
            {cancelable: false}
        );
    }

    private redButtonActions = () => {
        Alert.alert(
            "Alert Poll",
            "Start the poll or go back to home",
            [
                {
                    text: "OK",
                    onPress: () => {navigate("alert_poll",{imageUri: this.state.imageURI})},
                    style: "destructive"
                },
                {
                    text: "Cancella",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                }
            ],
            {cancelable: false}
        );
    }

    private blueButtonActions = () => {
        const shareOptions = {
            title: 'Share Im' +
                'age',
            failOnCancel: false,
            urls: [this.state.imageURI]
        };
        Share.open(shareOptions)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                err && console.log(err);
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{flex: 10}}>
                    <ImageBackground source={{uri: `${this.state.imageURI}`}} style={styles.image}
                                     imageStyle={{borderRadius: 30}}></ImageBackground>
                </View>
                <View style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 15,
                    marginLeft:20,
                    marginRight:20,
                    marginBottom: 5
                }}>
                    <TouchableOpacity onPress={this.yellowButtonActions}>
                        <View style={{width: 35, height: 35, borderRadius: 35 / 2, backgroundColor: "#F67728"}}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.redButtonActions}>
                        <View style={{width: 35, height: 35, borderRadius: 35 / 2, backgroundColor: "#D81B46"}}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.blueButtonActions}>
                        <View style={{width: 35, height: 35, borderRadius: 35 / 2, backgroundColor: "#3299FE"}}/>
                    </TouchableOpacity>
                </View>
            </View>

        );
    }
}

export default CaptureActions
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#000000"
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
    },
    text: {
        color: "white",
        fontSize: 42,
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "#000000a0"
    }
});
