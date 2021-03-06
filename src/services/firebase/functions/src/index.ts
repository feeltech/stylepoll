import * as functions from 'firebase-functions';

const admin = require('firebase-admin');

admin.initializeApp();

exports.sendNotification = functions.firestore.document('/notification-triggers').onCreate(async (snapshot, context) => {
    const notification = snapshot.data()
    functions.logger.log("Snapshot ", snapshot.data())
    const n = await admin.messaging().sendToDevice(
        [notification.deviceTokens],
        {
            data: {
                title:notification.title,
                message:notification.message,
                navigateTo:notification.navigateTo ? notification.navigateTo : undefined
            }
        },
        {
            // Required for background/quit data-only messages on iOS
            contentAvailable: true,
            // Required for background/quit data-only messages on Android
            priority: 'high'
        }
    )
    await admin.firestore().collection("completedNotifications").add(notification)
})


// exports.onUploadPosts = functions.firestore
//     .document('/posts/{userId}/userPosts/{postId}').onCreate(async (snapshot, context) => {
//         const userId = context.params.userId;
//         const postId = context.params.postId;
//         functions.logger.log("Snapshot ", snapshot.data())

//         const userFollowersRef = admin
//             .firestore()
//             .collection('followers')
//             .doc(userId)
//             .collection('userFollowers');
//         const userFollowersSnapshot = await userFollowersRef.get();

//         userFollowersSnapshot.forEach((doc: any) => {
//             admin
//                 .firestore()
//                 .collection('feeds')
//                 .doc(doc.id)
//                 .collection('userFeed')
//                 .doc(postId)
//                 .set(snapshot.data());
//         });
//     });
