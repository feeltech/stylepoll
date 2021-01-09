import React from "react";
import FeedForm from "../../shared/components/feed-form/feedForm";
import {navigate} from "../../services/navigation";


interface ISendFeedStates {
    imageURI: string
}

class SendFeed extends React.Component<any, ISendFeedStates>{

    constructor(props: any) {
        super(props);
        this.state = {
            imageURI: ''
        }
    }

    componentDidMount() {
        const imageURL = this.props.route.params && this.props.route.params.imageUri ? this.props.route.params.imageUri : 'https://i.pinimg.com/736x/cd/83/f5/cd83f51c1cf0dc3f1e9f632640fed7b7.jpg';
        this.setState({
            imageURI: imageURL
        })
    }

    render() {
        return (
            <FeedForm showDate={false} headerTitle={"Send to feed"} onSubmit={()=>{navigate("camera")}} onClose={()=>{navigate("camera")}} imageURI={this.state.imageURI} showHeader={true}/>
        );
    }
}

export default SendFeed;

