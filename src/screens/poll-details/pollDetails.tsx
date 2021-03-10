import React from "react";
import {
    Image, ImageBackground,
    KeyboardAvoidingView,
    SafeAreaView,
    ScrollView,
    StyleSheet, Text,
    TouchableOpacity,
    View
} from "react-native";
import {Header, Icon} from "react-native-elements";
import {goBack, navigate} from "../../services/navigation";
import {SCREEN_WIDTH, STORY_LIST} from "../../shared/constants";
import * as Progress from 'react-native-progress';
import {AlertPoll, User} from "../../modals";
import moment from "moment";
import {getProgressBarValue} from "../../utils";
import {fetchLocalStorage} from "../../utils/local-storage";
import Carousal from "../../shared/components/carausal/carausal";
import StoryViewContent from "../story-view/story-view-content";
import PollDetailContent from "./poll-details-content";

interface IPollDetailsStates {
    imageURI: string;
    timeRemaining: string;
    pollDuration:number,
    durationDiff:number,
    polls: any;
    user: any;
}

class PollDetails extends React.Component<any, IPollDetailsStates> {

    constructor(props: any) {
        super(props);
        this.state = {
            imageURI: '',
            timeRemaining: "",
            pollDuration:0,
            durationDiff:0,
            polls: [],
            user: "",
        }
    }

    componentDidMount() {
        const poll = this.props.route.params && this.props.route.params.poll;
        fetchLocalStorage("loggedUser").then((res) => {
            this.setState({
                user: res,
                polls:poll
            });
        })
    }

    private _renderItem = (item,index, parallaxProps) => {
        return (
            <PollDetailContent poll={item} user={this.state.user}/>
        );
    }


    render() {
        console.log("poll", this.state.polls)
        return (
            <>
                    <Header
                        statusBarProps={{barStyle: "dark-content"}}
                        barStyle="dark-content"
                        containerStyle={{
                            display: "flex",
                            backgroundColor: "#0C0D34",
                        }}
                        leftComponent={<TouchableOpacity onPress={() => {
                            goBack()
                        }}>
                            <Icon
                                name="close"
                                color="white"/>
                        </TouchableOpacity>}
                        centerComponent={{
                            text: "Alert poll",
                            style: {color: "#FFF", fontWeight: "bold"},
                        }}
                    />
                    <Carousal renderCarousalData={({item,index},parallaxProps)=>{return this._renderItem(item,index,parallaxProps)}} carousalData={this.state.polls.polls}/>
            </>
        );
    }
}

export default PollDetails;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
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
    textInputWrapper: {
        position: 'relative',
        width: '100%',
        height: 20,
        borderRadius: 5,
        borderColor: '#ddd',
        // borderWidth: 1,
        marginVertical: 5,
        marginHorizontal: 7.5
    },
    image: {
        borderRadius: 999,
        width: "100%",
        height: "100%",
    },
    logoWrapper: {
        flex: 1,
        marginTop: 20,
        padding:10
    },
    logo: {
        height: 300,
        overflow: 'hidden'
    },
});
