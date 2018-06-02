"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _firebaseAdmin = require("firebase-admin");

var admin = _interopRequireWildcard(_firebaseAdmin);

var _firebaseAdminsdk = require("../share/firebase-adminsdk");

var _firebaseAdminsdk2 = _interopRequireDefault(_firebaseAdminsdk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

admin.initializeApp({
    credential: admin.credential.cert(_firebaseAdminsdk2.default),
    databaseURL: "https://gcm-examble.firebaseio.com"
    //databaseURL: "https://ugao-cc2a4.firebaseio.com"
});

exports.default = function () {
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
                sound: "default"
            }
        },
        token: registrationToken2
    };

    // Send a message to the device corresponding to the provided
    // registration token.
    return admin.messaging().send(message);
    /* .then((response) => {
        // Response is a message ID string.
        console.log('Successfully sent message:', response);
    })
    .catch((error) => {
        console.log('Error sending message:', error);
    }); */
};