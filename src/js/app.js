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
                // var displayName = user.displayName;
                var email = user.email;
                // var emailVerified = user.emailVerified;

                getStudent(firestore, email).then(studentData => {
                    // TODO: Build the cards here
                    let gradesContainer = $('#grades');
                    
                    document.querySelector('h4.greeting').innerHTML = studentData.student.name;
                    studentData.courses.forEach((item, index, arr) => {
                        console.log(item);
                        let courseSchool = '<p>School: <strong>' + item.course.school + '</strong></p>';
                        let courseName = '<p>Course name: <strong>' + item.course.name+'</strong></p>';
                        let courseCode = '<p>Course code: <strong>' + item.course.code + '</strong></p>';
                        let courseSubjectCode = '<p>Subject Code: <strong>' + item.course.subject_code + '</strong></p>';
                        let schoolYearSemester = '<p>SY / Semester: <strong>' + item.school_year + ' / ' + item.semester + '</strong></p>';

                        // prelim grade
                        let prelimContainer = $('<div id="prelim-container"></div>');
                        if (item.prelim) {
                            prelimContainer.append($('<p>Grade: <strong>' + item.prelim.grade + '</strong></p></br>'));
                        }

                        // prelim grade
                        let midtermContainer = $('<div id="midterm-container"></div>');
                        if (item.midterm) {
                            if (item.midterm.grade) {
                                midtermContainer.append($('<p>Grade: <strong>' + item.midterm.grade + '</strong></p></br>'));
                            }
                        }
                        
                        // final grade
                        let finalContainer = $('<div id="final-container"></div>');
                        if (item.final) {
                            finalContainer.append($('<p>Grade: <strong>' + item.final.grade + '</strong></p></br>'));
                        }
                        
                        let gradeContainers = prelimContainer.prop('outerHTML') + midtermContainer.prop('outerHTML') + finalContainer.prop('outerHTML');

                        let card = $(`  <div class="col s1 m4 l4 xl4">
                                            <div class="card blue lighten-5">
                                                <div class="card-content">
                                                    `+ courseSchool + courseName + courseCode + courseSubjectCode + schoolYearSemester +`
                                                </div>
                                                <div class="card-tabs">
                                                    <ul class="tabs tabs-fixed-width">
                                                        <li class="tab"><a class="active" href="#prelim-container">Prelim</a></li>
                                                        <li class="tab"><a href="#midterm-container">Midterm</a></li>
                                                        <li class="tab"><a href="#final-container">Final</a></li>
                                                    </ul>
                                                </div>
                                                <div class="card-content grey lighten-4">`+ gradeContainers+`</div>
                                            </div>
                                        </div>`);
                        gradesContainer.append(card);
                    });
                    
                    $('#loading-spinner').fadeOut('fast', () => {
                        // Show the content after user is authenticated and loading spinner is faded out.
                        document.getElementById('nav-bar').removeAttribute('hidden');
                        document.getElementById('main-content').removeAttribute('hidden');
                        // Auto init for dynamically added elements
                        M.AutoInit();
                    });
                }).catch(error => console.error(error));
            } else {
                window.location.replace('/login.html');
            }
        }, error => console.log(error));

        document.getElementById('logout-link').addEventListener('click', () => {
            firebase.auth().signOut().then(() => {
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
                school_year: courseData.school_year,
                semester: courseData.semester,
                prelim: courseData.prelim,
                midterm: courseData.midterm,
                final: courseData.final
            };
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
