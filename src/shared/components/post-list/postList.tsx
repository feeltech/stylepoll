import React, {useEffect, useState} from 'react'
import {StyleSheet, View} from 'react-native'
import PostItem from './postItem'
import {ExtraPost, PostDoc, PostList} from "../../../modals";

export interface PostListProps {
    data: PostList,
    posts:PostDoc[]

}

export interface PostListStates {
    postList : PostList,
}

class Posts extends React.Component<PostListProps, PostListStates>{

    constructor(props:PostListProps) {
        super(props);
        this.state = {
            postList:[],
        }
    }


    render() {
        return (
            <View style={styles.container}>
                {this.props.posts.map((post, index) => (
                    <PostItem
                        key={index} post={post}/>
                ))}
            </View>
        )
    }
}
export default React.memo(Posts)

const styles = StyleSheet.create({
    container: {}
})
