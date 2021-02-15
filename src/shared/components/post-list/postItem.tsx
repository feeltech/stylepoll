import React, {useEffect, useState} from "react";
import { Animated, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { default as Icon, default as Icons } from 'react-native-vector-icons/MaterialCommunityIcons'
import {ExtraPost, PostDoc} from "../../../modals";
import PhotoShower from "./photoShower";
import CirclePagination from "../circle-pagination/circlePagination";
import {startCase} from 'lodash';
import {SCREEN_HEIGHT} from "../../constants";
import {navigate} from "../../../services/navigation";
export interface PostItemProps {
    item?: ExtraPost,
    setPost?: React.Dispatch<React.SetStateAction<ExtraPost>>
    post?:PostDoc
}

const PostItem = ({ setPost, item,post }: PostItemProps) => {
    const [currentPage, setCurrentPage] = useState<number>(1)
    const _animBookmarkNotification = React.useMemo(() => new Animated.Value(0), [])
    const isLiked = true
    const _onChangePageHandler = (page: number) => {
        setCurrentPage(page)
    }
    return (
        <View style={styles.container}>
            <View style={styles.postHeader}>
                <TouchableOpacity
                    onPress={()=>{navigate("other_user_profile", {user: post?.user})}}
                    style={styles.infoWrapper}>
                    <FastImage style={styles.avatar}
                               source={{ uri:post?.user?.profileImage}} />
                               <View style={{flex:1,flexDirection:'column'}}>
                                   <Text style={{
                                       fontWeight: '600'
                                   }}>{startCase(post?.user?.name) }</Text>
                                   <Text style={{
                                       fontSize:10,
                                       fontWeight: '600'
                                   }}>{startCase(post?.location) }</Text>
                               </View>

                </TouchableOpacity>
                <TouchableOpacity>
                    <Icons name="dots-vertical" size={24} />
                </TouchableOpacity>
            </View>
            <View style={styles.body}>
                <PhotoShower onChangePage={_onChangePageHandler} post={post} />
                <Animated.View style={{
                    ...styles.bookmarkAddionNotification,
                    transform: [{
                        translateY: _animBookmarkNotification
                    }]
                }}>
                </Animated.View>
            </View>
            <View style={styles.reactionsWrapper}>
                <View style={styles.reactions}>
                    <View style={styles.lReactions}>
                        <TouchableOpacity
                            // onPress={_toggleLikePost}
                        >
                            <Icons name={isLiked
                                ? "heart" : "heart-outline"}
                                   size={24}
                                   color={
                                       isLiked ? 'red' : '#000'
                                   } />
                        </TouchableOpacity>
                    </View>
                    {item?.source && item.source.length > 1 && <CirclePagination
                        maxPage={item.source?.length || 0}
                        currentPage={currentPage}
                    />}
                    {/*<TouchableOpacity*/}
                    {/*    activeOpacity={0.7}*/}
                    {/*    // onPress={_onToggleBookmark}*/}
                    {/*>*/}
                    {/*    <Image*/}
                    {/*        style={{*/}
                    {/*            height: 24,*/}
                    {/*            width: 24*/}
                    {/*        }}*/}
                    {/*        source={*/}
                    {/*            true ? require('../../../../assets/icons/bookmarked.png')*/}
                    {/*                : require('../../../../assets/icons/bookmark.png')} />*/}
                    {/*</TouchableOpacity>*/}
                </View>
                {item?.likes && item.likes.length !== 0 && <Text style={{
                    fontWeight: "bold",
                    marginVertical: 5,
                }}>{item.likes.length >= 1000 ?
                    (Math.round(item.likes.length / 1000) + 'k')
                    : item.likes.length} {item.likes.length < 2 ? 'like' : 'likes'}</Text>}
            </View>
        </View >
    )
}

export default React.memo(PostItem)

const styles = StyleSheet.create({
    container: {
    },
    postHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderTopColor: '#ddd',
        borderTopWidth: 0.5,
        borderBottomColor: '#ddd',
        borderBottomWidth: 0.5,
    },
    infoWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    body: {
        overflow: 'visible',
        height:'auto'
    },
    bookmarkAddionNotification: {
        position: 'absolute',
        backgroundColor: "#fff",
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 44,
        width: '100%',
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        bottom: -44,
        left: 0
    },
    btnGoToSaved: {
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bookmarkPreviewImage: {
        height: 30,
        width: 30,
        borderRadius: 5
    },
    avatar: {
        borderColor: '#ddd',
        borderWidth: 0.3,
        height: 36,
        width: 36,
        borderRadius: 36,
        marginRight: 10,
    },
    reactionsWrapper: {
        padding: 10
    },
    reactions: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    lReactions: {
        flexDirection: 'row',
        width: 24.3 * 3 + 15,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    btnViewCmt: {
        marginVertical: 5
    },
    commentInputWrapper: {
        height: 24,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 5
    },
    commentIconsWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 14.3 * 3 + 15
    },
    commentAvatar: {
        width: 24,
        height: 24,
        borderRadius: 24
    },
})
