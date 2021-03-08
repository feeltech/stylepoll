// ? Screens
import {getStatusBarHeight} from "react-native-status-bar-height";
import {Dimensions} from "react-native";
import {ExtraPost, ExtraStory} from "../../modals";
import firestore from '@react-native-firebase/firestore'

export const SCREENS = {
    HOME: "home",
    CAMERA: "camera",
    CAPTURE_ACTION: "capture_action",
    SEARCH: "search",
    FAVOURITES: "favourites",
    PROFILE: "profile",
    ALERT_POLL: "alert_poll",
    SEND_TO_FRIEND: "send_to_friend",
    SEND_TO_FEED: "send_to_feed",
    FEED_TO_FRIEND:"feed_to_friend",
    POLL_DETAILS:"poll_details",
    POLL_STATS:"poll_stats",
    REGISTER:"register",
    LOGIN:"login",
    RESET_PASSWORD:"reset_password",
    ROOT:'root',
    POST:'post',
    STORY_VIEW:'story_view',
    OTHER_USER_PROFILE:'other_user_profile',
    WARDROBE_VIEW:'wardrobe_view',
    SEARCH_DISCOVER:'search-discover',
    SEARCH_FRIENDS: 'search-friends'
};

export const STATUS_BAR_HEIGHT: number = getStatusBarHeight();
export const SCREEN_HEIGHT: number = Math.round(
    Dimensions.get("window").height,
);
export const SCREEN_WIDTH: number = Math.round(Dimensions.get("window").width);
export const SCREEN_WIDTH_NEW: number = Dimensions.get("window").width;

export const STORY_LIST: ExtraStory[] = [
    {
        ownUser: {
            avatarURL:
                "https://i.pinimg.com/736x/cd/83/f5/cd83f51c1cf0dc3f1e9f632640fed7b7.jpg",
            username: "Olivia Elba"
        },
        storyList: [
            {}
        ],
    },
    {
        ownUser: {
            avatarURL:
                "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/ashley-graham-4-1512659570.jpg?crop=1xw:1xh;center,top&resize=480:*",
            username: "Emma Eva"
        },
        storyList: [
            {}
        ],
    },
    {
        ownUser: {
            avatarURL:
                "https://cdn.vox-cdn.com/thumbor/Oi6jzvQzWetJGlkpwLqlP1L9p28=/0x0:5568x3712/1200x800/filters:focal(2858x720:3748x1610)/cdn.vox-cdn.com/uploads/chorus_image/image/62207705/922984782.jpg.0.jpg",
            username: "Idris Elba"
        },
        storyList: [
            {}
        ],
    },
    {
        ownUser: {
            avatarURL:
                "https://www.harpersbazaararabia.com/public/images/2018/09/30/Amal-Clooney-wearing-a-powerful-red-dress.jpg",
            username: "Sophia Adams"
        },
        storyList: [
            {}
        ],
    },
    {
        ownUser: {
            avatarURL:
                "https://i.pinimg.com/236x/33/19/59/3319590d22effaa75eaab48b42baf297--army-green-pants-navy-pants.jpg",
            username: "Isabella Charlotte"
        },
        storyList: [
            {}
        ],
    },
    {
        ownUser: {
            avatarURL:
                "https://www.cstylejeans.com/wp-content/uploads/2016/03/dresses-womens-petite.jpg",
            username: "Emily Elizabeth"
        },
        storyList: [
            {}
        ],
    },
    // {
    //     ownUser: {
    //         avatarURL:
    //             "https://lh3.googleusercontent.com/proxy/faJq1RNJ4x2CCfzVfKKptAnotAr7SgOl8fMYNFfH-bAX_LvHn33OkjTzYKrLmumybzIkNlu3zZ_YVaFvfkJIkiBW3ukB07jC-YCvYv-xCURHPwQDerRWWM9RfI0AP3oTYmZH8_R2iNcxy8HiLMM2pJBXeb1_sGd5NQ",
    //         username: "Camila Sofia"
    //     },
    //     storyList: [
    //         {}
    //     ],
    // },
    {
        ownUser: {
            avatarURL:
                "https://qph.fs.quoracdn.net/main-qimg-39326121072967973758697c1f7361d6.webp",
            username: "Mia Harper"
        },
        storyList: [
            {}
        ],
    },
    {
        ownUser: {
            avatarURL:
                "https://i.pinimg.com/originals/85/53/c4/8553c446b930548b556c7d5dbbcc5241.jpg",
            username: "Aria Scarlett"
        },
        storyList: [
            {}
        ],
    },
    {
        ownUser: {
            avatarURL:
                "https://www.livinghours.com/wp-content/uploads/2016/04/Dessert-Tan-Dress.jpg",
            username: "Chloe Madison"
        },
        storyList: [
            {}
        ],
    },
];

export const POST_LIST: ExtraPost[] = [{
    ownUser: {
        avatarURL:
            "https://i.pinimg.com/736x/cd/83/f5/cd83f51c1cf0dc3f1e9f632640fed7b7.jpg",
        username: "Olivia Elba"
    },
    content: "https://www.livinghours.com/wp-content/uploads/2016/04/Dessert-Tan-Dress.jpg",
    hashtags: ["top", "panties"],
    source: [{
        uri: "https://www.livinghours.com/wp-content/uploads/2016/04/Dessert-Tan-Dress.jpg",
        width: 50,
        height: 50,
        extension: '.jpg',
        fullSize: false,
        tags: [{
            x: 3,
            y: 3,
            width: 50,
            height: 50,
            username: "Olivia Elba"
        }]
    }]
},
    {
        ownUser: {
            avatarURL:
                "https://www.livinghours.com/wp-content/uploads/2016/04/Dessert-Tan-Dress.jpg",
            username: "Mia Harper"
        },
        content: "https://www.livinghours.com/wp-content/uploads/2016/04/Dessert-Tan-Dress.jpg",
        hashtags: ["top", "panties"],
        source: [{
            uri: "https://i.pinimg.com/736x/cd/83/f5/cd83f51c1cf0dc3f1e9f632640fed7b7.jpg",
            width: 50,
            height: 50,
            extension: '.jpg',
            fullSize: false,
            tags: [{
                x: 3,
                y: 3,
                width: 50,
                height: 50,
                username: "Olivia Elba"
            }]
        }]
    }]


export const USER_COLLECTION = firestore().collection('users');
export const POST_COLLECTION = firestore().collection('posts');
export const FOLLOWING_COLLECTION = firestore().collection('following');
export const FOLLOWERS_COLLECTION = firestore().collection('followers');
export const FEED_COLLECTIONS = firestore().collection('feeds');
export const ALERT_POLL_COLLECTIONS = firestore().collection('alert-poll');
export const MOOD_COLLECTIONS = firestore().collection('moods');
export const TAG_COLLECTIONS = firestore().collection('tags');
export const NOTIFICATION_COLLECTIONS = firestore().collection('notifications');
