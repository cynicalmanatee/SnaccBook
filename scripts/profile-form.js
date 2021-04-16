/**Loads the following functions when the page is accessed */
$(document).ready(function () {
    var submitbutton = $("#confirm");

    /**
     * Displays placeholder as value from database. Else uses placeholders from HTML.
     */
    firebase.auth().onAuthStateChanged(function (somebody) {
        var users = db.collection("users");
        var user;
        user = somebody.uid;
        $("#uid").html(user);
        db.collection("users").doc(user)
            .get()
            .then(function (doc) {
                var name = doc.data().firstName;
                if (typeof name !== 'undefined') {
                    $("#profile-first-name").attr("placeholder", name);
                }
            });

        db.collection("users").doc(user)
            .get()
            .then(function (doc) {
                var name = doc.data().lastName;
                if (name != "") {
                    $("#profile-last-name").attr("placeholder", name);
                }
            });
        db.collection("users").doc(user)
            .get()
            .then(function (doc) {
                var name = doc.data().middleName;
                if (name != "") {
                    $("#profile-middle-name").attr("placeholder", name);
                }
            });
        db.collection("users").doc(user)
            .get()
            .then(function (doc) {
                var name = doc.data().title;
                if (name != "") {
                    $("#profile-title").attr("placeholder", name);
                }
            });

        db.collection("users").doc(user)
            .get()
            .then(function (doc) {
                var name = doc.data().jobTitle;
                if (name != "") {
                    $("#profile-job-title").attr("placeholder", name);
                }
            });
        db.collection("users").doc(user)
            .get()
            .then(function (doc) {
                var name = doc.data().bio;
                if (name != "") {
                    $("#profile-bio-description").attr("placeholder", name);
                }
            });
        db.collection("users").doc(user)
            .get()
            .then(function (doc) {
                var name = doc.data().skills;
                if (name != "") {
                    $("#profile-skills").attr("placeholder", name);
                }
            });
        db.collection("users").doc(user)
            .get()
            .then(function (doc) {
                var name = doc.data().location;
                if (name != "") {
                    $("#profile-location").attr("placeholder", name);
                }
            });
        db.collection("users").doc(user)
            .get()
            .then(function (doc) {
                var name = doc.data().email;
                if (name != "") {
                    $("#profile-email").attr("placeholder", name);
                }
            });
        db.collection("users").doc(user)
            .get()
            .then(function (doc) {
                var name = doc.data().website;
                if (name != "") {
                    $("#profile-website").attr("placeholder", name);
                }
            });
        db.collection("users").doc(user)
            .get()
            .then(function (doc) {
                var name = doc.data().facebook;
                if (name != "") {
                    $("#profile-facebook").attr("placeholder", name);
                }
            });
        db.collection("users").doc(user)
            .get()
            .then(function (doc) {
                var name = doc.data().twitter;
                if (name != "") {
                    $("#profile-twitter").attr("placeholder", name);
                }
            });
        db.collection("users").doc(user).get().then(function (doc) {
            var name = doc.data().instagram;
            if (name != "") {
                $("#profile-instagram").attr("placeholder", name);
            }
        });
        db.collection("users").doc(user).get().then(function (doc) {
            var name = doc.data().reddit;
            if (name != "") {
                $("#profile-reddit").attr("placeholder", name);
            }
        });

    });

    /**
     * Function gets value from field and writes it to database. If there is nothing there, it writes the placeholder value to database
     * Adds a click funtion to the submit button. Writes the user input to the data base.
     */
    $(submitbutton).click(function submit(e) {
        e.preventDefault();

        var fName = $("#profile-first-name").val();
        if (fName == "") {
            fName = $("#profile-first-name").attr("placeholder");
        }

        var lName = $("#profile-last-name").val();
        if (lName == "") {
            lName = $("#profile-last-name").attr("placeholder");
        }

        var mName = $("#profile-middle-name").val();
        if (mName == "") {
            mName = $("#profile-middle-name").attr("placeholder");
        }

        var pronoun = $("#profile-title").val();
        if (pronoun == "") {
            pronoun = $("#profile-title").attr("placeholder");
        }


        var name = fName + " " + mName + " " + lName;

        var uid = $("#uid").html();

        var jobTitle = $("#profile-job-title").val();
        if (jobTitle == "") {
            jobTitle = $("#profile-job-title").attr("placeholder");
        }

        var bio = $("#profile-bio-description").val();
        if (bio == "") {
            bio = $("#profile-bio-description").attr("placeholder");
        }

        var skills = $("#profile-skills").val();
        if (skills == "") {
            skills = $("#profile-skills").attr("placeholder");
        }

        var location = $("#profile-location").val();
        if (location == "") {
            location = $("#profile-location").attr("placeholder");
        }


        var email = $("#profile-email").val();
        if (email == "") {
            email = $("#profile-email").attr("placeholder");
        }

        var website = $("#profile-website").val();
        if (website == "") {
            website = $("#profile-website").attr("placeholder");
        }

        var facebook = $("#profile-facebook").val();
        if (facebook == "") {
            facebook = $("#profile-facebook").attr("placeholder");
        }

        var twitter = $("#profile-twitter").val();
        if (twitter == "") {
            twitter = $("#profile-twitter").attr("placeholder");
        }

        var instagram = $("#profile-instagram").val();
        if (instagram == "") {
            instagram = $("#profile-instagram").attr("placeholder");
        }

        var reddit = $("#profile-reddit").val();
        if (reddit == "") {
            reddit = $("#profile-reddit").attr("placeholder");
        }
        writeUserData(uid, fName, lName, mName,
            pronoun, name, jobTitle, bio, skills, location, website,
            facebook, twitter, instagram, reddit, email);


        /**
         * Writes to the database.
         * @param {*} userId userid field
         * @param {*} fname first name field
         * @param {*} lname last name field
         * @param {*} mname middle name field
         * @param {*} pronoun pronoun field
         * @param {*} name takes the fml and convert it into a single name
         * @param {*} jobTitle job title field
         * @param {*} bio description field
         * @param {*} skills skills field
         * @param {*} location location field, location preference
         * @param {*} website user website field
         * @param {*} facebook user facebook field
         * @param {*} twitter user twitter field 
         * @param {*} instagram user instagram field
         * @param {*} reddit user reddit handle
         * @param {*} email user email but does not currently overwrite login.
         */
        function writeUserData(userId, fname, lname, mname,
            pronoun, name, jobTitle, bio, skills, location, website,
            facebook, twitter, instagram, reddit, email) {
            db.collection("users").doc(userId).set({

                firstName: fname,
                lastName: lname,
                middleName: mname,
                title: pronoun,
                name: name,
                jobTitle: jobTitle,
                bio: bio,
                skills: skills,
                location: location,
                website: website,
                facebook: facebook,
                twitter: twitter,
                instagram: instagram,
                reddit: reddit,
                email: email
            })
                .then(() => {
                    window.location.href = "/profile.html";
                })

        }
    });




});

