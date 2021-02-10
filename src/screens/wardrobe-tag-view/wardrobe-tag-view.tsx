import React from "react";
import {
    Animated,
    Image,
    ImageBackground,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import {Header, Icon} from "react-native-elements";
import {SCREEN_WIDTH, SCREEN_WIDTH_NEW} from "../../shared/constants";
import {goBack, navigate} from "../../services/navigation";
import {PostDoc} from "../../modals";
import {map} from 'lodash'

interface IWardrobeTagViewStates {
    tagName:string;
    posts:PostDoc[]
}
export default class WardrobeTagView extends React.Component<any, IWardrobeTagViewStates>{

    constructor(props) {
        super(props);
        this.state = {
            tagName:'',
            posts:[]
        }
    }
    componentDidMount() {
        const tagName = this.props.route.params && this.props.route.params.tagName;
        const posts = this.props.route.params && this.props.route.params.posts;
        this.setState({
            tagName: tagName,
            posts:posts
        })
    }

    render() {
        // const _loadingAnim = React.useMemo(() => new Animated.Value(0), [])

        return (
            <SafeAreaView style={styles.container}>
                    <Header
                        statusBarProps={{barStyle: "dark-content"}}
                        barStyle="dark-content"
                        containerStyle={{
                            display: "flex",
                            backgroundColor: "#ffffff",
                        }}
                        leftComponent={<TouchableOpacity onPress={goBack}>
                            <Icon
                                name="close"
                                color="black"/>
                        </TouchableOpacity>}
                        centerComponent={{
                            text: this.state.tagName,
                            style: {color: "#000", fontWeight: "bold"},
                        }}
                    />
                <ScrollView style={{backgroundColor: 'none'}}>
                    <View style={{
                        flex: 5,
                        flexDirection: 'row',
                        flexWrap: 'wrap'
                    }}>
                        {map(this.state.posts, post => {
                                return (
                                    <TouchableOpacity style={{ borderColor: 'white', borderWidth: 1,width: SCREEN_WIDTH_NEW/3, height: SCREEN_WIDTH_NEW/3}} onPress={ ()=>{navigate("post",{postId: post.postId,userId: post.user.userId})}}>
                                        <Image
                                            source={{uri: post.image}}
                                            style={{width: undefined, height: undefined,flex:1}}
                                        />
                                    </TouchableOpacity>
                                )
                            }

                        )}

                    </View>
                </ScrollView>


            </SafeAreaView>
        );
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
        position: 'relative',
        width: '100%',
        height: 44,
        borderRadius: 5,
        borderColor: '#ddd',
        borderWidth: 1,
        marginVertical: 7.5
    },
    dropDownWrapper: {
        width: '100%',
        borderRadius: 5,
        // borderColor: '#ddd',
        // borderWidth: 1,
        marginVertical: 7.5
    },
    centerContainer: {
        // height: SCREEN_HEIGHT - 50 - 40 - STATUS_BAR_HEIGHT,
        width: SCREEN_WIDTH,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        width: '100%',
        height: '100%',
        // paddingHorizontal: 15
    },
    input_label: {
        color: '#626060'
    },
    logoWrapper: {
        marginTop: 20
    },
    logo: {
        height: 300,
        width: 300,
        overflow: 'hidden'
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
    },
});
