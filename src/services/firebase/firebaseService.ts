import firestore from "@react-native-firebase/firestore";
import {map, filter, includes, sortBy, isNull, isEmpty} from "lodash";
import moment from "moment";
import {err} from "react-native-svg/lib/typescript/xml";

import {AlertPoll, LoggingUser, PostDoc, User, WardRobe} from "../../modals";
import {navigate} from "../navigation";
import {
    ALERT_POLL_COLLECTIONS,
    FEED_COLLECTIONS,
    FOLLOWERS_COLLECTION,
    FOLLOWING_COLLECTION,
    MOOD_COLLECTIONS,
    POST_COLLECTION,
    TAG_COLLECTIONS,
    USER_COLLECTION,
} from "../../shared/constants";
import {trackPromise} from "react-promise-tracker";
import post from "../../screens/post/post";

export function registerUser(user: User): Promise<User> {
    return trackPromise(USER_COLLECTION.add(user)
        .then((res) => {
            user.userId = res.id;
            return Promise.resolve(user);
        })
        .catch((err) => {
            return Promise.reject(err);
        }));
}

export function loginUser(user: User): Promise<User> {
    return trackPromise(USER_COLLECTION.where("email", "==", user.email)
        .get()
        .then((res) => {
            const data = res.docs[0].data();
            if (data && data.password === user.password) {
                user.userId = res.docs[0].id;
                user.name = data.name;
                user.profileImage = data.profileImage;
                return Promise.resolve(user);
            }
            return Promise.reject("Invalid credentials");
        })
        .catch((err) => {
            return Promise.reject(err);
        }));
}

export function getMoods(): Promise<any> {
    return MOOD_COLLECTIONS.get()
        .then((res) => {
            return Promise.resolve(res.docs);
        })
        .catch((err) => {
            return Promise.reject(err);
        })
}

export function getTags(): Promise<any> {
    return TAG_COLLECTIONS.get()
        .then((res) => {
            return Promise.resolve(res.docs)
        })
        .catch((err) => {
            return Promise.reject(err)
        })
}

export function createPost(post: PostDoc | AlertPoll): Promise<any> {
    post.createdAt = new Date();
    return POST_COLLECTION.doc(post.userId)
        .collection("userPosts")
        .add(post)
        .then((res) => {
            post.postId = res.id;
            onCreatePost(post);
            return Promise.resolve(res);
        })
        .catch((err) => {
            return Promise.reject(err);
        });
}

export function fetchFeedPosts(email: string): Promise<any> {
    const feeds = [];
    return (
        firestore()
            .collection("feed")
            // Filter results
            .doc(email)
            .get()
            .then((res) => {
                // @ts-ignore
                const documentIds = res.data().feeds;
                map(
                    documentIds,
                    (id) => {
                        firestore()
                            .collection("posts")
                            .doc(id)
                            .get()
                            .then((res: any) => {
                                // @ts-ignore
                                feeds.push(res.data());
                            });
                    },
                    () => {
                        return Promise.resolve(feeds);
                    },
                );
            })
            .catch((err) => Promise.resolve(err))
    );
}

export function fetchAllUsers(): Promise<User[]> {
    return USER_COLLECTION.get()
        .then((res) => {
            const userDocs = res.docs;
            const users: User[] = [];
            map(userDocs, (doc) => {
                const userData: any = doc.data();
                const user: User = {
                    userId: doc.id,
                    email: userData.email,
                    name: userData.name,
                    profileImage: userData.profileImage,
                };
                users.push(user);
            });
            return Promise.resolve(users);
        })
        .catch((err) => {
            return Promise.reject(err);
        });
}

export function discoverAllUsers(search: string): Promise<User[]> {
    return fetchAllUsers()
        .then((res) => {
            let users: User[] = res;
            users = filter(users, (user) => includes(user.name, search));
            return Promise.resolve(users);
        })
        .catch((err) => {
            return Promise.reject(err);
        });
}

export function isFollowingUser(
    loggedInUserId: string,
    followingProfileId: string,
): Promise<boolean> {
    return FOLLOWING_COLLECTION.doc(loggedInUserId)
        .collection("userFollowing")
        .doc(followingProfileId)
        .get()
        .then((res) => {
            return Promise.resolve(res.exists);
        })
        .catch((err) => {
            return Promise.reject(false);
        });
}

export function followUser(
    loggedInUserId: string,
    followingProfileId: string,
): Promise<boolean> {
    const following = FOLLOWING_COLLECTION.doc(loggedInUserId)
        .collection("userFollowing")
        .doc(followingProfileId)
        .set({})
        .then(() => {
            return Promise.resolve(true);
        });
    const followers = FOLLOWERS_COLLECTION.doc(followingProfileId)
        .collection("userFollowers")
        .doc(loggedInUserId)
        .set({})
        .then(() => {
            return Promise.resolve(true);
        });

    return Promise.all([followers, following])
        .then((res) => {
            return Promise.resolve(true);
        })
        .catch((err) => {
            return Promise.resolve(true);
        });
}

export function unFollowUser(
    loggedInUserId: string,
    followingProfileId: string,
): Promise<boolean> {
    const following = FOLLOWING_COLLECTION.doc(loggedInUserId)
        .collection("userFollowing")
        .doc(followingProfileId)
        .get()
        .then((res) => {
            if (res.exists) {
                res.ref.delete();
            }
        });
    const followers = FOLLOWERS_COLLECTION.doc(followingProfileId)
        .collection("userFollowers")
        .doc(loggedInUserId)
        .get()
        .then((res) => {
            if (res.exists) {
                res.ref.delete();
            }
        });

    return Promise.all([followers, following])
        .then((res) => {
            return Promise.resolve(true);
        })
        .catch((err) => {
            return Promise.resolve(true);
        });
}

export function getUserFollowings(userID: string): Promise<User[]> {
    return FOLLOWING_COLLECTION.doc(userID)
        .collection("userFollowing")
        .get()
        .then((res) => {
            const userDocs = res.docs;
            const users: User[] = [];
            map(userDocs, (doc) => {
                const userData: any = doc.data();
                const user: User = {
                    userId: doc.id,
                    email: userData.email,
                    name: userData.name,
                    profileImage: userData.profileImage
                };
                users.push(user);
            });
            return Promise.resolve(users);
        })
        .catch((err) => {
            return Promise.reject(err);
        });
}

export function getUserFollowers(userID: string): Promise<User[]> {
    return FOLLOWERS_COLLECTION.doc(userID)
        .collection("userFollowers")
        .get()
        .then((res) => {
            const userDocs = res.docs;
            const users: User[] = [];
            map(userDocs, (doc) => {
                const userData: any = doc.data();
                const user: User = {
                    userId: doc.id,
                    email: userData.email,
                    name: userData.name,
                };
                users.push(user);
            });
            return Promise.resolve(users);
        })
        .catch((err) => {
            return Promise.reject(err);
        });
}

export async function onCreatePost(post: PostDoc) {
    if (post.isFeedPost) {
        await FEED_COLLECTIONS.doc(post.userId)
            .collection("userFeed")
            .add(post);

        const userFollowers = await getUserFollowers(post.userId);
        await Promise.all(map(userFollowers, async (user) => {
            await FEED_COLLECTIONS.doc(user.userId)
                .collection("userFeed")
                .add(post)
        }));
    }
    if (post.DMList?.length != 0) {
        map(post.DMList, (userId) => {
            FEED_COLLECTIONS.doc(userId)
                .collection("userFeed")
                .add(post)
                .then((res) => {
                    console.log("Sent to fiends feed");
                })
                .catch((err) => {
                    console.log("Send to friend feed error ", err);
                });
        });
    }

    if (post.isPollPost) {
        post.pollCompleted = false
        ALERT_POLL_COLLECTIONS.doc(post.userId)
            .collection("userPolls")
            .add(post)
            .then((res) => {
                console.log("Poll created");
            })
            .catch((err) => {
                console.log("Poll create error ", err);
            });
    }

    if (isNull(post.user.profileImage) || isEmpty(post.user.profileImage)) {
        const {user} = post;
        user.profileImage = post.image;
        USER_COLLECTION.doc(user.userId)
            .set(user)
            .then((res) => {
                console.log("Profile Picture updated");
            })
            .catch((err) => {
                console.log("Profile Picture update error ", err);
            });
    }
}

export async function getRandomPosts(userId): Promise<PostDoc[]> {
    const users = await fetchAllUsers();
    const posts: PostDoc[] = [];
    let postDocs;
    await Promise.all(
        map(users, async user => {
            if (user.userId !== userId) {
                postDocs = await POST_COLLECTION.doc(user.userId)
                    .collection("userPosts")
                    .get()
                map(postDocs.docs, (doc) => {
                    const post: PostDoc = doc.data();
                    post.postId = doc.id;
                    if((post.isPollPost && post.pollCompleted) || post.isFeedPost){
                        posts.push(doc.data());
                    }
                })
            }
        })
    )
    return Promise.resolve(posts)
}

export async function getUserFeed(userId: string): Promise<PostDoc[]> {
    const posts: PostDoc[] = [];
    await FEED_COLLECTIONS.doc(userId)
        .collection("userFeed")
        .get()
        .then((res) => {
            map(res.docs, (doc) => {
                const post: PostDoc = doc.data();
                post.postId = doc.id;
                if (doc.data().isPollPost && doc.data().pollCompleted) {
                    posts.push(doc.data());
                } else if (!doc.data().isPollPost) {
                    posts.push(doc.data());
                }
            });
            return Promise.resolve(posts);
        })
        .catch((err) => {
            return Promise.reject(err);
        });
    // const followingDoc = await FOLLOWING_COLLECTION.doc(userId)
    //     .collection("userFollowing")
    //     .get();
    // await Promise.all(map(followingDoc.docs, async (user: any) => {
    //         const userFeeds = await FEED_COLLECTIONS.doc(user.id)
    //             .collection("userFeed")
    //             .get();
    //         map(userFeeds.docs, async (doc) => {
    //             if (doc.data().isPollPost && doc.data().pollCompleted) {
    //                 posts.push(doc.data());
    //             }else if (!doc.data().isPollPost){
    //                 posts.push(doc.data());
    //             }
    //         });
    //     })
    // )
    return Promise.resolve(posts)
}

export function getPost(userId: string, postId): Promise<PostDoc> {
    return POST_COLLECTION.doc(userId)
        .collection("userPosts")
        .doc(postId)
        .get()
        .then((res) => {
            const post: PostDoc = res.data();
            return Promise.resolve(post);
        })
        .catch((err) => {
            return Promise.reject(err);
        });
}

function sortPostsByDate(a, b): number {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    // @ts-ignore
    return dateB - dateA;
}

export function getUserPolls(userId: string): Promise<AlertPoll[]> {
    return ALERT_POLL_COLLECTIONS.doc(userId)
        .collection("userPolls")
        .get()
        .then((res) => {
            const polls: AlertPoll[] = [];
            map(res.docs, (doc) => {
                if (!doc.data().pollCompleted) {
                    const p = doc.data()
                    p.postId = doc.id
                    polls.push(p);
                }
            });
            return Promise.resolve(polls);
        })
        .catch((err) => {
            return Promise.reject(err);
        });
}

export async function getFollowingUserPolls(
    userId: string,
): Promise<AlertPoll[]> {
    const polls: AlertPoll[] = [];
    const followingDoc = await FOLLOWING_COLLECTION.doc(userId)
        .collection("userFollowing")
        .get();
    await Promise.all(
        map(followingDoc.docs, async (user: any) => {
            const alertPolls = await ALERT_POLL_COLLECTIONS.doc(user.id)
                .collection("userPolls")
                .get()
            map(alertPolls.docs, async (doc) => {
                if (!doc.data().pollCompleted) {
                    const p = doc.data()
                    p.postId = doc.id
                    polls.push(p);
                }
            });
        }),
    );
    return Promise.resolve(polls);
}

export function getWardrobe(userId: string): Promise<WardRobe[]> {
    return getUserPosts(userId)
        .then((res) => {
            let wardrobe: WardRobe[] = [];
            const tags = getWardrobeTags(res);
            wardrobe = getWardrobePosts(res, tags);
            return Promise.resolve(wardrobe);
        })
        .catch((err) => {
            return Promise.reject(err);
        });
}


export async function getUserPosts(userId): Promise<PostDoc[]> {
    const postList: PostDoc[] = []
    try {
        const userDocs = await POST_COLLECTION.doc(userId).collection("userPosts").get();
        map(userDocs.docs, doc => {
            const post: PostDoc = doc.data();
            post.postId = doc.id;
            postList.push(post);
        })
        return Promise.resolve(postList)
    } catch (e) {
        return Promise.resolve(e)
    }
}

function getWardrobeTags(posts: PostDoc[]): string[] {
    const tags: string[] = [];
    map(posts, (post) => {
        map(post.tags, (tag) => {
            if (!includes(tags, tag.name)) {
                tags.push(tag.name);
            }
        });
    });
    return tags;
}

function getWardrobePosts(posts: PostDoc[], tags: string[]): WardRobe[] {
    const wardrobeList: WardRobe[] = [];
    map(tags, (tag) => {
        const wardrobe: WardRobe = {
            tagName: tag,
            posts: [],
        };
        map(posts, (post) => {
            map(post.tags , t => {
                if(t.name === tag){
                    wardrobe.posts.push(post)
                }
            })
        });
        wardrobeList.push(wardrobe);
    });
    return wardrobeList;
}


export function reactToPoll(user: User, poll: AlertPoll): Promise<boolean> {
    return ALERT_POLL_COLLECTIONS.doc(poll.user.userId)
        .collection("userPolls")
        .doc(poll.postId)
        .set(poll)
        .then((res) => {
            return Promise.resolve(true);
        })
        .catch((err) => {
            return Promise.resolve(false);
        });
}

export async function hasReactedToPoll(
    poll: AlertPoll,
    userId: string,
): Promise<boolean> {
    let hasReacted = false
    const docs = await ALERT_POLL_COLLECTIONS.doc(poll.user.userId)
        .collection("userPolls")
        .doc(poll.postId)
        .get();

    const pollData = docs.data();

    await Promise.all(map(pollData?.dislikes, (d => {
            if (d.userId === userId) {
                hasReacted = true
                return Promise.resolve(true);
            }
        }))
    )
    await Promise.all(
        map(pollData?.likes, (d => {
            if (d.userId === userId) {
                hasReacted = true
                return Promise.resolve(true);
            }
        }))
    )
    return Promise.resolve(hasReacted);
}

export async function sendPollToFeed(userId: string, poll: AlertPoll) {
    poll.pollCompleted = true
    await ALERT_POLL_COLLECTIONS.doc(userId).collection("userPolls").doc(poll.postId).set(poll)
    await FEED_COLLECTIONS.doc(userId).collection("userFeed").add(poll)
    // await POST_COLLECTION.doc(userId).collection("userPosts").doc(poll.postId).set(poll)
}

export async function sendPollToFriends(poll: AlertPoll) {
    poll.pollCompleted = true
    await ALERT_POLL_COLLECTIONS.doc(poll.user.userId).collection("userPolls").doc(poll.postId).set(poll)
    await map(poll.DMList, async (userId) => {
        await FEED_COLLECTIONS.doc(userId)
            .collection("userFeed")
            .add(poll)
            .then((res) => {
                console.log("Sent to fiends feed");
            })
            .catch((err) => {
                console.log("Send to friend feed error ", err);
            });
    });
}

export async function getFollowingUsers(userId: string): Promise<User[]> {
    const users: User[] = []
    await FOLLOWERS_COLLECTION.doc(userId).collection("userFollowers").get().then(async res => {
        const userDocs = res.docs;
        await Promise.all(map(userDocs, async (doc) => {
            const userDoc = await USER_COLLECTION.doc(doc.id).get();
            const userData: any = userDoc.data();
            const user: User = {
                userId: doc.id,
                email: userData.email,
                name: userData.name,
                profileImage: userData.profileImage
            };
            users.push(user);
        }));
    })
    return Promise.resolve(users)
}
