import * as functions from 'firebase-functions';

const admin = require('firebase-admin');

admin.initializeApp();

exports.onFollowUser = functions.firestore
    .document('/followers/{userId}/userFollowers/{followerId}').onCreate(async (snapshot, context) => {
        console.log(snapshot.data());
        const userId = context.params.userId;
        const followerId = context.params.followerId;
        const followedUserPostsRef = admin
            .firestore()
            .collection('posts')
            .doc(userId)
            .collection('userPosts');
        const userFeedRef = admin
            .firestore()
            .collection('feeds')
            .doc(followerId)
            .collection('userFeed');
        const followedUserPostsSnapshot = await followedUserPostsRef.get();
        followedUserPostsSnapshot.forEach((doc: any) => {
            if (doc.exists && doc.data().pollCompleted) {
                userFeedRef.doc(doc.id).set(doc.data());
            }
        });
    });

exports.onUnFollowUser = functions.firestore
    .document('/followers/{userId}/userFollowers/{followerId}')
    .onDelete(async (snapshot, context) => {
        console.log(snapshot.data());
        const userId = context.params.userId;
        const followerId = context.params.followerId;
        const userFeedRef = admin
            .firestore()
            .collection('feeds')
            .doc(followerId)
            .collection('userFeed').where('authorId', '==', userId);

        const userPostsSnapshot = await userFeedRef.get();
        userPostsSnapshot.forEach((doc:any) => {
            if (doc.exists) {
                doc.ref.delete();
            }
        });
    });


exports.onUploadPosts = functions.firestore
    .document('/posts/{userId}/userPosts/{postId}').onCreate(async (snapshot, context) => {
        const userId = context.params.userId;
        const postId = context.params.postId;
        functions.logger.log("Snapshot ",snapshot.data() )

        const userFollowersRef = admin
            .firestore()
            .collection('followers')
            .doc(userId)
            .collection('userFollowers');
        const userFollowersSnapshot = await userFollowersRef.get();

        userFollowersSnapshot.forEach((doc:any) => {
            admin
                .firestore()
                .collection('feeds')
                .doc(doc.id)
                .collection('userFeed')
                .doc(postId)
                .set(snapshot.data());
        });
    });
