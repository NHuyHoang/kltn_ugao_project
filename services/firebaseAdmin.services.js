import * as admin from "firebase-admin";
import ugaoCert from "../share/ugao-admin-sdk";
import ureminderCert from '../share/firebase-adminsdk';

function msToTime(duration) {
    let d = new Date(new Date().getTime() + duration);
    return `${d.getHours()} giờ ${d.getMinutes()} phút`
}

const ugaoAdmin = admin;
const ureminderAdmin = admin;
export const notifyCustomer = (data) => {

    if (!ureminderAdmin.apps.length)
        ureminderAdmin.initializeApp({
            credential: ureminderAdmin.credential.cert(ureminderCert),
            databaseURL: "https://gcm-examble.firebaseio.com"
        });

    // This registration token comes from the client FCM SDKs.
    var registrationToken = "fjC0m3hUllc:APA91bFaw2hhDtvbz3Y-LfzfToNY6oaqCQqhU25YGTf6aV-qtKd1jIpoJLjBcamkTqn-eUerNDYFcIk5aPiTtBVeazMsr1YAq1DA5fkcePr9Ce2CcGrs8gxr-0X-kd1JepWNse9NYHl8";

    var message = {
        android: {
            priority: 'high',
            notification: {
                title: 'UDelivery',
                body: `Thời gian nhận hàng dự kiến ${msToTime(data.estimationTime)}`,
                sound: "default",
            }
        },
        token: registrationToken,
        data: {
            estimationTime: new Date(new Date().getTime() + data.estimationTime).toString(),
            invoiceId: data.invoiceId
        },
    };

    // Send a message to the device corresponding to the provided
    // registration token.
    return ureminderAdmin.messaging().send(message)
        .then((response) => {
            // Response is a message ID string.
            console.log('Successfully sent message:', response);
        })
        .catch((error) => {
            console.log('Error sending message:', error);
        });


}

export const notifyOwner = (data) => {
    if (!ugaoAdmin.apps.length) {
        ugaoAdmin.initializeApp({
            credential: ugaoAdmin.credential.cert(ugaoCert),
            databaseURL: "https://ugao-cc2a4.firebaseio.com"
        });
    }

    // This registration token comes from the client FCM SDKs.
    //var registrationToken2 = "fjC0m3hUllc:APA91bFaw2hhDtvbz3Y-LfzfToNY6oaqCQqhU25YGTf6aV-qtKd1jIpoJLjBcamkTqn-eUerNDYFcIk5aPiTtBVeazMsr1YAq1DA5fkcePr9Ce2CcGrs8gxr-0X-kd1JepWNse9NYHl8";
    var registrationToken = "eyDehWngnhI:APA91bG95gPADJWry9DExYSiBNK-rmCySB4GVxuAZtN_9WmNsrMZSKBciSJWRbGQ1cyoL5PW2-MvVIJC47DfjA6wabUdETdDP6DATBeJQRgR11QlPveDg18Jz2MTmZtEwfa1zfntKpjg";
    // See documentation on defining a message payload.
    var message = {
        android: {
            priority: 'high',
            notification: {
                title: 'Bạn có hóa đơn đặt hàng',
                body: `Id ${data.invoiceId}`,
                sound: "default",
            }
        },
        token: registrationToken,
        data,
    };

    // Send a message to the device corresponding to the provided
    // registration token.
    return ugaoAdmin.messaging().send(message)
        .then((response) => {
            // Response is a message ID string.
            console.log('Successfully sent message:', response);
        })
        .catch((error) => {
            console.log('Error sending message:', error);
        });

}