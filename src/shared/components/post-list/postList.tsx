import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import PostItem from './postItem'
import {PostList} from "../../../modals";
export interface PostListProps {
    data: PostList,
}
const Posts = ({ data }: PostListProps) => {

    useEffect(() => {
    }, [])
    return (
        <View style={styles.container}>
            {data.map((post, index) => (
                <PostItem
                    key={index} item={post} />
            ))}
        </View>
    )
}

export default React.memo(Posts)

const styles = StyleSheet.create({
    container: {

    }
})
