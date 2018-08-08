(() => {
    'use strict';

    M.AutoInit();

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

    var storage = firebase.storage();

    // Get a non-default Storage bucket
    // var storage = firebase.app().storage("gs://my-custom-bucket");
    
    document.addEventListener('DOMContentLoaded', () => {
        console.log('loaded');

        $('#loading-spinner').fadeOut('fast', () => {
            // Show the content after user is authenticated and loading spinner is faded out.
            document.getElementById('nav-bar').removeAttribute('hidden');
            document.getElementById('main-content').removeAttribute('hidden');
            // Auto init for dynamically added elements
            M.AutoInit();
        });
    });
})();
