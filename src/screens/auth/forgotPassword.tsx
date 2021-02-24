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
import {fetchLocalStorage} from "../../utils/local-storage";
import {resetPassword} from "../../services/firebase/firebaseService";
import {isEmpty} from 'lodash';
interface ILoginStates {
    email:string,
    oldPassword:string,
    newPassword:string,
    confirmPassword:string,
    hideCurrentPassword:boolean,
    hideNewPassword:boolean,
    hideVerifyPassword:boolean,
    user:any,
    error: string |null
}

class ForgotPassword extends React.Component<any, ILoginStates>{

    constructor(props:any) {
        super(props);
        this.state = {
            email:'',
            oldPassword:'',
            newPassword:'',
            confirmPassword:'',
            hideCurrentPassword:false,
            hideNewPassword:false,
            user:'',
            error:null,
            hideVerifyPassword:false
        }
    }

    componentDidMount() {
        fetchLocalStorage("loggedUser").then(res => {
            this.setState({
                user:res
            })
        })
    }

    onChangePassword = () => {
        if(isEmpty(this.state.email)){
            this.setState({error:'Enter Email!'})
            return;
        }
        if(this.state.newPassword !== this.state.confirmPassword){
            this.setState({error:'Passwords Do Not Match!'})
            return;
        }
        resetPassword(this.state.email,this.state.oldPassword,this.state.newPassword).then(res => {
            navigate('login')
        }).catch(e => {
            this.setState({
                error:e
            })
        })
    }

    render(){
        return (
            <SafeAreaView style={styles.container}>
                <KeyboardAvoidingView>
                    <View style={styles.centerContainer}>
                        <View style={styles.logoWrapper}>
                            {/*<Image*/}
                            {/*    resizeMode="contain"*/}
                            {/*    style={styles.logo}*/}
                            {/*    source={require('../../../assets/images/logo.png')} />*/}
                            <Text style={{fontSize:50,fontFamily:'serif',color:'#318bfb'}}>STYLEPOLL</Text>
                        </View>
                        <View style={styles.loginForm}>
                            <View style={styles.textInputWrapper}>
                                <TextInput autoCapitalize="none" value={this.state.email} onChangeText={(text)=>{this.setState({email:text})}} placeholder="Your Email" placeholderTextColor={"black"}
                                           style={styles.input} />
                            </View>
                            <View style={styles.textInputWrapper}>
                                <TextInput autoCapitalize="none"
                                           value={this.state.oldPassword}
                                           onChangeText={(text)=>{this.setState({oldPassword:text})}}
                                           placeholder="Current Password"
                                           placeholderTextColor={"black"}
                                           secureTextEntry={!this.state.hideCurrentPassword}
                                           style={styles.input} />
                                <TouchableOpacity
                                    style={styles.hidePasswordIcon}
                                    onPress={()=>{this.setState({hideCurrentPassword:!this.state.hideCurrentPassword})}}
                                >
                                    {!this.state.hideCurrentPassword ? (
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
                                           secureTextEntry={!this.state.hideNewPassword}
                                           placeholder="New Password" placeholderTextColor={"black"} style={styles.input} />
                                <TouchableOpacity
                                    style={styles.hidePasswordIcon}
                                    onPress={()=>{this.setState({hideNewPassword:!this.state.hideNewPassword})}}
                                >
                                    {!this.state.hideNewPassword ? (
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
                                <TextInput value={this.state.confirmPassword}
                                           onChangeText={(text => this.setState({confirmPassword:text}))}
                                           secureTextEntry={!this.state.hideVerifyPassword}
                                           placeholder="Verify Password" placeholderTextColor={"black"} style={styles.input} />
                                <TouchableOpacity
                                    style={styles.hidePasswordIcon}
                                    onPress={()=>{this.setState({hideVerifyPassword:!this.state.hideVerifyPassword})}}
                                >
                                    {!this.state.hideVerifyPassword ? (
                                        <Icon name="eye-off-outline" size={20}
                                              color="#333" />
                                    ) : (
                                        <Icon name="eye-outline" color="#318bfb"
                                              size={20} />
                                    )
                                    }
                                </TouchableOpacity>
                            </View>
                            {
                                this.state.error &&
                                <View style={styles.textInputErrorWrapper}>
                                    <Text style={{color: 'red', fontSize: 13}}>{this.state.error}</Text>
                                </View>
                            }
                            <TouchableOpacity
                                onPress={this.onChangePassword}
                                disabled={(isEmpty(this.state.email) || isEmpty(this.state.oldPassword) || isEmpty(this.state.newPassword) || isEmpty(this.state.confirmPassword))}
                                activeOpacity={0.6} style={{
                                ...styles.btnLogin,
                                opacity: (!(isEmpty(this.state.email) || isEmpty(this.state.oldPassword) || isEmpty(this.state.newPassword) || isEmpty(this.state.confirmPassword))) ? 1 : 0.6
                            }}>
                                <Text style={{
                                    fontSize: 16,
                                    color: '#fff',
                                    fontWeight: '500'
                                }}>Change Password</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={()=>{navigate("login")}}
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
                            }}>Already have a account?
                            </Text> Login</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </SafeAreaView>
        )
    }

}
export default ForgotPassword

