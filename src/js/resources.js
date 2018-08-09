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
    // var storage = firebase.storage();
    // Get a non-default Storage bucket
    let androidResourcesStorage = firebase.app().storage("gs://android-resources");
    let androidResourcesRef = androidResourcesStorage.ref();

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
                // Get all courses
                getCourses(firestore).then(courses => {
                    console.log(courses);
                })
                .catch(error => {console.error(error)});
            } else {
                window.location.replace('/login.html');
            }
        }, error => console.log(error));

        $('#loading-spinner').fadeOut('fast', () => {
            // Show the content after user is authenticated and loading spinner is faded out.
            document.getElementById('nav-bar').removeAttribute('hidden');
            document.getElementById('main-content').removeAttribute('hidden');
            // Auto init for dynamically added elements
            M.AutoInit();
        });

        console.log(androidResourcesRef);
    });

    async function getCourses(firestore){
        let coursesRef = firestore.collection('courses');
        let coursesPromise = await coursesRef.where('resources.lectureSlides', '>', '').get();

        // extract the resources
        return await coursesPromise.map(doc => doc.data());
    }
})();
