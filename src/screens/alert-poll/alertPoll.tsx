import React from "react";
import FeedForm from "../../shared/components/feed-form/feedForm";
import {goBack, navigate} from "../../services/navigation";
import {PostDoc} from "../../modals";
import {fetchLocalStorage} from "../../utils/local-storage";
import {uploadImageAndGetUrl} from "../../utils";
import {createPost} from "../../services/firebase/firebaseService";


interface ISendFeedStates {
    imageURI: string;
    user:any
}

class AlertPoll extends React.Component<any, ISendFeedStates>{

    constructor(props: any) {
        super(props);
        this.state = {
            imageURI: '',
            user:''
        }
    }

    componentDidMount() {
        const imageURL = this.props.route.params && this.props.route.params.imageUri ? this.props.route.params.imageUri : 'https://i.pinimg.com/736x/cd/83/f5/cd83f51c1cf0dc3f1e9f632640fed7b7.jpg';
        this.setState({
            imageURI: imageURL
        })
        fetchLocalStorage("loggedUser").then((res: any) => {
            this.setState({
                user: res,
            })
        })
    }

    private onSave = (description: string, moods: string[], tags: string[], location: string,pollStartDate?: Date) => {
        uploadImageAndGetUrl(this.state.imageURI).then(res => {
            const post: PostDoc = {
                description: description,
                moods: moods,
                tags: tags,
                location: location,
                isFeedPost: false,
                isPollPost: true,
                image:res,
                user: this.state.user,
                pollStartDate: pollStartDate ? pollStartDate : null,
                userId:this.state.user.userId
            }
            createPost(post).then(res => {
                navigate("camera")
            }).catch(err => {
                console.log(err)
            })
        }).catch(err => {
            console.log(err)
        })
    }
    render() {
        return (
            <FeedForm showDate={true} headerTitle={"Alert Poll"} onSubmit={this.onSave} onClose={()=>{goBack()}} imageURI={this.state.imageURI} showHeader={true}/>
        );
    }
}

export default AlertPoll;

