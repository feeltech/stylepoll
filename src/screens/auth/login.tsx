import React from 'react';
import {KeyboardAvoidingView, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View, Platform} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import {navigate} from "../../services/navigation";
import {LoggingUser} from "../../modals";
import {loginUser} from "../../services/firebase/firebaseService";
import {fetchLocalStorage, storeLocalStorage} from "../../utils/local-storage";

import {styles} from "./authStyles";
import Loader from "../../shared/components/loader/loader";
import { generateDeviceToken } from '../../../App';

interface ILoginStates {
    email: string;
    password: string;
    hidePassword: boolean;
    allowLogin: boolean;
    error: string | null;
    isLoading: boolean
}

class Login extends React.Component<any, ILoginStates> {

    private focusListener;
    private _isMounted = false
    constructor(props: any) {
        super(props);
        this.state = {
            email: "",
            password: "",
            hidePassword: true,
            allowLogin: true,
            error: null,
            isLoading: false
        };
    }


    componentDidMount() {
        this._isMounted = true
        this.focusListener = this.props.navigation.addListener('focus', () => {
            fetchLocalStorage("loggedUser").then(res => {
                if (res) {
                    navigate("root")
                }
            })
        })
    }

    private onLogin = () => {
        const login: LoggingUser = {
            email: this.state.email,
            password: this.state.password,
        };
        this.setState({isLoading: true})
        loginUser(login)
            .then((user) => {
                this.resetStates();
                storeLocalStorage("loggedUser", user).then(() => {
                    navigate("root");
                });
                generateDeviceToken();
                this.setState({isLoading: false})
            })
            .catch((err) => {
                this.setState({
                    error: 'Invalid Credentials!'
                })
                console.log("failed to log in");
                this.setState({isLoading: false})
            });
    };
    private resetStates = () => {
        this.setState({
            email: "",
            password: "",
            hidePassword: true,
            allowLogin: true,
            error:null
        });
    };

    componentWillMount() {
        this._isMounted = false
    }

    render() {
        return (
            <>
                <Loader show={this.state.isLoading}/>
                <SafeAreaView style={styles.container}>
                    <KeyboardAvoidingView
                        style={styles.keyboardAvoidingViewContainer}
                        behavior={Platform.OS === "ios" ? "padding" : 'height'}
                    >
                        <ScrollView style={{backgroundColor: 'none', marginBottom: 0}}>
                        <View style={styles.centerContainer}>
                            <View style={styles.logoWrapper}>
                                {/*<Image*/}
                                {/*  resizeMode="contain"*/}
                                {/*  style={styles.logo}*/}
                                {/*  source={require("../../../assets/images/logo.png")}*/}
                                {/*/>*/}
                                <Text style={{fontSize: 50, fontFamily: 'serif', color: '#318bfb'}}>STYLEPOLL</Text>
                            </View>
                            <View style={styles.loginForm}>
                                <View style={styles.textInputWrapper}>
                                    <TextInput
                                        autoCapitalize="none"
                                        value={this.state.email}
                                        onChangeText={(text) => {
                                            this.setState({email: text});
                                        }}
                                        placeholder="Email"
                                        placeholderTextColor={"black"}
                                        style={styles.input}
                                    />
                                </View>
                                <View style={styles.textInputWrapper}>
                                    <TextInput
                                        value={this.state.password}
                                        onChangeText={(text) => this.setState({password: text})}
                                        secureTextEntry={this.state.hidePassword}
                                        placeholder="Password"
                                        style={styles.input}
                                        placeholderTextColor={"black"}
                                    />
                                    <TouchableOpacity
                                        style={styles.hidePasswordIcon}
                                        onPress={() => {
                                            this.setState({hidePassword: !this.state.hidePassword});
                                        }}
                                    >
                                        {this.state.hidePassword ? (
                                            <Icon name="eye-off-outline" size={20} color="#333"/>
                                        ) : (
                                            <Icon name="eye-outline" color="#318bfb" size={20}/>
                                        )}
                                    </TouchableOpacity>
                                </View>
                                {
                                    this.state.error &&
                                    <View style={styles.textInputErrorWrapper}>
                                        <Text style={{color: 'red', fontSize: 13}}>{this.state.error}</Text>
                                    </View>
                                }
                                <TouchableOpacity
                                    onPress={this.onLogin}
                                    disabled={!this.state.allowLogin}
                                    activeOpacity={0.6}
                                    style={{
                                        ...styles.btnLogin,
                                        opacity: this.state.allowLogin ? 1 : 0.6,
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 16,
                                            color: "#fff",
                                            fontWeight: "500",
                                        }}
                                    >
                                        Login
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.otherOptionsWrapper}>
                                <TouchableOpacity
                                    onPress={() => navigate("reset_password")}
                                    style={styles.forgotPassword}
                                    activeOpacity={1}
                                >
                                    <Text
                                        style={{
                                            textAlign: "center",
                                            fontSize: 12,
                                            fontWeight: "600",
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontWeight: "500",
                                                color: "#333",
                                            }}
                                        >
                                            Hai dimenticato la tua password?
                                        </Text>{" "}
                                        <Text
                                            style={{
                                                fontWeight: "bold",
                                                color: "#333",
                                            }}
                                        >Recupera qui la tua password.</Text>
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            {/*    /!*  /!*<View style={styles.divideLine}>*!/*!/*/}
                            {/*    /!*  /!*  <View style={styles.ORtextWrapper}>*!/*!/*/}
                            {/*    /!*  /!*    <Text*!/*!/*/}
                            {/*    /!*  /!*        style={{*!/*!/*/}
                            {/*    /!*  /!*          color: "#333",*!/*!/*/}
                            {/*    /!*  /!*          fontWeight: "600",*!/*!/*/}
                            {/*    /!*  /!*        }}*!/*!/*/}
                            {/*    /!*  /!*    >*!/*!/*/}
                            {/*    /!*  /!*      OR*!/*!/*/}
                            {/*    /!*  /!*    </Text>*!/*!/*/}
                            {/*    /!*  /!*  </View>*!/*!/*/}
                            {/*    /!*  /!*</View>*!/*!/*/}
                            {/*    /!*  /!*<TouchableOpacity style={styles.btnLoginWithFacebook}>*!/*!/*/}
                            {/*    /!*  /!*  <Icon name="facebook" color="#318bfb" size={20} />*!/*!/*/}
                            {/*    /!*  /!*  <Text*!/*!/*/}
                            {/*    /!*  /!*      style={{*!/*!/*/}
                            {/*    /!*  /!*        color: "#318bfb",*!/*!/*/}
                            {/*    /!*  /!*        fontWeight: "bold",*!/*!/*/}
                            {/*    /!*  /!*      }}*!/*!/*/}
                            {/*    /!*  /!*  >*!/*!/*/}
                            {/*    /!*  /!*    Login with Facebook*!/*!/*/}
                            {/*    /!*  /!*  </Text>*!/*!/*/}
                            {/*    /!*  /!*</TouchableOpacity>*!/*!/*/}
                            {/*</View>*/}
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                navigate("register");
                            }}
                            activeOpacity={1}
                            style={styles.registerWrapper}
                        >
                            <Text
                                style={{
                                    textAlign: "center",
                                    fontSize: 12,
                                    fontWeight: "bold",
                                }}
                            >
                                <Text
                                    style={{
                                        fontWeight: "500",
                                        color: "#333",
                                    }}
                                >
                                    Non hai ancora un profilo?
                                </Text>{" "}
                                Registrati qui.
                            </Text>
                        </TouchableOpacity>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </SafeAreaView>
            </>

        );
    }
}

export default Login;
