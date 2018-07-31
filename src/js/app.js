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

    const settings = {
        /* your settings... */
        timestampsInSnapshots: true
    };

    // Initialize Cloud Firestore through Firebase
    var firestore = firebase.firestore();
    firestore.settings(settings);

    document.addEventListener('DOMContentLoaded', () => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                // User is signed in.
                var displayName = user.displayName;
                var email = user.email;
                var emailVerified = user.emailVerified;
                // var photoURL = user.photoURL;
                // var uid = user.uid;
                // var phoneNumber = user.phoneNumber;
                // var providerData = user.providerData;
                
                let studentsRef = firestore.collection('students');
                let studentPromise = studentsRef.where('email', '==', email).limit(1).get();
                studentPromise.then(querySnapshot => {
                    // snapshot by default returns multiple docs get only the first one
                    const students = querySnapshot.docs.map(doc => doc.data());
                    const student = students[0];
                    // query the information of each courses.
                    
                    return student;
                }).catch(error => console.error(error));

                $('#loading-spinner').fadeOut('fast', () => {
                    // Show the content after user is authenticated and loading spinner is faded out.
                    document.getElementById('nav-bar').removeAttribute('hidden');
                    document.getElementById('main-content').removeAttribute('hidden');
                });
            } else {
                console.log('No user logged in.');
                window.location.replace('/login.html');
            }
        }, error => console.log(error));
    });

    function renderStudent(student) {
        console.log(student.courses[0]);
    }
})();
