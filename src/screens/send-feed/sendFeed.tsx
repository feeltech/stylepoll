import React from "react";
import FeedForm from "../../shared/components/feed-form/feedForm";
import {navigate} from "../../services/navigation";
import {PostDoc} from "../../modals";
import {fetchLocalStorage} from "../../utils/local-storage";
import {createFeed, createPost} from "../../services/firebase/firebaseService";
import {generateGUID, uploadImageAndGetUrl} from "../../utils";
import storage from "@react-native-firebase/storage";


interface ISendFeedStates {
    imageURI: string,
    user: any
}

class SendFeed extends React.Component<any, ISendFeedStates> {

    constructor(props: any) {
        super(props);
        this.state = {
            imageURI: '',
            user: ''
        }
    }

    componentDidMount() {
        const imageURL = this.props.route.params && this.props.route.params.imageUri ? this.props.route.params.imageUri : 'https://i.pinimg.com/736x/cd/83/f5/cd83f51c1cf0dc3f1e9f632640fed7b7.jpg';
        fetchLocalStorage("loggedUser").then((res: any) => {
            this.setState({
                user: res,
                imageURI: imageURL
            })
        })
    }

    private onSave = (description: string, moods: string[], tags: string[], location: string) => {
        uploadImageAndGetUrl(this.state.imageURI)
                .then((url) => {
                    let documentID = ''
                    const post: PostDoc = {
                        description: description,
                        moods: moods,
                        tags: tags,
                        location: location,
                        isFeedPost: true,
                        isPollPost: false,
                        image: url,
                        user: this.state.user,
                        pollStartDate: null,
                        userId:this.state.user.userId
                    }
                    createPost(post).then(res => {
                        documentID = res.id
                        navigate("camera")
                    }).then(err => {
                        console.log(err)
                    })
                }).catch(err => {
                    console.log(err)
                })
    }

    render() {
        return (
            <FeedForm showDate={false} headerTitle={"Send to feed"} onSubmit={this.onSave} onClose={() => {
                navigate("camera")
            }} imageURI={this.state.imageURI} showHeader={true}/>
        );
    }
}

export default SendFeed;

