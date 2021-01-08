// ? Screens
import {getStatusBarHeight} from "react-native-status-bar-height";
import {Dimensions} from "react-native";
import {ExtraPost, ExtraStory} from "../../modals";

export const SCREENS = {
    HOME: "home",
    CAMERA: "camera",
    CAPTURE_ACTION:"capture_action",
    SEARCH: "search",
    FAVOURITES: "favourites",
    PROFILE: "profile",
};

export const STATUS_BAR_HEIGHT: number = getStatusBarHeight();
export const SCREEN_HEIGHT: number = Math.round(
    Dimensions.get("window").height,
);
export const SCREEN_WIDTH: number = Math.round(Dimensions.get("window").width);

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
    {
        ownUser: {
            avatarURL:
                "https://lh3.googleusercontent.com/proxy/faJq1RNJ4x2CCfzVfKKptAnotAr7SgOl8fMYNFfH-bAX_LvHn33OkjTzYKrLmumybzIkNlu3zZ_YVaFvfkJIkiBW3ukB07jC-YCvYv-xCURHPwQDerRWWM9RfI0AP3oTYmZH8_R2iNcxy8HiLMM2pJBXeb1_sGd5NQ",
            username: "Camila Sofia"
        },
        storyList: [
            {}
        ],
    },
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
    source:[{
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
        source:[{
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
