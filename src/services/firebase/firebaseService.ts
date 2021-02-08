import firestore from '@react-native-firebase/firestore';
import {AlertPoll, LoggingUser, PostDoc, User, WardRobe} from "../../modals";
import {navigate} from "../navigation";
import {map, filter, includes, sortBy, isNull, isEmpty} from 'lodash';
import {
    ALERT_POLL_COLLECTIONS,
    FEED_COLLECTIONS,
    FOLLOWERS_COLLECTION,
    FOLLOWING_COLLECTION,
    MOOD_COLLECTIONS, POST_COLLECTION,
    TAG_COLLECTIONS,
    USER_COLLECTION
} from "../../shared/constants";
import moment from "moment";
import {err} from "react-native-svg/lib/typescript/xml";
import post from "../../screens/post/post";


export function registerUser(user: User): Promise<User> {
    return USER_COLLECTION.add(user).then((res) => {
        user.userId = res.id
        return Promise.resolve(user)
    }).catch(err => {
        return Promise.reject(err)
    });
}

export function loginUser(user: User): Promise<User> {
    return USER_COLLECTION
        .where("email", "==", user.email)
        .get()
        .then((res) => {
            const data = res.docs[0].data();
            if (data && data.password === user.password) {
                user.userId = res.docs[0].id;
                user.name = data.name;
                user.profileImage = data.profileImage;
                return Promise.resolve(user)
            }
            return Promise.reject("Invalid credentials")
        }).catch(err => {
            return Promise.reject(err)
        });
}

export function getMoods(): Promise<any> {
    return MOOD_COLLECTIONS.get().then(res => {
        return Promise.resolve(res.docs)
    }).catch(err => {
        return Promise.reject(err)
    })
}

export function getTags(): Promise<any> {
    return TAG_COLLECTIONS.get().then(res => {
        return Promise.resolve(res.docs)
    }).catch(err => {
        return Promise.reject(err)
    })
}

export function createPost(post: PostDoc): Promise<any> {
    post.createdAt = new Date()
    return POST_COLLECTION.doc(post.userId).collection('userPosts').add(post).then((res) => {
        post.postId = res.id
        onCreatePost(post)
        return Promise.resolve(res)
    }).catch(err => {
        return Promise.reject(err)
    });

}

export function fetchFeedPosts(email: string): Promise<any> {
    const feeds = []
    return firestore()
        .collection('feed')
        // Filter results
        .doc(email)
        .get().then(res => {
            // @ts-ignore
            const documentIds = res.data().feeds
            map(documentIds, id => {
                firestore().collection("posts").doc(id).get().then((res: any) => {
                    // @ts-ignore
                    feeds.push(res.data())
                })
            }, () => {
                return Promise.resolve(feeds)
            })
        }).catch(err => Promise.resolve(err))
}


export function fetchAllUsers(): Promise<User[]> {
    return USER_COLLECTION.get().then(res => {
        const userDocs = res.docs;
        const users: User[] = [];
        map(userDocs, doc => {
            const userData: any = doc.data()
            const user: User = {
                userId: doc.id,
                email: userData.email,
                name: userData.name,
                profileImage: userData.profileImage
            }
            users.push(user)
        })
        return Promise.resolve(users)
    }).catch(err => {
        return Promise.reject(err)
    })
}

export function discoverAllUsers(search: string): Promise<User[]> {

    return fetchAllUsers().then(res => {
        let users: User[] = res;
        users = filter(users, user => includes(user.name, search))
        return Promise.resolve(users)
    }).catch(err => {
        return Promise.reject(err)
    })
}

export function isFollowingUser(loggedInUserId: string, followingProfileId: string): Promise<boolean> {
    return FOLLOWERS_COLLECTION.doc(loggedInUserId).collection("userFollowers").doc(followingProfileId).get().then(res => {
        return Promise.resolve(res.exists)
    }).catch(err => {
        return Promise.reject(false)
    })
}


export function followUser(loggedInUserId: string, followingProfileId: string): Promise<boolean> {
    const following = FOLLOWING_COLLECTION.doc(loggedInUserId).collection("userFollowing").doc(followingProfileId).set({}).then(() => {
        return Promise.resolve(true)
    })
    const followers = FOLLOWERS_COLLECTION.doc(followingProfileId).collection("userFollowers").doc(loggedInUserId).set({}).then(() => {
        return Promise.resolve(true)
    })

    return Promise.all([followers, following]).then(res => {
        return Promise.resolve(true)
    }).catch(err => {
        return Promise.resolve(true)
    })
}

export function unFollowUser(loggedInUserId: string, followingProfileId: string): Promise<boolean> {
    const following = FOLLOWING_COLLECTION.doc(loggedInUserId).collection("userFollowing").doc(followingProfileId).get().then(res => {
        if (res.exists) {
            res.ref.delete()
        }
    })
    const followers = FOLLOWERS_COLLECTION.doc(followingProfileId).collection("userFollowers").doc(loggedInUserId).get().then(res => {
        if (res.exists) {
            res.ref.delete()
        }
    })

    return Promise.all([followers, following]).then(res => {
        return Promise.resolve(true)
    }).catch(err => {
        return Promise.resolve(true)
    })
}

export function getUserFollowings(userID: string): Promise<User[]> {
    return FOLLOWING_COLLECTION.doc(userID).collection("userFollowing").get().then(res => {
        const userDocs = res.docs;
        const users: User[] = [];
        map(userDocs, doc => {
            const userData: any = doc.data()
            const user: User = {
                userId: doc.id,
                email: userData.email,
                name: userData.name
            }
            users.push(user)
        })
        return Promise.resolve(users)
    }).catch(err => {
        return Promise.reject(err)
    })
}

export function getUserFollowers(userID: string): Promise<User[]> {
    return FOLLOWERS_COLLECTION.doc(userID).collection("userFollowers").get().then(res => {
        const userDocs = res.docs;
        const users: User[] = [];
        map(userDocs, doc => {
            const userData: any = doc.data()
            const user: User = {
                userId: doc.id,
                email: userData.email,
                name: userData.name
            }
            users.push(user)
        })
        return Promise.resolve(users)
    }).catch(err => {
        return Promise.reject(err)
    })
}

export function onCreatePost(post: PostDoc) {
    if (post.isFeedPost) {
        FEED_COLLECTIONS.doc(post.userId).collection('userFeed').add(post).then(res => {
            console.log("Feed created")
        }).catch(err => {
            console.log("Feed create error ", err)
        })
    }

    if (post.DMList?.length != 0) {
        map(post.DMList, (userId) => {
            FEED_COLLECTIONS.doc(userId).collection('userFeed').add(post).then(res => {
                console.log("Sent to fiends feed")
            }).catch(err => {
                console.log("Send to friend feed error ", err)
            })
        })
    }

    if (post.isPollPost) {
        ALERT_POLL_COLLECTIONS.doc(post.userId).collection('userPolls').add(post).then(res => {
            console.log("Poll created")
        }).catch(err => {
            console.log("Poll create error ", err)
        })
    }

    if (isNull(post.user.profileImage) || isEmpty(post.user.profileImage)) {
        const user = post.user;
        user.profileImage = post.image
        USER_COLLECTION.doc(user.userId).set(user).then(res => {
            console.log("Profile Picture updated")
        }).catch(err => {
            console.log("Profile Picture update error ", err)
        })
    }
}

export function getRandomPosts(): Promise<PostDoc[]> {
    return fetchAllUsers().then(res => {
        return POST_COLLECTION.doc(res[0].userId).collection("userPosts").get().then(res => {
            const posts: PostDoc[] = [];
            map(res.docs, doc => {
                const post: PostDoc = doc.data()
                post.postId = doc.id
                posts.push(doc.data())
            })
            return Promise.resolve(posts)
        }).catch(err => {
            return Promise.reject(err)
        })
    })
}

export function getUserPosts(userId: string): Promise<PostDoc[]> {
    return POST_COLLECTION.doc(userId).collection("userPosts").get().then(res => {
        const posts: PostDoc[] = [];
        map(res.docs, doc => {
            const post: PostDoc = doc.data();
            post.postId = doc.id
            posts.push(post)
        })
        return Promise.resolve(posts)
    }).catch(err => {
        return Promise.reject(err)
    })
}

export function getPost(userId: string, postId): Promise<PostDoc> {
    return POST_COLLECTION.doc(userId).collection("userPosts").doc(postId).get().then(res => {
        const post: PostDoc = res.data()
        return Promise.resolve(post)
    }).catch(err => {
        return Promise.reject(err)
    })
}

function sortPostsByDate(a, b): number {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    // @ts-ignore
    return dateB - dateA;
}

export function getUserPolls(userId: string): Promise<AlertPoll[]> {
    return ALERT_POLL_COLLECTIONS.doc(userId).collection("userPolls").get().then(res => {
        const polls: AlertPoll[] = [];
        map(res.docs, doc => {
            polls.push(doc.data())
        })
        return Promise.resolve(polls)
    }).catch(err => {
        return Promise.reject(err)
    })
}

export function getFollowingUserPolls(userId: string): Promise<AlertPoll[]> {
    return FOLLOWING_COLLECTION.doc(userId).collection("userFollowing").get().then(res => {
        const followings = res.docs;
        return map(followings, (user: any) => {
            return ALERT_POLL_COLLECTIONS.doc(user).collection("userPolls").get().then(res => {
                const polls: AlertPoll[] = [];
                map(res.docs, doc => {
                    polls.push(doc.data())
                })
                return Promise.resolve(polls)
            }).catch(err => {
                return Promise.reject(err)
            })
        });

    })
}

export function getWardrobe(userId: string): Promise<WardRobe[]> {
    return getUserPosts(userId).then(res => {
        let wardrobe: WardRobe[] = []
        const tags = getWardrobeTags(res);
        wardrobe = getWardrobePosts(res, tags)
        return Promise.resolve(wardrobe)
    }).catch(err => {
        return Promise.reject(err)
    })
}

function getWardrobeTags(posts: PostDoc[]): string[] {
    const tags: string[] = [];
    map(posts, post => {
        map(post.tags, tag => {
            if (!includes(tags, tag.name)) {
                tags.push(tag.name)
            }
        })
    })
    return tags
}

function getWardrobePosts(posts: PostDoc[], tags: string[]): WardRobe[] {
    const wardrobeList: WardRobe[] = []
    map(tags, tag => {
        const wardrobe: WardRobe = {
            tagName: tag,
            posts: []
        }
        map(posts, post => {
            if (!includes(post.tags, tag)) {
                wardrobe.posts.push(post)
            }
        })
        wardrobeList.push(wardrobe)
    })
    return wardrobeList
}

export function getUserFeed(userId: string):Promise<PostDoc[]>{
    let posts:PostDoc[] =[]
    const userPost = getUserPosts(userId).then(res => {
        posts = posts.concat(res)
    })
    const followingPosts =  FOLLOWING_COLLECTION.doc(userId).collection("userFollowing").get().then(res => {
        const followings = res.docs;
        return map(followings, (user: any) => {
            getUserPosts(userId).then(res => {
                posts = posts.concat(res)
            })
        })
    })
    return Promise.all([userPost,followingPosts]).then(res => {
        return Promise.resolve(posts)
    })
}

