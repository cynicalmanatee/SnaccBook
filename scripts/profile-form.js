$(document).ready(function () {
    firebase.auth().onAuthStateChanged(function (somebody) {
        var users = db.collection("users");
        var user;
        user = somebody.uid;
        console.log(user);

        var fName = db.collection("users").doc(user)
            .get()
            .then(function (doc) {
                fName = doc.data().name;
                return fName;

            });
        console.log(fName);

        var lName;
        var mName;
        var pronoun;
        var uid;
        var jobTitle;
        var bio;
        var skills;
        var location;
        var email;
        var website;
        var facebook;
        var twitter;
        var instagram;
        var reddit;

        $("#submit-button").click(function (submit) {
            submit.preventDefault();

            fName = $("#profile-first-name").val();
            lName = $("#profile-last-name").val();
            mName = $("#profile-middle-name").val();
            pronoun = $("#profile-title").val();


            var name = fName + " " + mName + " " + lName;
            console.log(name);

            uid = "";

            jobTitle = $("#profile-job-title").val();
            bio = $("#profile-bio-description").val();
            skills = $("#profile-skills").val();
            location = $("#profile-location").val();
            email = $("#profile-location").val();
            website = $("#profile-location").val();
            facebook = $("#profile-location").val();
            twitter = $("#profile-location").val();
            instagram = $("#profile-location").val();
            reddit = $("#profile-location").val();




        });

    });
});