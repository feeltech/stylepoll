import React from "react";
import {
    Image,
    KeyboardAvoidingView,
    SafeAreaView,
    ScrollView,
    StyleSheet, Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import {Header, Icon} from "react-native-elements";
import {SCREEN_HEIGHT, SCREEN_WIDTH, STATUS_BAR_HEIGHT} from "../../constants";
import DatePicker from "../date-picker/date-picker";
import {navigate} from "../../../services/navigation";

interface IFeedFormStates {
    description: string;
    mood: string;
    tags: string;
    address: string;
    when: any;
    imageURL: string
}

class FeedForm extends React.Component<any, IFeedFormStates> {

    constructor(props: any) {
        super(props);
        this.state = {
            description: '',
            mood: '',
            tags: '',
            address: '',
            when: new Date(),
            imageURL: ''
        }
    }


    render() {
        return (
            <View style={styles.container}>
                <KeyboardAvoidingView
                    style={styles.keyboardAvoidingViewContainer}
                    behavior="height">
                    {this.props.showHeader &&
                    <Header
                        statusBarProps={{barStyle: "dark-content"}}
                        barStyle="dark-content"
                        containerStyle={{
                            display: "flex",
                            backgroundColor: "#053280",
                        }}
                        leftComponent={<TouchableOpacity onPress={this.props.onClose}>
                            <Icon
                                name="close"
                                color="white"/>
                        </TouchableOpacity>}
                        centerComponent={{
                            text: this.props.headerTitle,
                            style: {color: "#FFF", fontWeight: "bold"},
                        }}
                        rightComponent={<TouchableOpacity onPress={this.props.onSubmit}>
                            <Text style={{color: "#58ddd9", fontWeight: "bold"}}>Save</Text>
                        </TouchableOpacity>}
                    />
                    }

                    <ScrollView style={{backgroundColor: 'none'}}>
                        <View style={styles.centerContainer}>
                            <View style={styles.loginForm}>
                                <Text style={styles.input_label}>ADD A DESCRIPTION</Text>
                                <View style={styles.textInputWrapper}>
                                    <TextInput autoCapitalize="none" value={this.state.description}
                                               onChangeText={() => {
                                               }} placeholder="Description on the poll"
                                               style={styles.input}/>
                                </View>
                                <Text style={styles.input_label}>ADD A Mood</Text>
                                <View style={styles.textInputWrapper}>
                                    <TextInput autoCapitalize="none" value={this.state.description}
                                               onChangeText={() => {
                                               }} placeholder="example: I feel cool"
                                               style={styles.input}/>
                                </View>
                                <Text style={styles.input_label}>ADD TAGS FOR WARDROBE</Text>
                                <View style={styles.textInputWrapper}>
                                    <TextInput autoCapitalize="none" value={this.state.description}
                                               onChangeText={() => {
                                               }} placeholder="Tags"
                                               style={styles.input}/>
                                </View>
                                <Text style={styles.input_label}>EDIT MAP</Text>
                                <View style={styles.textInputWrapper}>
                                    <TextInput autoCapitalize="none" value={this.state.description}
                                               onChangeText={() => {
                                               }} placeholder="Your Location"
                                               style={styles.input}/>
                                </View>
                                {this.props.showDate &&
                                <View>
                                    <Text style={styles.input_label}>WHEN</Text>
                                    <DatePicker onDateChange={(date) => {
                                        this.setState({when: date})
                                    }}/>
                                </View>
                                }
                                <View style={styles.logoWrapper}>
                                    <Image
                                        resizeMode="contain"
                                        style={styles.logo}
                                        source={{uri: this.props.imageURI}}/>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        );
    }
}

export default FeedForm;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        height: '100%'
    },
    keyboardAvoidingViewContainer: {
        position: "relative",
    },
    scrollContainer: {},
    loadingIcon: {
        position: "relative",
        height: 50,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    loginForm: {
        marginTop:10,
        width: SCREEN_WIDTH * 0.9,
    },
    textInputWrapper: {
        position: 'relative',
        width: '100%',
        height: 44,
        borderRadius: 5,
        borderColor: '#ddd',
        borderWidth: 1,
        marginVertical: 7.5
    },
    centerContainer: {
        // height: SCREEN_HEIGHT - 50 - 40 - STATUS_BAR_HEIGHT,
        width: SCREEN_WIDTH,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        width: '100%',
        height: '100%',
        // paddingHorizontal: 15
    },
    input_label: {
        color: '#626060'
    },
    logoWrapper: {
        marginTop: 20
    },
    logo: {
        height: 300,
        overflow: 'hidden'
    },
});
