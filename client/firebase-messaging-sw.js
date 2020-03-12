importScripts("https://www.gstatic.com/firebasejs/7.10.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.10.0/firebase-messaging.js");

var firebaseConfig = {
    apiKey: "AIzaSyCpGwuzBHu4om7UTZI220G0ORRNAdo38mo",
    authDomain: "project-001-ocs-03-2020.firebaseapp.com",
    databaseURL: "https://project-001-ocs-03-2020.firebaseio.com",
    projectId: "project-001-ocs-03-2020",
    storageBucket: "project-001-ocs-03-2020.appspot.com",
    messagingSenderId: "540001517976",
    appId: "1:540001517976:web:a7b3a70acb7aba42b76bed",
    measurementId: "G-W00V0GZRHL"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
        body: 'Background Message body.',
        icon: '/firebase-logo.png'
    };

    return self.registration.showNotification(notificationTitle,
        notificationOptions);
});