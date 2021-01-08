import React, {useEffect, useState} from "react";
import { Animated, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { default as Icon, default as Icons } from 'react-native-vector-icons/MaterialCommunityIcons'
import {ExtraPost} from "../../../modals";
import PhotoShower from "./photoShower";
import CirclePagination from "../circle-pagination/circlePagination";

export interface PostItemProps {
    item: ExtraPost,
    setPost?: React.Dispatch<React.SetStateAction<ExtraPost>>
}

const PostItem = ({ setPost, item }: PostItemProps) => {
    const myUsername = "store.getState().user.user.userInfo?.username"
    const [currentPage, setCurrentPage] = useState<number>(1)
    // const bookmarks = useSelector(state => state.user.bookmarks)?.find(x => x.name === 'All Posts')?.bookmarks || []
    const [content, setContent] = useState<JSX.Element[]>([])
    // const user = useSelector(state => state.user.user)
    const _animBookmarkNotification = React.useMemo(() => new Animated.Value(0), [])
    const isLiked = true
    const _onChangePageHandler = (page: number) => {
        setCurrentPage(page)
    }
    // useEffect(() => {
    //     setContent(createFilterContent(item.content || ''))
    // }, [item])
    // const _toggleLikePost = () => {
    //     dispatch(ToggleLikePostRequest(item.uid || 0, item, setPost))
    // }
    // let diffTime: string = timestampToString(item.create_at?.toMillis() || 0, true)
    // const _onViewAllComments = () => {
    //     navigation.navigate('Comment', {
    //         postId: item.uid,
    //         ...(setPost ? { postData: { ...item } } : {})
    //     })
    // }
    // const _onToggleBookmark = () => {
    //     const isBookmarked = !!bookmarks.find(x => x.postId === item.uid)
    //     if (!isBookmarked) {
    //         Animated.sequence([
    //             Animated.timing(_animBookmarkNotification, {
    //                 toValue: -44,
    //                 duration: 500,
    //                 useNativeDriver: true
    //             }),
    //             Animated.delay(3000)
    //             ,
    //             Animated.timing(_animBookmarkNotification, {
    //                 toValue: 0,
    //                 duration: 500,
    //                 useNativeDriver: true
    //             }),
    //         ]).start()
    //     }
    //     dispatch(ToggleBookMarkRequest(item.uid as number,
    //         (item.source || [{ uri: '' }])[0].uri))
    // }
    // const isBookmarked = !!bookmarks.find(x => x.postId === item.uid)
    return (
        <View style={styles.container}>
            <View style={styles.postHeader}>
                <TouchableOpacity
                    style={styles.infoWrapper}>
                    <FastImage style={styles.avatar}
                               source={{ uri: item.ownUser?.avatarURL }} />
                    <Text style={{
                        fontWeight: '600'
                    }}>{item.ownUser?.username }</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Icons name="dots-vertical" size={24} />
                </TouchableOpacity>
            </View>
            <View style={styles.body}>
                <PhotoShower onChangePage={_onChangePageHandler} sources={item.source || []} />
                <Animated.View style={{
                    ...styles.bookmarkAddionNotification,
                    transform: [{
                        translateY: _animBookmarkNotification
                    }]
                }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <FastImage
                            source={{
                                uri: 'https://i.pinimg.com/736x/cd/83/f5/cd83f51c1cf0dc3f1e9f632640fed7b7.jpg'
                            }}
                            style={styles.bookmarkPreviewImage}
                        />
                        <Text style={{
                            fontSize: 16,
                            fontWeight: '600',
                            marginHorizontal: 10
                        }}>Saved</Text>
                    </View>
                    <TouchableOpacity
                        // onPress={() => {
                        //     navigate('Saved')
                        // }}
                        style={styles.btnGoToSaved}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: '500',
                            color: "#318bfb"
                        }}>
                            See All
                        </Text>
                    </TouchableOpacity>
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
                    {item.source && item.source.length > 1 && <CirclePagination
                        maxPage={item.source?.length || 0}
                        currentPage={currentPage}
                    />}
                    <TouchableOpacity
                        activeOpacity={0.7}
                        // onPress={_onToggleBookmark}
                    >
                        <Image
                            style={{
                                height: 24,
                                width: 24
                            }}
                            source={
                                true ? require('../../../../assets/icons/bookmarked.png')
                                    : require('../../../../assets/icons/bookmark.png')} />
                    </TouchableOpacity>
                </View>
                {item.likes && item.likes.length !== 0 && <Text style={{
                    fontWeight: "bold",
                    marginVertical: 5,
                }}>{item.likes.length >= 1000 ?
                    (Math.round(item.likes.length / 1000) + 'k')
                    : item.likes.length} {item.likes.length < 2 ? 'like' : 'likes'}</Text>}

                {/*<View style={{*/}
                {/*    flexWrap: 'wrap',*/}
                {/*    flexDirection: 'row',*/}
                {/*    alignItems: 'center'*/}
                {/*}}>*/}
                {/*    <Text style={{*/}
                {/*        fontWeight: "600",*/}
                {/*        marginVertical: 5,*/}
                {/*    }}>{item.ownUser?.username} </Text>*/}
                {/*    {content.map(Jsx => Jsx)}*/}
                {/*</View>*/}
                {/*<TouchableOpacity*/}
                {/*    activeOpacity={1}*/}
                {/*    style={styles.commentInputWrapper}>*/}
                {/*    <View style={{ flexDirection: 'row', alignItems: 'center' }}>*/}
                {/*        <FastImage source={{ uri: 'https://www.livinghours.com/wp-content/uploads/2016/04/Dessert-Tan-Dress.jpg', priority: FastImage.priority.high }}*/}
                {/*                   style={styles.commentAvatar} />*/}
                {/*        <Text style={{*/}
                {/*            color: "#666",*/}
                {/*            marginHorizontal: 10*/}
                {/*        }}>Add a comment...</Text>*/}
                {/*    </View>*/}
                {/*    <View style={styles.commentIconsWrapper}>*/}
                {/*        <TouchableOpacity onPress={() => {*/}
                {/*            // if (showCommentInput) showCommentInput(item.uid || 0, '❤')*/}
                {/*        }}>*/}
                {/*            <Text style={{*/}
                {/*                fontSize: 10*/}
                {/*            }}>❤</Text>*/}
                {/*        </TouchableOpacity>*/}
                {/*        <TouchableOpacity onPress={() => {*/}
                {/*            // if (showCommentInput) showCommentInput(item.uid || 0, '🙌')*/}
                {/*        }}>*/}
                {/*            <Text style={{*/}
                {/*                fontSize: 10*/}
                {/*            }}>🙌</Text>*/}
                {/*        </TouchableOpacity>*/}
                {/*        <Icons*/}
                {/*            name="plus-circle-outline"*/}
                {/*            color="#666" />*/}
                {/*    </View>*/}
                {/*</TouchableOpacity>*/}
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
        overflow: 'hidden'
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
