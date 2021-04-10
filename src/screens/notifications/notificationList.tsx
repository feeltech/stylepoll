import React, {Component} from "react";
import {KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
/**
 * ? Local Imports
 */
import {goBack, navigate} from "../../services/navigation";
import FastImage from "react-native-fast-image";
import {fetchLocalStorage} from "../../utils/local-storage";
import {getNotifications} from "../../services/firebase/firebaseService";
import {Notification} from "../../modals";
import {NOTIFICATION_TYPES, SCREEN_WIDTH} from "../../shared/constants";
import Loader from "../../shared/components/loader/loader";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {Header} from "react-native-elements";
import {includes, reverse,isEmpty} from 'lodash'
import moment from 'moment'


interface INotificationStates {
    user: any;
    notifications: Notification[],
    isLoading: boolean
}

export default class NotificationList extends Component<any, INotificationStates> {

    private focusListener;

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            notifications: [],
            isLoading: false
        }
    }

    componentDidMount() {
        this.focusListener = this.props.navigation.addListener('focus', () => {
            fetchLocalStorage("loggedUser").then(res => {
                this.setState({
                    isLoading: true,
                    user: res
                })
                this.getUserNotifications(res.userId);
            })
        });
    }

    componentWillUnmount() {
        this.focusListener();
    }

    private getUserNotifications(userId: string) {
        getNotifications(userId).then(notifications => {
            const sortedNotifications = notifications.sort(function compare(a, b) {
                const dateA = a.meta.notified_at.toDate();
                const dateB = b.meta.notified_at.toDate();
                return dateB - dateA;
            });
            this.setState({
                notifications: sortedNotifications,
                isLoading: false
            })
        })
    }

    private navigateNotification = (notification: Notification) => {
        if (notification.meta.notificationType === NOTIFICATION_TYPES.FOLLOW_USER) {
            navigate("other_user_profile", {user: notification.meta.notifier})
        } else if (notification.meta.notificationType === NOTIFICATION_TYPES.ALERT_POLL) {
            const notifier = notification.meta.notifier;
            const poll = notification.meta.alertPoll;
            navigate("story_view", {polls: {userId: notifier.userId, userName: notifier.name, polls: [poll]}})
        }
    }

    private renderFollowNotification = (notification: Notification) => {
        return (
            <Text style={{
                fontWeight: 'bold'
            }}>Ha iniziato a seguirti</Text>
        )
    }

    private renderAlertPollNotification = (notification: Notification) => {
        return (
            <>
                {!isEmpty(notification.meta.alertPoll.description) &&
                <Text style={{
                    fontWeight: 'bold'
                }}>{notification.meta.alertPoll.description}</Text>
                }
                <Text style={{
                    fontWeight: '600',
                    fontSize:12
                }}>Aiutami a scegliere, vota questo poll.</Text>
            </>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <Header
                    statusBarProps={{barStyle: "light-content"}}
                    barStyle="dark-content"
                    containerStyle={{
                        display: "flex",
                        backgroundColor: "#0C0D34",
                    }}
                    // leftComponent={<TouchableOpacity onPress={goBack}>
                    //   <Icon
                    //       name="chevron-left"
                    //       color="#FFF"
                    //       size={20}/>
                    // </TouchableOpacity>}
                    centerComponent={{
                        text: 'Notifiche',
                        style: {color: "#FFF", fontWeight: "bold"},
                    }}
                />
                <ScrollView style={{backgroundColor: 'none', display: 'flex'}}>
                    {
                        this.state.notifications.length != 0 && this.state.notifications.map(notification => (
                            <View style={styles.postHeader}>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.navigateNotification(notification)
                                    }}
                                    style={styles.infoWrapper}>
                                    <FastImage style={styles.avatar}
                                               source={{uri: notification.meta.image}}/>
                                    <View style={{flex: 1, flexDirection: 'column'}}>
                                        <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
                                            <Text style={{
                                                fontWeight: '600'
                                            }}>{notification.meta.notifier.name}</Text>
                                            <Text style={{
                                                fontWeight: '600',
                                                fontSize:12
                                            }}>{moment(notification.meta.notified_at.toDate()).format("DD MMM")}</Text>
                                        </View>

                                        {notification.meta.notificationType === NOTIFICATION_TYPES.FOLLOW_USER && this.renderFollowNotification(notification)}
                                        {notification.meta.notificationType === NOTIFICATION_TYPES.ALERT_POLL && this.renderAlertPollNotification(notification)}
                                    </View>

                                </TouchableOpacity>
                                {/*<TouchableOpacity>*/}
                                {/*    <Icons name="dots-vertical" size={24} />*/}
                                {/*</TouchableOpacity>*/}
                            </View>
                        ))
                    }
                    {
                        this.state.notifications.length === 0 &&
                        <View style={{flex: 1, justifyContent: 'space-around', alignItems: 'center'}}>
                            <Text style={{color: "#3a464f", fontSize: 25, fontWeight: 'bold'}}>No Notifications</Text>
                        </View>
                    }
                </ScrollView>
                <Loader show={this.state.isLoading}/>
            </View>
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
        // justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderTopColor: '#ddd',
        // borderTopWidth: 0.5,
        borderBottomColor: '#ddd',
        borderBottomWidth: 0.5,
    },
    infoWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        width:'100%',
        // backgroundColor:'red'
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

