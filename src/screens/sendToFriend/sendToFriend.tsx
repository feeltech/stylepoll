import React from "react";
import {
    KeyboardAvoidingView,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import {Header} from "react-native-elements";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {SCREEN_WIDTH} from "../../shared/constants";
import {navigate} from "../../services/navigation";


class SendToFriend extends React.Component<any, any> {

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <KeyboardAvoidingView
                    style={styles.keyboardAvoidingViewContainer}
                    behavior="height"
                >
                    <Header
                        statusBarProps={{barStyle: "dark-content"}}
                        barStyle="dark-content"
                        containerStyle={{
                            display: "flex",
                            backgroundColor: "#053280",
                        }}
                        leftComponent={<TouchableOpacity onPress={()=>{navigate("feed_to_friend")}}>
                            <Icon
                                name="close"
                                color="white"
                                size={22}
                            />
                        </TouchableOpacity>}
                        centerComponent={{
                            text: "Send to Friend",
                            style: {color: "#FFF", fontWeight: "bold"},
                        }}
                    />
                    <ScrollView
                        style={{
                            backgroundColor: 'none'
                        }}
                    >
                        <View style={styles.searchWrapper}>
                            <View style={{
                                width: SCREEN_WIDTH - 30,
                                flexDirection: 'row',
                                alignItems: 'center',
                                borderBottomColor: "#ddd",
                                borderBottomWidth: 1
                            }}>
                                <View style={{
                                    width: 40,
                                    height: 40,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Icon name="magnify" size={24} color={"#ddd"}/>
                                </View>
                                <TextInput
                                    onChangeText={() => {
                                    }}
                                    autoFocus={false}
                                    style={{
                                        width: SCREEN_WIDTH - 30 - 50,
                                        height: 40,
                                        fontSize: 16
                                    }}
                                    placeholder={"Search"}
                                />
                            </View>
                        </View>
                        <View style={{marginLeft:15}}>
                            <Text style={styles.input_label}>SEARCH TO WHO YOU WANT TO SEND IT</Text>
                        </View>
                        <View style={styles.searchWrapper}>
                            <View style={{
                                width: SCREEN_WIDTH - 30,
                                flexDirection: 'row',
                                alignItems: 'center',
                                borderBottomColor: "#ddd",
                                borderBottomWidth: 1
                            }}>
                                <Text
                                    style={{
                                        width: SCREEN_WIDTH - 30 - 50,
                                        // height: 40,
                                        fontSize: 16
                                    }}
                                >
                                    Vermita Green
                                </Text>
                                <View style={{
                                    width: 40,
                                    height: 40,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Icon name="send" size={24} color={"#000"}/>
                                </View>
                            </View>
                        </View>
                        <View style={styles.searchWrapper}>
                            <View style={{
                                width: SCREEN_WIDTH - 30,
                                flexDirection: 'row',
                                alignItems: 'center',
                                borderBottomColor: "#ddd",
                                borderBottomWidth: 1
                            }}>
                                <Text
                                    style={{
                                        width: SCREEN_WIDTH - 30 - 50,
                                        // height: 40,
                                        fontSize: 16
                                    }}
                                >
                                    O-Ren Ishii
                                </Text>
                                <View style={{
                                    width: 40,
                                    height: 40,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Icon name="send" size={24} color={"#000"}/>
                                </View>
                            </View>
                        </View>
                        <View style={styles.searchWrapper}>
                            <View style={{
                                width: SCREEN_WIDTH - 30,
                                flexDirection: 'row',
                                alignItems: 'center',
                                borderBottomColor: "#ddd",
                                borderBottomWidth: 1
                            }}>
                                <Text
                                    style={{
                                        width: SCREEN_WIDTH - 30 - 50,
                                        // height: 40,
                                        fontSize: 16
                                    }}
                                >
                                   Romeo Cameo
                                </Text>
                                <View style={{
                                    width: 40,
                                    height: 40,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Icon name="send" size={24} color={"#000"}/>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }
}

export default SendToFriend;
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        height:'100%'
    },
    keyboardAvoidingViewContainer: {
        position: "relative",
    },
    searchWrapper: {
        zIndex: 999,
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'center',
        height: 50,
        backgroundColor: '#fff',
        width: SCREEN_WIDTH
    },
    input_label: {
        color: '#a2a2a2',
        marginTop:10
    }
})

