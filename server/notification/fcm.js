var admin = require("firebase-admin");
var path = require('path');
var serviceAccount = require("../../keys/project-001-ocs-03-2020-firebase-adminsdk-hmogb-08ef075cb2.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

var fcm = {};

var options = {
    priority: "high",
    timeToLive: 60 * 60 * 24
};

fcm.sendToDevice = (registrationToken, data) => {
    var payload = {
        notification: {
            title: data.role,
            body: data.message + "This is the body of the notification message."
        }
    };

    admin.messaging().sendToDevice(registrationToken, payload, options)
        .then(function (response) {
            console.log("Successfully sent message:", response);
        })
        .catch(function (error) {
            console.log("Error sending message:", error);
        });

};

fcm.sendToBroadcase = async (persetujuan) => {

    var topic = 'all';
    var message = {
        data: persetujuan,
        topic: topic
    };

    // Send a message to devices subscribed to the provided topic.
    admin.messaging().send(message)
        .then((response) => {
            // Response is a message ID string.
            console.log('Successfully sent message:', response);
        })
        .catch((error) => {
            console.log('Error sending message:', error);
        });

};

module.exports = fcm;