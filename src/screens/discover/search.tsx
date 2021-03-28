import React from "react";
import {
    ImageBackground,
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Platform
} from "react-native";
import {Header} from "react-native-elements";
import {SCREEN_WIDTH} from "../../shared/constants";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {goBack, navigate} from "../../services/navigation";
import FastImage from "react-native-fast-image";
import {discoverAllUsers, fetchAllUsers} from "../../services/firebase/firebaseService";
import {isEmpty, map} from 'lodash';
import {PostDoc, User} from "../../modals";


interface IDiscoverSearchStates {
    searchResults: User[],
    user: string,
    allUsers: User[]
}

class DiscoverSearch extends React.Component<any, IDiscoverSearchStates> {

    constructor(props) {
        super(props);
        this.state = {
            searchResults: [],
            user: '',
            allUsers: []
        }
    }

    componentDidMount() {
        const user = this.props.route.params && this.props.route.params.user;
        this.setState({
            user
        })
        fetchAllUsers().then(res => {
            this.setState({
                allUsers: res,
                searchResults: res
            })
        })
    }


    private onDiscoverUsers = (text: string) => {
        if (isEmpty(text)) {
            this.setState({
                searchResults: this.state.allUsers
            })
        } else {
            const allUsers = this.state.allUsers;
            const searchResults: User[] = []
            map(allUsers, user => {
                if (user.name.toLowerCase().search(text.toLowerCase()) >= 0) {
                    searchResults.push(user)
                }
            })
            this.setState({
                searchResults: searchResults
            })
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <KeyboardAvoidingView
                    style={styles.keyboardAvoidingViewContainer}
                    behavior={Platform.OS === "ios" ? "padding" : 'height'}>
                    <Header
                        statusBarProps={{barStyle: "light-content"}}
                        barStyle="dark-content"
                        containerStyle={{
                            display: "flex",
                            backgroundColor: "#0C0D34",
                        }}
                        leftComponent={<TouchableOpacity onPress={goBack}>
                            <Icon
                                name="chevron-left"
                                color="#FFF"
                            size={20}/>
                        </TouchableOpacity>}
                        centerComponent={{
                            text: 'Search',
                            style: {color: "#FFF", fontWeight: "bold"},
                        }}
                    />
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
                                onChangeText={this.onDiscoverUsers}
                                autoFocus={false}
                                style={{
                                    width: SCREEN_WIDTH - 30 - 50,
                                    height: 40,
                                    fontSize: 16
                                }}
                                autoCapitalize={'none'}
                                placeholder={"Search"}
                            />
                        </View>
                    </View>
                    <ScrollView style={{backgroundColor: 'none', marginBottom: 100}}>
                        {
                            this.state.searchResults.length != 0 && this.state.searchResults.map(result => (
                                <View style={styles.postHeader}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigate("other_user_profile", {user: result})
                                        }}
                                        style={styles.infoWrapper}>
                                        <FastImage style={styles.avatar}
                                                   source={{uri: result.profileImage}}/>
                                        <Text style={{
                                            fontWeight: '600'
                                        }}>{result.name}</Text>
                                    </TouchableOpacity>
                                    {/*<TouchableOpacity>*/}
                                    {/*    <Icons name="dots-vertical" size={24} />*/}
                                    {/*</TouchableOpacity>*/}
                                </View>
                            ))
                        }
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        height: '100%'
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
    postHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderTopColor: '#ddd',
        borderTopWidth: 0.5,
        borderBottomColor: '#ddd',
        borderBottomWidth: 0.5,
    },
    infoWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        borderColor: '#ddd',
        borderWidth: 0.3,
        height: 36,
        width: 36,
        borderRadius: 36,
        marginRight: 10,
    },
})

export default DiscoverSearch;
