$(document).ready(function () {
    var submitbutton = $("#confirm");
    console.log(submitbutton.html());

    firebase.auth().onAuthStateChanged(function (somebody) {
        var users = db.collection("users");
        var user;
        user = somebody.uid;
        $("#uid").html(user);
        console.log(user);


        db.collection("users").doc(user)
            .get()
            .then(function (doc) {
                var name = doc.data().firstName;
                console.log(name);
                if (typeof name !== 'undefined') {
                    $("#profile-first-name").attr("placeholder", name);
                }
            });
        db.collection("users").doc(user)
            .get()
            .then(function (doc) {
                var name = doc.data().lastName;
                console.log(name);
                if (name != "") {
                    $("#profile-last-name").attr("placeholder", name);
                }
            });
        db.collection("users").doc(user)
            .get()
            .then(function (doc) {
                var name = doc.data().middleName;
                console.log(name);
                if (name != "") {
                    $("#profile-middle-name").attr("placeholder", name);
                }
            });
        db.collection("users").doc(user)
            .get()
            .then(function (doc) {
                var name = doc.data().title;
                console.log(name);
                if (name != "") {
                    $("#profile-title").attr("placeholder", name);
                }
            });

        db.collection("users").doc(user)
            .get()
            .then(function (doc) {
                var name = doc.data().jobTitle;
                console.log(name);
                if (name != "") {
                    $("#profile-job-title").attr("placeholder", name);
                }
            });
        db.collection("users").doc(user)
            .get()
            .then(function (doc) {
                var name = doc.data().bio;
                console.log(name);
                if (name != "") {
                    $("#profile-bio-description").attr("placeholder", name);
                }
            });
        db.collection("users").doc(user)
            .get()
            .then(function (doc) {
                var name = doc.data().skills;
                console.log(name);
                if (name != "") {
                    $("#profile-skills").attr("placeholder", name);
                }
            });
        db.collection("users").doc(user)
            .get()
            .then(function (doc) {
                var name = doc.data().location;
                console.log(name);
                if (name != "") {
                    $("#profile-location").attr("placeholder", name);
                }
            });
        db.collection("users").doc(user)
            .get()
            .then(function (doc) {
                var name = doc.data().email;
                console.log(name);
                if (name != "") {
                    $("#profile-email").attr("placeholder", name);
                }
            });
        db.collection("users").doc(user)
            .get()
            .then(function (doc) {
                var name = doc.data().website;
                console.log(name);
                if (name != "") {
                    $("#profile-website").attr("placeholder", name);
                }
            });
        db.collection("users").doc(user)
            .get()
            .then(function (doc) {
                var name = doc.data().facebook;
                console.log(name);
                if (name != "") {
                    $("#profile-facebook").attr("placeholder", name);
                }
            });
        db.collection("users").doc(user)
            .get()
            .then(function (doc) {
                var name = doc.data().twitter;
                console.log(name);
                if (name != "") {
                    $("#profile-twitter").attr("placeholder", name);
                }
            });
        db.collection("users").doc(user).get().then(function (doc) {
            var name = doc.data().instagram;
            console.log(name);
            if (name != "") {
                $("#profile-instagram").attr("placeholder", name);
            }
        });
        db.collection("users").doc(user).get().then(function (doc) {
            var name = doc.data().reddit;
            console.log(name);
            if (name != "") {
                $("#profile-reddit").attr("placeholder", name);
            }
        });

    });

    $(submitbutton).click(function submit(e) {
        e.preventDefault();

        console.log($("#profile-first-name").attr("placeholder"));

        console.log("This worked");


        var fName = $("#profile-first-name").val();
        if (fName == "") {
            fName = ("#profile-first-name").attr("placeholder");
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
        console.log(name);

        var uid = $("#uid").html();
        console.log(uid)

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
            location =  $("#profile-location").attr("placeholder");
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
                    console.log("Document successfully written!");
                })

        }
    });




});

