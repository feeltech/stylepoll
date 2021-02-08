import React, { useState } from 'react'
import {
    Animated,
    Image,
    KeyboardAvoidingView,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {navigate} from "../../services/navigation";
import {SCREEN_HEIGHT, SCREEN_WIDTH, STATUS_BAR_HEIGHT} from "../../shared/constants";
import {styles} from "./authStyles";

interface ILoginStates {
    oldPassword:string,
    newPassword:string,
    confirmPassword:string,
    hidePassword:boolean,
    allowResetPassword:boolean
}

class ForgotPassword extends React.Component<any, ILoginStates>{

    constructor(props:any) {
        super(props);
        this.state = {
            oldPassword:'',
            newPassword:'',
            confirmPassword:'',
            hidePassword:false,
            allowResetPassword:true
        }
    }

    render(){
        return (
            <SafeAreaView style={styles.container}>
                <KeyboardAvoidingView>
                    <View style={styles.centerContainer}>
                        <View style={styles.logoWrapper}>
                            <Image
                                resizeMode="contain"
                                style={styles.logo}
                                source={require('../../../assets/images/logo.png')} />
                        </View>
                        <View style={styles.loginForm}>
                            <View style={styles.textInputWrapper}>
                                <TextInput autoCapitalize="none" value={this.state.oldPassword} onChangeText={(text)=>{this.setState({oldPassword:text})}} placeholder="Current Password" placeholderTextColor={"black"}
                                           style={styles.input} />
                                <TouchableOpacity
                                    style={styles.hidePasswordIcon}
                                    onPress={()=>{this.setState({hidePassword:!this.state.hidePassword})}}
                                >
                                    {this.state.hidePassword ? (
                                        <Icon name="eye-off-outline" size={20}
                                              color="#333" />
                                    ) : (
                                        <Icon name="eye-outline" color="#318bfb"
                                              size={20} />
                                    )
                                    }
                                </TouchableOpacity>
                            </View>
                            <View style={styles.textInputWrapper}>
                                <TextInput value={this.state.newPassword}
                                           onChangeText={(text => this.setState({newPassword:text}))}
                                           secureTextEntry={this.state.hidePassword}
                                           placeholder="Password" placeholderTextColor={"black"} style={styles.input} />
                                <TouchableOpacity
                                    style={styles.hidePasswordIcon}
                                    onPress={()=>{this.setState({hidePassword:!this.state.hidePassword})}}
                                >
                                    {this.state.hidePassword ? (
                                        <Icon name="eye-off-outline" size={20}
                                              color="#333" />
                                    ) : (
                                        <Icon name="eye-outline" color="#318bfb"
                                              size={20} />
                                    )
                                    }
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity
                                onPress={()=>{}}
                                disabled={!this.state.allowResetPassword}
                                activeOpacity={0.6} style={{
                                ...styles.btnLogin,
                                opacity: this.state.allowResetPassword ? 1 : 0.6
                            }}>
                                <Text style={{
                                    fontSize: 16,
                                    color: '#fff',
                                    fontWeight: '500'
                                }}>Login</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.otherOptionsWrapper}>
                            <TouchableOpacity
                                onPress={() => navigate('ForgotPassword')}
                                style={styles.forgotPassword}
                                activeOpacity={1}>
                                <Text style={{
                                    textAlign: 'center',
                                    fontSize: 12,
                                    fontWeight: '600'
                                }}>
                                    <Text style={{
                                        fontWeight: '500',
                                        color: '#333'
                                    }}>Did your forget your login information?
                                    </Text> Get helping to login.</Text>
                            </TouchableOpacity>
                            <View style={styles.divideLine}>
                                <View style={styles.ORtextWrapper}>
                                    <Text style={{
                                        color: '#333',
                                        fontWeight: '600'
                                    }}>OR</Text>
                                </View>
                            </View>
                            <TouchableOpacity style={styles.btnLoginWithFacebook}>
                                <Icon name="facebook" color="#318bfb" size={20} />
                                <Text style={{
                                    color: '#318bfb',
                                    fontWeight: 'bold'
                                }}>Login with Facebook</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={()=>{}}
                        activeOpacity={1}
                        style={styles.registerWrapper}>
                        <Text style={{
                            textAlign: 'center',
                            fontSize: 12,
                            fontWeight: '600'
                        }}>
                            <Text style={{
                                fontWeight: '500',
                                color: '#333'
                            }}>Don't have account?
                            </Text> Register now.</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </SafeAreaView>
        )
    }

}
export default ForgotPassword

