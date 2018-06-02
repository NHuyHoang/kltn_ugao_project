import * as admin from "firebase-admin";
import serviceAccount from "../share/ugao-admin-sdk";

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://gcm-examble.firebaseio.com"
    //databaseURL: "https://ugao-cc2a4.firebaseio.com"
});

export default () => {
    // This registration token comes from the client FCM SDKs.
    var registrationToken2 = "fjC0m3hUllc:APA91bFaw2hhDtvbz3Y-LfzfToNY6oaqCQqhU25YGTf6aV-qtKd1jIpoJLjBcamkTqn-eUerNDYFcIk5aPiTtBVeazMsr1YAq1DA5fkcePr9Ce2CcGrs8gxr-0X-kd1JepWNse9NYHl8";
    //var registrationToken2 = "eyDehWngnhI:APA91bG95gPADJWry9DExYSiBNK-rmCySB4GVxuAZtN_9WmNsrMZSKBciSJWRbGQ1cyoL5PW2-MvVIJC47DfjA6wabUdETdDP6DATBeJQRgR11QlPveDg18Jz2MTmZtEwfa1zfntKpjg";
    // See documentation on defining a message payload.
    var message = {
        android: {
            ttl: 3600 * 1000, // 1 hour in milliseconds
            priority: 'high',
            notification: {
                title: 'FCM',
                body: new Date(),
                sound: "default",
            }
        },
        token: registrationToken2,
    };

    // Send a message to the device corresponding to the provided
    // registration token.
    return admin.messaging().send(message)
    /* .then((response) => {
        // Response is a message ID string.
        console.log('Successfully sent message:', response);
    })
    .catch((error) => {
        console.log('Error sending message:', error);
    }); */

}