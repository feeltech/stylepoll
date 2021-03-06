import React from "react";
import {SCREEN_HEIGHT, SCREEN_WIDTH, SCREEN_WIDTH_NEW} from "../../shared/constants";
import {Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import * as Progress from "react-native-progress";
import {getProgressBarValue} from "../../utils";
import {startCase,isEmpty,map,isNull,isEqual} from 'lodash';
import {AlertPoll} from "../../modals";
import {hasReactedToPoll, reactToPoll} from "../../services/firebase/firebaseService";
import post from "../post/post";

interface IStoryViewContentProps {
    poll:AlertPoll,
    user:any
}

interface IStoryViewContentStates {
    poll:any,
    userReacted:boolean,
    remainingTime:string;
    pollDurationEnded?:boolean;
    pollDuration:number,
    durationDiff:number,
    user:any,
    activePollIndex:number
}


export default class StoryViewContent extends React.Component<IStoryViewContentProps, IStoryViewContentStates>{

    constructor(props:IStoryViewContentProps) {
        super(props);
        this.state = {
            poll: null,
            user: "",
            userReacted: false,
            remainingTime:'',
            pollDurationEnded:false,
            pollDuration:0,
            durationDiff:0,
            activePollIndex:0
        };
    }

    componentWillReceiveProps(nextProps) {
        let poll = nextProps.poll;
        if(!isNull(poll)){
            if(poll.createdAt >= new Date()){
                this.setState({
                    pollDurationEnded:true
                })
            }
            hasReactedToPoll(poll, this.props.user.userId).then((res) => {
                this.setState({
                    userReacted:res
                })
            }).catch(err => {
            });

            setInterval(() => {
                this.getRemainingTime(poll);
            },1000)
            this.setState({
                poll:poll
            })
        }


    }

    private onLikePoll = () => {
        const poll = this.state.poll
        if (poll.likes) {
            poll.likes.push(this.props.user);
        } else {
            poll.likes = [this.props.user];
        }
        reactToPoll(this.props.user, poll)
            .then((res) => {
                this.setState({
                    userReacted: true,
                    poll:res
                });
            })
            .catch((err) => {});
    };

    private dislikePoll = () => {
        const poll = this.state.poll
        if (poll.dislikes) {
            poll.dislikes.push(this.props.user);
        } else {
            poll.dislikes = [this.props.user];
        }
        reactToPoll(this.props.user, poll)
            .then((res) => {
                this.setState({
                    userReacted: true,
                    poll:res
                });
            })
            .catch((err) => {});
    };

    private getRemainingTime = (poll:AlertPoll) => {
        const p = poll;
        if (p) {
            const pollStartTime = p?.createdAt && p?.createdAt.toDate()
            const pollEndTime = p?.pollEndDate && p?.pollEndDate.toDate();
            const currentDate = new Date()
            const pollDuration =  Math.trunc((pollEndTime.valueOf() - pollStartTime.valueOf()) / 1000)
            const durationDiff = Math.trunc((pollEndTime.valueOf() - currentDate.valueOf()) / 1000)
            const hours = Math.trunc(durationDiff / 3600);
            const minuites = Math.trunc((durationDiff - (hours * 3600)) / 60)
            const seconds = durationDiff - (hours * 3600 + minuites *60);
            const remainingTime = `${((hours.toString()).length >= 2) ? hours : `0${hours}`}:${((minuites.toString()).length === 2) ? minuites : `0${minuites}`}:${((seconds.toString()).length === 2) ? seconds : `0${seconds}`}`;

            if(durationDiff > 0){
                this.setState({
                    pollDuration:pollDuration,
                    durationDiff:durationDiff,
                    remainingTime:remainingTime
                })
            }else {
                this.setState({
                    pollDuration: pollDuration,
                    durationDiff: durationDiff,
                    remainingTime:"00:00:00"
                })
            }
        }
        return p
    }

    private getProgressBarValues = (progressName:string) => {
        if (this.state.poll) {
            const likesLength = this.state.poll.likes ? this.state.poll.likes.length : 0;
            const dislikeLength = this.state.poll.dislikes ? this.state.poll.dislikes.length :0;
            if (progressName == "like") {
                return getProgressBarValue(likesLength, likesLength + dislikeLength)
            }

            if (progressName == "dislike") {
                return getProgressBarValue(dislikeLength, likesLength + dislikeLength)
            }

            return 0
        }else{
            return 0
        }

    }


    render() {
        const {poll} = this.state;
        return (
            <>
                {
                    poll &&
                    <TouchableOpacity style={{flex:1,width: SCREEN_WIDTH_NEW, height: SCREEN_HEIGHT-60}} disabled={true} onPress={()=>{this.setState({activePollIndex:this.state.activePollIndex +1})}}>

                        {
                            !isEmpty(poll.description) &&
                            <View style={[{flexDirection: "row", marginBottom: 2}]}>
                                <Text style={{color: '#000', fontWeight: 'bold'}}>{poll.description}</Text>
                            </View>
                        }


                        <View style={[{flexDirection: "row", marginBottom:2}]}>
                            <View style={{flexDirection:'column',justifyContent:'center'}}>
                                <Progress.Bar progress={1- getProgressBarValue(this.state.durationDiff,this.state.pollDuration)} width={SCREEN_WIDTH - 100} color={'#979797'} height={5}
                                              borderRadius={10}/>
                            </View>
                            <View style={{flexDirection:'column',justifyContent:'center'}}>
                                <Image
                                    source={{uri: "https://i.pinimg.com/originals/2a/0c/fe/2a0cfecd615bed18b3cf4688d2b5962c.png"}}
                                    style={{width: 20, height: 20, borderRadius: 10, marginRight: 5}}/>
                            </View>
                            <View style={{flexDirection:'column',justifyContent:'center'}}>
                                <Text style={{color: "#000", fontWeight: "bold", marginRight: 5}}>{this.state.remainingTime}</Text>
                            </View>
                        </View>
                        <ImageBackground
                            source={{ uri: poll.image }}
                            style={styles.image}
                        >
                            {
                                poll.isDmPoll &&
                                <View style={{flex:0,justifyContent:'flex-end',alignItems:'flex-end',margin:10, borderRadius:50}}>
                                    <Text style={{backgroundColor:'#02d5f8',color:'#FFF',fontWeight:'bold'}}>Just for you ❤</Text>
                                </View>
                            }

                            <View style={{ flex: 10 }} />
                            {!(this.state.userReacted || this.state.remainingTime === "00:00:00") && (
                                <View
                                    style={{
                                        flex: 1,
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        marginLeft: 30,
                                        marginRight: 30,
                                        marginBottom:30
                                    }}
                                >
                                    <TouchableOpacity
                                        style={{
                                            height: 45,
                                            width: 45,
                                            borderRadius: 45/ 2,
                                            backgroundColor: "#FFF",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                        onPress={()=>{this.dislikePoll()}}
                                    >
                                        <Image
                                            source={{
                                                uri:
                                                    "https://icons.iconarchive.com/icons/google/noto-emoji-people-bodyparts/1024/12014-thumbs-down-icon.png",
                                            }}
                                            style={{
                                                width: 30,
                                                height: 30,
                                                borderRadius: 15,
                                            }}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{
                                            height: 45,
                                            width: 45,
                                            borderRadius: 45/ 2,
                                            backgroundColor: "#FFF",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                        onPress={()=>{this.onLikePoll()}}
                                    >
                                        <Image
                                            source={{
                                                uri:
                                                    "data:image/jpeg;base64,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",
                                            }}
                                            style={{
                                                width: 30,
                                                height: 30,
                                                borderRadius: 15,
                                            }}
                                        />
                                    </TouchableOpacity>
                                </View>
                            )}
                            {(this.state.userReacted || this.state.remainingTime === "00:00:00") &&
                            <View style={{padding:10,flexDirection:'row'}}>
                                <View style={{flexDirection:'column',justifyContent:'center'}}>
                                    <Progress.Bar progress={this.getProgressBarValues("like")} width={SCREEN_WIDTH-40} color={'#57ff00'} height={5} borderRadius={10}/>
                                </View>
                                <View style={{flexDirection:'column',marginLeft:6}}>
                                    <Text>🥰</Text>
                                </View>
                            </View>
                            }
                        </ImageBackground>
                    </TouchableOpacity >
                }
                </>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        height: "100%",
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
        marginTop: 10,
        width: SCREEN_WIDTH * 0.9,
    },
    textInputWrapper: {
        position: "relative",
        width: "100%",
        height: 44,
        borderRadius: 5,
        borderColor: "#ddd",
        borderWidth: 1,
        marginVertical: 7.5,
    },
    dropDownWrapper: {
        width: "100%",
        borderRadius: 5,
        // borderColor: '#ddd',
        // borderWidth: 1,
        marginVertical: 7.5,
    },
    centerContainer: {
        // height: SCREEN_HEIGHT - 50 - 40 - STATUS_BAR_HEIGHT,
        width: SCREEN_WIDTH,
        justifyContent: "center",
        alignItems: "center",
    },
    input: {
        width: "100%",
        height: "100%",
        // paddingHorizontal: 15
    },
    input_label: {
        color: "#626060",
    },
    logoWrapper: {
        marginTop: 20,
    },
    logo: {
        height: 300,
        width: 300,
        overflow: "hidden",
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
    },
});
