import React from "react";
import {SCREEN_HEIGHT, SCREEN_WIDTH, STATUS_BAR_HEIGHT} from "../../shared/constants";
import {
    Image,
    KeyboardAvoidingView,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {navigate} from "../../services/navigation";
import {styles} from "./authStyles";
import {User} from "../../modals";
import {registerUser} from "../../services/firebase/firebaseService";
import {isEmpty} from 'lodash';
import Loader from "../../shared/components/loader/loader";

interface ILoginStates {
    name:string,
    email:string,
    password:string,
    confirmPassword:string,
    hidePassword:boolean,
    hideConfirmPassword:boolean,
    allowRegister:boolean,
    error:string|null,
    isLoading:boolean
}

export default class Register extends React.Component<any, ILoginStates>{

    constructor(props:any) {
        super(props);
        this.state = {
            name:'',
            email:'',
            confirmPassword:'',
            password:'',
            hidePassword:true,
            allowRegister:true,
            hideConfirmPassword:true,
            error:null,
            isLoading:false
        }
    }

    private onRegister = () => {
        if(isEmpty(this.state.name) || isEmpty(this.state.email) || isEmpty(this.state.password) || isEmpty(this.state.confirmPassword)){
            this.setState({
                error:'Fill in all the fields!'
            })
            return
        }

        if(this.state.password !== this.state.confirmPassword){
            this.setState({
                error:'Passwords do not match!'
            })
            return;
        }
        const user: User = {
            name:this.state.name.toLowerCase(),
            email:this.state.email.toLowerCase(),
            password:this.state.password
        }
        this.setState({isLoading:true})
        registerUser(user).then(res => {
            this.resetStates()
            this.setState({
                isLoading:false
            })
            navigate("login")
        }).catch(err => {
            this.setState({
                error:err
            })
            console.log("Register user error ", err)
        })
    }

    private resetStates = () => {
        this.setState({
            name:'',
            email:'',
            confirmPassword:'',
            password:'',
            hidePassword:true,
            allowRegister:true,
            hideConfirmPassword:true
        })
    }


    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Loader show={this.state.isLoading}/>
                <KeyboardAvoidingView style={styles.keyboardAvoidingViewContainer}
                                      behavior="height">
                    <View style={styles.centerContainer}>
                        <View style={styles.logoWrapper}>
                            <Text style={{fontSize:50,fontFamily:'serif',color:'#318bfb'}}>STYLEPOLL</Text>
                        </View>
                        {/*<View style={{flex:1}}>*/}
                        {/*    <PhotoUploadComponent/>*/}
                        {/*</View>*/}
                        <View style={styles.loginForm}>

                            <View style={styles.textInputWrapper}>
                                <TextInput autoCapitalize="none" value={this.state.name} onChangeText={(text)=>{this.setState({name:text})}} placeholder="Name" placeholderTextColor={"black"}
                                           style={styles.input} />
                            </View>
                            <View style={styles.textInputWrapper}>
                                <TextInput autoCapitalize="none" value={this.state.email} onChangeText={(text)=>{this.setState({email:text})}} placeholder="Email" placeholderTextColor={"black"}
                                           style={styles.input} />
                            </View>
                            <View style={styles.textInputWrapper}>
                                <TextInput value={this.state.password}
                                           onChangeText={(text => this.setState({password:text}))}
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
                            <View style={styles.textInputWrapper}>
                                <TextInput value={this.state.confirmPassword}
                                           onChangeText={(text => this.setState({confirmPassword:text}))}
                                           secureTextEntry={this.state.hideConfirmPassword}
                                           placeholder="Confirm Password" placeholderTextColor={"black"} style={styles.input} />
                                <TouchableOpacity
                                    style={styles.hidePasswordIcon}
                                    onPress={()=>{this.setState({hideConfirmPassword:!this.state.hideConfirmPassword})}}
                                >
                                    {this.state.hideConfirmPassword ? (
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
                                onPress={this.onRegister}
                                disabled={!this.state.allowRegister}
                                activeOpacity={0.6} style={{
                                ...styles.btnLogin,
                                opacity: this.state.allowRegister ? 1 : 0.6
                            }}>
                                <Text style={{
                                    fontSize: 16,
                                    color: '#fff',
                                    fontWeight: '500'
                                }}>Register</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.otherOptionsWrapper}>
                            {/*<View style={styles.divideLine}>*/}
                            {/*    <View style={styles.ORtextWrapper}>*/}
                            {/*        <Text style={{*/}
                            {/*            color: '#333',*/}
                            {/*            fontWeight: '600'*/}
                            {/*        }}>OR</Text>*/}
                            {/*    </View>*/}
                            {/*</View>*/}
                            {/*<TouchableOpacity style={styles.btnLoginWithFacebook}>*/}
                            {/*    <Icon name="facebook" color="#318bfb" size={20} />*/}
                            {/*    <Text style={{*/}
                            {/*        color: '#318bfb',*/}
                            {/*        fontWeight: 'bold'*/}
                            {/*    }}>Register with Facebook</Text>*/}
                            {/*</TouchableOpacity>*/}
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
        );
    }
}

