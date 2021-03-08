import React from "react";
import FeedForm from "../../shared/components/feed-form/feedForm";
import {goBack, navigate} from "../../services/navigation";
import {PostDoc} from "../../modals";
import {fetchLocalStorage} from "../../utils/local-storage";
import {uploadImageAndGetUrl} from "../../utils";
import {createPost} from "../../services/firebase/firebaseService";
import Loader from "../../shared/components/loader/loader";


interface ISendFeedStates {
    imageURI: string;
    user:any;
    isLoading:boolean
}

class AlertPoll extends React.Component<any, ISendFeedStates>{

    constructor(props: any) {
        super(props);
        this.state = {
            imageURI: '',
            user:'',
            isLoading:false
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

    private onSave = (description: string, moods: string[], tags: string[], location: string,pollEndDate?: Date) => {
        this.setState({
            isLoading:true
        })
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
                pollEndDate: pollEndDate ? pollEndDate : null,
                userId:this.state.user.userId
            }
            createPost(post).then(res => {
                this.setState({isLoading:false})
                navigate("home")
            }).catch(err => {
                this.setState({isLoading:false})
                console.log(err)
            })
        }).catch(err => {
            console.log(err)
        })
    }
    render() {
        return (
            <>
                <Loader show={this.state.isLoading}/>
                <FeedForm showDate={true} headerTitle={"Alert Poll"} onSubmit={this.onSave} onClose={()=>{goBack()}} imageURI={this.state.imageURI} showHeader={true}/>

            </>
        );
    }
}

export default AlertPoll;

