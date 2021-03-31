$(document).ready(function () {


    var users = db.collections("users");
    var user;

    firebase.auth().onAuthStateChanged(function (somebody) {
        user = somebody.uid;
    });
    console.log(user);

    $("#submit-button").click(function (submit) {
        submit.preventDefault();

        var fName = $("#profile-first-name").val();
        var lName = $("#profile-last-name").val();
        var mName = $("#profile-middle-name").val();
        var pronoun = $("#profile-title").val();


        var name = fName + " " + mName + " " + lName;
        console.log(name);

        var uid = "";

        var jobTitle = $("#profile-job-title").val();
        var bio = $("#profile-bio-description").val();
        var skills = $("#profile-skills").val();
        var location = $("#profile-location").val();
        var email = $("#profile-location").val();
        var website = $("#profile-location").val();
        var facebook = $("#profile-location").val();
        var twitter = $("#profile-location").val();
        var instagram = $("#profile-location").val();
        var reddit = $("#profile-location").val();





    });


});