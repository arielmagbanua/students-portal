(() => {
    'use strict';

    // Initialize Firebase
    const config = {
        apiKey: 'AIzaSyC1EQPiocY-6hu8SKKtkXesAn-zObxzZrs',
        authDomain: 'students-portal-ad4ec.firebaseapp.com',
        databaseURL: 'https://students-portal-ad4ec.firebaseio.com',
        projectId: 'students-portal-ad4ec',
        storageBucket: 'students-portal-ad4ec.appspot.com',
        messagingSenderId: '132986949363'
    };

    firebase.initializeApp(config);

    document.addEventListener('DOMContentLoaded', () => {
        // FirebaseUI config.
        var uiConfig = {
            signInSuccessUrl: '/',
            signInOptions: [
                // Leave the lines as is for the providers you want to offer your users.
                firebase.auth.GoogleAuthProvider.PROVIDER_ID
            ],
            // Terms of service url.
            tosUrl: 'tos.html',
            // Privacy policy url.
            privacyPolicyUrl: 'privacy.html'
        };

        // Initialize the FirebaseUI Widget using Firebase.
        var ui = new firebaseui.auth.AuthUI(firebase.auth());

        // hide the loading spinner now
        $('#loading-spinner').fadeOut('fast', () => {
            // Show the content after user is authenticated and loading spinner is faded out.
            document.getElementById('firebaseui-auth-container').removeAttribute('hidden');
            // The start method will wait until the DOM is loaded.
            ui.start('#firebaseui-auth-container', uiConfig);
        });
    });
})();
