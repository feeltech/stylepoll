import React, {useEffect, useState} from 'react'
import {ScrollView, StyleSheet, Text, View} from 'react-native'
import PostItem from './postItem'
import {ExtraPost, PostDoc, PostList} from "../../../modals";
import {fetchLocalStorage} from "../../../utils/local-storage";
import {deletePost} from "../../../services/firebase/firebaseService";

export interface PostListProps {
    data: PostList,
    posts:PostDoc[],
    onDeleteItem:(postId: string) => void;

}

export interface PostListStates {
    postList : PostList,
    user:any
}

class Posts extends React.Component<PostListProps, PostListStates>{

    constructor(props:PostListProps) {
        super(props);
        this.state = {
            postList:[],
            user:null
        }
    }
    componentDidMount() {
        fetchLocalStorage("loggedUser").then(res => {
            this.setState({user:res})
        })
    }

    private onDeletePost = (postId: string) => {
        this.props.onDeleteItem(postId)
    }


    render() {
        return (
            <View style={styles.container}>
                {this.props.posts.map((post, index) => (
                    <PostItem
                        key={index} post={post} user={this.state.user} onDeleteItem={this.onDeletePost}/>
                ))}
                {
                    this.props.posts.length === 0 &&
                    <View style={{flex:5,justifyContent:'center',alignItems:'flex-end',flexDirection: 'row'}}>
                        <Text style={{color:"#3a464f",fontSize:25, fontWeight:'bold'}}>Ancora nessun Poll</Text>
                    </View>
                }
            </View>
        )
    }
}
export default React.memo(Posts)

const styles = StyleSheet.create({
    container: {
        display:'flex',
        flex:1
    }
})
