$(document).ready(function () {
    //We use the UID alot in this page so we chained functions to be able to use the UID everywhere.
    firebase.auth().onAuthStateChanged(function (somebody) {
        if (somebody) {
            $("#uid").html(somebody.uid);
            console.log($("#uid").html());
            db.collection("users")
                .doc(somebody.uid)
                .get()
                .then(function (doc) {

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

                    //If field is empty, it will be hidden. Need this because of the place holder coding.
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

        /**
        * This pulls from the restaurant database of the newly created restaurant the user just created. It will have the owner unique ID in the restaurant
        * to show that they are the owner and only they can edit it.
        */
        db.collection("restaurants")
            //can query the recipe name to user input
            .where("owner", "==", $("#uid").html())
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    var restaurant = doc.data();
                    var box = document.createElement("div");
                    box.setAttribute("class", "link");
                    var restaurantLink = document.createElement("a");
                    var resturl = "restaurant-owner-profile.html?uid=" + doc.id;
                    restaurantLink.setAttribute("href", resturl);
                    $(restaurantLink).html(restaurant.name);
                    $(box).append($(restaurantLink));
                    $("#add-restaurant").before($(box));

                });
            });

        /**
         * Function pulls post from current user and displays it on the post wall.
         * Also creates a like button for user interactions.
         */
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

        /**
         * Function uses the increment function from firebase to increase like number 
         * @param {} id is the the unique userID
         * @param {*} likeId is the button UID to know which button is being clicked through the event listener
         */
        function addLikeListener(id, likeId) {
            document.getElementById(likeId).addEventListener("click", function () {
                db.collection("posts")
                    .doc(id)
                    .update({
                        likes: firebase.firestore.FieldValue.increment(1) //increments the field!
                    })
                    .then(function () {
                        //To see if it works
                        console.log("increment increased by 1");
                    })
            })
        }
    });

    /** Event listener for when submitting a post */
    document.getElementById('userPost').addEventListener('submit', postForm);

    /**
     * This function grabs the post value when post button is clicked
     * @param {*} e to prevent default
     */
    function postForm(e) {
        e.preventDefault();
        //Get Values from the post
        var post = document.getElementById('post').value;


        /**
         * This is the function that writes to the post collection
         */
        function writePostToDb() {

            firebase.auth().onAuthStateChanged(function (user) {
                if (user) {

                    db.collection("users")
                        .doc(user.uid)
                        .get()
                        .then(function (doc) {
                            db.collection("posts").add({ userpost: post, userID: user.uid, date: date, time: time, sort: Date.now() }).then(function () {
                                reload = location.reload()
                            });
                        })
                };

            });
        };
        writePostToDb();
    };

    /**
     * Find the current date and time to use for the post collection
     */
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var sort = Date.now();
});