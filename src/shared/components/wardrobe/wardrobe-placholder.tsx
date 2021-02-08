import React from "react";
import {StyleSheet, Text, View, Image, TouchableOpacity} from "react-native";
import * as NavigationService from "react-navigation-helpers";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import {Icon} from "react-native-elements";

export default class WardrobePlacholder extends React.Component<any, any> {
    render() {
        return (
            <View
                style={styles.container}
            >
                <View style={styles.avatar}>
                    <Icons name="add" size={16} color="#fff"/>
                </View>
                <View style={styles.username}>
                    <Text
                        numberOfLines={1}
                        style={{
                            fontSize: 12,
                            color: "#000",
                        }}
                    >
                        Aggiungi
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        position: "relative",
    },
    username: {
        maxWidth: 64,
        height: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    avatar: {
        borderRadius: 64,
        height: 64,
        width: 64,
        backgroundColor: 'grey'
    },
    btnAdd: {
        position: "absolute",
        bottom: 17.5,
        right: -2.5,
        width: 20,
        height: 20,
        borderWidth: 2,
        borderColor: "#fff",
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#318bfb",
    },
});
