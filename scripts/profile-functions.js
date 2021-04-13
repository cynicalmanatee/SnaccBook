//Authentication and pulls the unique userID from the database

$(document).ready(function () {
    //Updates profile page with elements from database
    firebase.auth().onAuthStateChanged(function (somebody) {
        if (somebody) {
            $("#uid").html(somebody.uid);
            console.log($("#uid").html());
            db.collection("users")
                .doc(somebody.uid)
                .get()
                .then(function (doc) {
                    console.log(doc.data());
                    //pulling from database
                    var name = doc.data().name;
                    var jobTitle = doc.data().jobTitle;
                    var bio = doc.data().bio;
                    var email = doc.data().email;
                    var facebook = doc.data().facebook;
                    var location = doc.data().location;
                    var reddit = doc.data().reddit;
                    var title = doc.data().title;
                    var twitter = doc.data().twitter;
                    var website = doc.data().website;
                    var skills = doc.data().skills

                    //Adding to profile page
                    $("#name-goes-here1").text(name);
                    $("#jobTitle").text(jobTitle);
                    $("#skills").text(skills);
                    $("#location").text(location);
                    $("#email").text(email);
                    $("#website").text(website);
                    $("#reddit").text(reddit);
                    $("#twitter").text(twitter);
                    $("#bio").text(bio);
                    $("#facebook").text(facebook);

                    //If field is empty, it will be hidden. Need this because of the place holder coding
                    if (jobTitle == "Job Title") {
                        $("#jobTitle").hide();
                    }
                    if (skills == "Skills") {
                        $("#skills").hide();
                    }
                    if (location == "Location") {
                        $("#location").hide();
                    }
                    if (website == "Website") {
                        $("#website").hide();
                    }
                    if (bio == "About yourself") {
                        $("#bio").hide();
                    }
                    if (website == "Website") {
                        $("#website").hide();
                    }
                    if (reddit == "Reddit") {
                        $("#reddit").hide();
                    }
                    if (twitter == "Twitter") {
                        $("#twitter").hide();
                    }
                    if (facebook == "Facebook") {
                        $("#facebook").hide();
                    }

                });
        };

        console.log(somebody.uid);
        db.collection("restaurants")
            //can query the recipe name to user input
            .where("owner", "==", $("#uid").html())
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {

                    var restaurant = doc.data();
                    console.log(restaurant);
                    var box = document.createElement("div");
                    box.setAttribute("class", "link");
                    var restaurantLink = document.createElement("a");
                    var resturl = "restaurant-owner-profile.html?uid=" + doc.id;
                    console.log(resturl);
                    restaurantLink.setAttribute("href", resturl);
                    $(restaurantLink).html(restaurant.name);
                    $(box).append($(restaurantLink));
                    $("#add-restaurant").before($(box));

                });
            });

        function displayPost() {


            db.collection("posts")
                .where("userID", "==", somebody.uid)
                .orderBy("sort","desc")
                .get()
                .then(function (snapcollection) {
                    snapcollection.forEach(function (doc) {
                        var message = doc.data().userpost;
                        var date = doc.data().date;
                        var time = doc.data().time;
                        var likeID = "like" + doc.id;
                        var likeNumber = "likeNumber" + doc.id;
                        var id = doc.id;

                        console.log(doc.id);
                        var postCollection = '<div class="content">';
                        postCollection += '<img class="profilePicture" src="https://dummyimage.com/600x400/000/fff" width="100%"/>';
                        postCollection += '<div id="comment">' + message + '</div>';
                        postCollection += '<div id = "date">' + date + '<br/>' + time + '</div>';
                        postCollection += '</div>';
                        postCollection += '<button type="button" class="btn btn-primary" id="' + likeID + '">Likes <span id="' + likeNumber + '"></span></button>'
                        postCollection += '<br/><br/>'
                        $("#content-goes-here").append(postCollection);
                        addLikeListener(id, likeID);
                        var likes = doc.data().likes;
                        $('#' + likeNumber).html(likes);
                    });

                });
        };
        displayPost();

        function addLikeListener(id, likeId) {
            document.getElementById(likeId).addEventListener("click", function () {
                console.log("like was click!");
                db.collection("posts")
                    .doc(id)
                    .update({
                        likes: firebase.firestore.FieldValue.increment(1) //increments the field!
                    })
                    .then(function () {
                        console.log("increment increased by 1");

                    })

            })

        }



    });


    //Listen for for submit in profile post form
    document.getElementById('userPost').addEventListener('submit', postForm);

    // Submit form function
    function postForm(e) {
        e.preventDefault();
        //Get Values from the post
        var post = document.getElementById('post').value;
        console.log(post);


        function writePostToDb() {

            firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    console.log(user.uid);
                    db.collection("users")
                        .doc(user.uid)
                        .get()
                        .then(function (doc) {
                            console.log(doc.data().name);
                            //change 
                            db.collection("posts").add({ userpost: post, userID: user.uid, date: date, time: time, sort: sort });

                        })
                };

            });
        };
        writePostToDb();
    };
    // getting the current date and time
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var sort = Date.now();
});