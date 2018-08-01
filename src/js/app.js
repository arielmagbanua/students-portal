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
                
                getStudent(firestore, email).then(studentData => {
                    // TODO: Build the cards here
                    document.querySelector('h4.greeting').innerHTML = studentData.student.name;
                    studentData.courses.forEach((item, index, arr) => {
                        
                    });

                    $('#loading-spinner').fadeOut('fast', () => {
                        // Show the content after user is authenticated and loading spinner is faded out.
                        document.getElementById('nav-bar').removeAttribute('hidden');
                        document.getElementById('main-content').removeAttribute('hidden');
                    });
                }).catch(error => console.error(error));
            } else {
                console.log('No user logged in.');
                window.location.replace('/login.html');
            }
        }, error => console.log(error));

        document.getElementById('logout-link').addEventListener('click', () => {
            firebase.auth().signOut().then(() => {
                console.log('user logged out!');
                window.location.replace('/login.html');
            }).catch(error => console.error(error));
        });
    });

    async function getStudent(firestore, email) {
        let studentsRef = firestore.collection('students');
        let studentPromise = await studentsRef.where('email', '==', email).limit(1).get();
        // extract the student
        const student = await studentPromise.docs.map(doc => doc.data())[0];
        const coursePromises = await student.courses.map(async courseData => {
            const courseRef = await courseData.course.get();
            const courseInfo = await courseRef.data();

            return {
                course: courseInfo,
                prelim: courseData.prelim,
                midterm: courseData.midterm,
                final: courseData.final
            }
        });

        const courses = await Promise.all(coursePromises);

        return {
            student: {
                name: student.name,
                number: student.student_number,
                email: student.email
            },
            courses: courses
        };
    }
})();
