import React from "react";
import {Alert, Image, ImageBackground, StyleSheet, TouchableOpacity, View} from "react-native";
import Share from 'react-native-share';
import {goBack, navigate} from "../../services/navigation";
import {Icon} from "react-native-elements";


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
            "Invia a un amico",
            "",
            [
                {
                    text: "Annulla",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "destructive"
                },
                {
                    text: "Invia",
                    onPress: () => {navigate("feed_to_friend",{imageUri: this.state.imageURI})},
                    style: "cancel"
                }
            ],
            {cancelable: false}
        );
    }

    private redButtonActions = () => {
        Alert.alert(
            "Alert Poll",
            "",
            [
                {
                    text: "Annulla",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "destructive"
                },
                {
                    text: "Invia",
                    onPress: () => {navigate("alert_poll",{imageUri: this.state.imageURI})},
                    style: "cancel"
                },
            ],
            {cancelable: false}
        );
    }

    private blueButtonActions = () => {
        const shareOptions = {
            message: 'Seguimi su Stylepoll e condividi i tuoi Poll!',
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
                <View style={{flex:1}}></View>
                <View style={{flex: 10}}>
                    <ImageBackground source={{uri: `${this.state.imageURI}`}} style={styles.image}
                                     imageStyle={{borderRadius: 30}}>
                        <View style={{
                            flex: 1,
                            flexDirection: "row",padding:20}}>
                            <TouchableOpacity onPress={()=>{goBack()}}>
                                <Icon name={"close"} size={30} color={"white"}/>
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                </View>
                <View style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems:'center',
                    marginTop: 15,
                    marginLeft:20,
                    marginRight:20,
                    marginBottom: 5
                }}>
                    <TouchableOpacity onPress={this.yellowButtonActions}>
                       <Image source={require('../../../assets/images/feed.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.redButtonActions}>
                        <Image source={require('../../../assets/images/poll.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.blueButtonActions}>
                        <Image source={require('../../../assets/images/share-post.png')}/>
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
        backgroundColor: "#0C0D34"
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
