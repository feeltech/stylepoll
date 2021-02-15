import React, { useState } from "react";
import {
  Animated,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {usePromiseTracker} from "react-promise-tracker";

import { navigate } from "../../services/navigation";
import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  STATUS_BAR_HEIGHT,
} from "../../shared/constants";
import { LoggingUser } from "../../modals";
import { loginUser } from "../../services/firebase/firebaseService";
import {fetchLocalStorage, storeLocalStorage} from "../../utils/local-storage";

import { styles } from "./authStyles";

interface ILoginStates {
  email: string;
  password: string;
  hidePassword: boolean;
  allowLogin: boolean;
}

class Login extends React.Component<any, ILoginStates> {
  constructor(props: any) {
    super(props);
    this.state = {
      email: "sachin@mail.com",
      password: "aaa",
      hidePassword: true,
      allowLogin: true,
    };
  }


  componentDidMount() {
    fetchLocalStorage("loggedUser").then(res => {
      if(res){
        navigate("home")
      }
    })
  }

  private onLogin = () => {
    const login: LoggingUser = {
      email: this.state.email,
      password: this.state.password,
    };

    loginUser(login)
      .then((user) => {
        this.resetStates();
        storeLocalStorage("loggedUser", user).then(() => {
          navigate("root");
        });
      })
      .catch((err) => {
        console.log("failed to log in");
      });
  };
  private resetStates = () => {
    this.setState({
      email: "",
      password: "",
      hidePassword: true,
      allowLogin: true,
    });
  };

  render() {
    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                style={styles.keyboardAvoidingViewContainer}
                behavior="height"
            >
              <View style={styles.centerContainer}>
                <View style={styles.logoWrapper}>
                  {/*<Image*/}
                  {/*  resizeMode="contain"*/}
                  {/*  style={styles.logo}*/}
                  {/*  source={require("../../../assets/images/logo.png")}*/}
                  {/*/>*/}
                  <Text style={{fontSize:50,fontFamily:'serif',color:'#318bfb'}}>STYLEPOLL</Text>
                </View>
                <View style={styles.loginForm}>
                  <View style={styles.textInputWrapper}>
                    <TextInput
                        autoCapitalize="none"
                        value={this.state.email}
                        onChangeText={(text) => {
                          this.setState({ email: text });
                        }}
                        placeholder="Email"
                        placeholderTextColor={"black"}
                        style={styles.input}
                    />
                  </View>
                  <View style={styles.textInputWrapper}>
                    <TextInput
                        value={this.state.password}
                        onChangeText={(text) => this.setState({ password: text })}
                        secureTextEntry={this.state.hidePassword}
                        placeholder="Password"
                        style={styles.input}
                        placeholderTextColor={"black"}
                    />
                    <TouchableOpacity
                        style={styles.hidePasswordIcon}
                        onPress={() => {
                          this.setState({ hidePassword: !this.state.hidePassword });
                        }}
                    >
                      {this.state.hidePassword ? (
                          <Icon name="eye-off-outline" size={20} color="#333" />
                      ) : (
                          <Icon name="eye-outline" color="#318bfb" size={20} />
                      )}
                    </TouchableOpacity>
                  </View>
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
                {/*<View style={styles.otherOptionsWrapper}>*/}
                {/*  /!*<TouchableOpacity*!/*/}
                {/*  /!*    onPress={() => navigate("ForgotPassword")}*!/*/}
                {/*  /!*    style={styles.forgotPassword}*!/*/}
                {/*  /!*    activeOpacity={1}*!/*/}
                {/*  /!*>*!/*/}
                {/*  /!*  <Text*!/*/}
                {/*  /!*      style={{*!/*/}
                {/*  /!*        textAlign: "center",*!/*/}
                {/*  /!*        fontSize: 12,*!/*/}
                {/*  /!*        fontWeight: "600",*!/*/}
                {/*  /!*      }}*!/*/}
                {/*  /!*  >*!/*/}
                {/*  /!*    <Text*!/*/}
                {/*  /!*        style={{*!/*/}
                {/*  /!*          fontWeight: "500",*!/*/}
                {/*  /!*          color: "#333",*!/*/}
                {/*  /!*        }}*!/*/}
                {/*  /!*    >*!/*/}
                {/*  /!*      Did your forget your login information?*!/*/}
                {/*  /!*    </Text>{" "}*!/*/}
                {/*  /!*    Get helping to login.*!/*/}
                {/*  /!*  </Text>*!/*/}
                {/*  /!*</TouchableOpacity>*!/*/}
                {/*  /!*<View style={styles.divideLine}>*!/*/}
                {/*  /!*  <View style={styles.ORtextWrapper}>*!/*/}
                {/*  /!*    <Text*!/*/}
                {/*  /!*        style={{*!/*/}
                {/*  /!*          color: "#333",*!/*/}
                {/*  /!*          fontWeight: "600",*!/*/}
                {/*  /!*        }}*!/*/}
                {/*  /!*    >*!/*/}
                {/*  /!*      OR*!/*/}
                {/*  /!*    </Text>*!/*/}
                {/*  /!*  </View>*!/*/}
                {/*  /!*</View>*!/*/}
                {/*  /!*<TouchableOpacity style={styles.btnLoginWithFacebook}>*!/*/}
                {/*  /!*  <Icon name="facebook" color="#318bfb" size={20} />*!/*/}
                {/*  /!*  <Text*!/*/}
                {/*  /!*      style={{*!/*/}
                {/*  /!*        color: "#318bfb",*!/*/}
                {/*  /!*        fontWeight: "bold",*!/*/}
                {/*  /!*      }}*!/*/}
                {/*  /!*  >*!/*/}
                {/*  /!*    Login with Facebook*!/*/}
                {/*  /!*  </Text>*!/*/}
                {/*  /!*</TouchableOpacity>*!/*/}
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
                      fontWeight: "600",
                    }}
                >
                  <Text
                      style={{
                        fontWeight: "500",
                        color: "#333",
                      }}
                  >
                    Don't have account?
                  </Text>{" "}
                  Register now.
                </Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </SafeAreaView>
    );
  }
}

export default Login;
