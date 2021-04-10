import React from "react";
import FeedForm from "../../shared/components/feed-form/feedForm";
import {navigate} from "../../services/navigation";
import {PostDoc} from "../../modals";
import {fetchLocalStorage} from "../../utils/local-storage";


interface ISendFeedStates {
    imageURI: string;
    user:any
}

class FeedToFriend extends React.Component<any, ISendFeedStates>{

    constructor(props: any) {
        super(props);
        this.state = {
            imageURI: '',
            user:""
        }
    }

    componentDidMount() {
        const imageURL = this.props.route.params && this.props.route.params.imageUri ? this.props.route.params.imageUri : 'https://i.pinimg.com/736x/cd/83/f5/cd83f51c1cf0dc3f1e9f632640fed7b7.jpg';
        fetchLocalStorage("loggedUser").then((res: any) => {
            this.setState({
                user: res,
            })
        })
        this.setState({
            imageURI: imageURL
        })
    }

    private onNext = (description: string, moods: string[], tags: string[], location: string,pollEndDate?: Date) => {
        const post: PostDoc = {
            description: description,
            moods: moods,
            tags: tags,
            location: location,
            isFeedPost: false,
            isPollPost: true,
            user: this.state.user,
            pollStartDate: null,
            userId:this.state.user.userId,
            pollEndDate: pollEndDate ? pollEndDate : null,
        }
        navigate("send_to_friend",{postDoc:post,imageURI:this.state.imageURI})
    }

        render() {
        return (
            <FeedForm showDate={true} headerTitle={"Invia ad un amico"} onClose={()=>{navigate("camera")}} onSubmit={this.onNext} imageURI={this.state.imageURI} showHeader={true} headerRightLabel={"Avanti"}/>
        );
    }
}

export default FeedToFriend;

