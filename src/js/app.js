(() => {
    'use strict';

    console.log('test');
    
    // Initialize Firebase
    const config = {
        apiKey: "AIzaSyC1EQPiocY-6hu8SKKtkXesAn-zObxzZrs",
        authDomain: "students-portal-ad4ec.firebaseapp.com",
        databaseURL: "https://students-portal-ad4ec.firebaseio.com",
        projectId: "students-portal-ad4ec",
        storageBucket: "students-portal-ad4ec.appspot.com",
        messagingSenderId: "132986949363"
    };
    firebase.initializeApp(config);

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var uid = user.uid;
            var phoneNumber = user.phoneNumber;
            var providerData = user.providerData;

            console.log(displayName);
            console.log(email);
            // user.getIdToken().then(function (accessToken) {
            //     document.getElementById('sign-in-status').textContent = 'Signed in';
            //     document.getElementById('sign-in').textContent = 'Sign out';
            //     document.getElementById('account-details').textContent = JSON.stringify({
            //         displayName: displayName,
            //         email: email,
            //         emailVerified: emailVerified,
            //         phoneNumber: phoneNumber,
            //         photoURL: photoURL,
            //         uid: uid,
            //         accessToken: accessToken,
            //         providerData: providerData
            //     }, null, '  ');
            // });
        } else {
            console.log('No user logged in.');
            window.location.replace('/login.html');
        }
    }, function (error) {
        console.log(error);
    });
});