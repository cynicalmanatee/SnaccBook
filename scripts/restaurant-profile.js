$(document).ready(function () {

    var showC1 = { 'grid-template-columns': '1fr 0fr 0fr' };
    var showC2 = { 'grid-template-columns': '0fr 1fr 0fr' };
    var showC3 = { 'grid-template-columns': '0fr 0fr 1fr' };

    $("#tab1").mouseenter(function () {
        $('#tab1').css({
            'color': 'grey'
        });
    });
    $('#tab1').mouseleave(function () {
        $('#tab1').css({
            'color': 'black'
        });
    });
    $("#tab2").mouseenter(function () {
        $('#tab2').css({
            'color': 'grey'
        });
    });
    $('#tab2').mouseleave(function () {
        $('#tab2').css({
            'color': 'black'
        });
    });
    $("#tab3").mouseenter(function () {
        $('#tab3').css({
            'color': 'grey'
        });
    });
    $('#tab3').mouseleave(function () {
        $('#tab3').css({
            'color': 'black'
        });
    });

    $("#tab1").click(function () {
        $("#content").css(showC1);
        $("#content2").css('display', 'none');
        $("#content3").css('display', 'none');
        $("#content1").css('display', 'block');
    });
    $("#tab2").click(function () {
        $("#content").css(showC2);
        $("#content1").css('display', 'none');
        $("#content3").css('display', 'none');
        $("#content2").css('display', 'block');
    });
    $("#tab3").click(function () {
        $("#content").css(showC3);
        $("#content2").css('display', 'none');
        $("#content1").css('display', 'none');
        $("#content3").css('display', 'block');
    });


});

const parsedUrl = new URL(window.location.href);
console.log(parsedUrl.searchParams.get("id")); // "123"

// extract id from url, assign to variable
var id = parsedUrl.searchParams.get("id");
console.log(id);

/**
 * Function gets info from restaurant collection and displays relevent info
 */
function displayDetails() {
    db.collection("restaurants")
        .doc(id)
        .get()
        .then(function (doc) {

            //Getting info from restaurant collection
            var restName = doc.data().name;
            var motto = doc.data().motto;
            var address = doc.data().address;
            var city = doc.data().city;
            var province = doc.data().province;
            var postalcode = doc.data().postalCode;
            var fullAddress = "" + address + "<br/>" + city + ", " + province +
                '<br/>' + postalcode;

            $("#bannerName").html(restName);
            $("#bannerSubtitle").html(fullAddress);
            $("#bannerMotto").html(motto);

            //Writes the features to page
            var feature = JSON.parse(doc.data().feature);
            for (var i = 0; i < feature.length; i++) {
                var featureName = feature[i].name;
                var featureDesc = feature[i].description;
                var featureAdd = '<hr/>';
                featureAdd += '<div><span>' + featureName + '</span></div>'
                featureAdd += '<div><span>' + featureDesc + '</span></div>'
                $('#content1').append(featureAdd);
            }

            //Writes menu to page
            var menu = JSON.parse(doc.data().menu);
            for (var x = 0; x < feature.length; x++) {
                var menuName = menu[x].name;
                var menuDesc = menu[x].description;
                var menuPrice = menu[x].price;

                if (menuName == "") {
                    menuName == "";
                }
                if (menuDesc == "") {
                    menuDesc == "";
                }
                if (menuPrice == "undefined") {
                    menuPrice == "Check for price later";
                }

                var menuAdd = '<hr/>'
                menuAdd += '<div><span>' + menuName + '</span></div>';
                menuAdd += '<div><span>' + menuDesc + '</span></div>';
                menuAdd += '<div><span>' + "$" + menuPrice + '</span></div>';
                $("#content2").append(menuAdd);
            }
        })
}
displayDetails();

//Listen for for submit in profile post form
document.getElementById('userPost').addEventListener('submit', postForm);

// Submit form function
function postForm(e) {
    e.preventDefault();
    //Get Values from the post
    var post = document.getElementById('post').value;
    var p = JSON.stringify(post);
    var radio = document.getElementsByClassName("form-check-input");
    var rating = null;
    for (var i = 0; i < radio.length; i++) {
        if (radio[i].checked) {
            rating = i + 1;
        }
    }
    //Makes rating and dates a string to store in database
    var r = JSON.stringify(rating);
    var d = JSON.stringify(date);

    //write rating

    /**
     * Gets the users UID and writes the review to a collection of Reviews.
     */
    function writeReviewToDb() {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                console.log(user.uid);
                db.collection("users")
                    .doc(user.uid)
                    .get()
                    .then(function (doc) {
                        var userName = JSON.stringify(doc.data().name);

                        db.collection("reviews")
                            .doc()
                            .set({
                                review: post,
                                ratings: r,
                                user: userName,
                                dateAdded: date,
                                restaurantID: id,
                                sort: Date.now()
                            }).then(function () {
                                reload = location.reload();
                            })
                    })
            };
        });
    };
    writeReviewToDb();
};

// getting the current date and time
var today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();


/**
 * This function calculates the aggregate user review for the restaurant.
 * First it grabs all the ratings and adds it up. It has a counter for how many people added the rating.
 */
var totalRating = 0;
var ratingCounter = 0;

function calcReview() {
    db.collection("reviews")
        .where("restaurantID", "==", id)
        .get()
        .then(function (snapcollection) {
            snapcollection.forEach(function (doc) {
                totalRating += parseInt(doc.data().ratings, 10);
                ratingCounter++;
                reviewScore();
            })
        })
}
calcReview();

/**
 * Helper function. It takes the total rating that was added and diviveds it by the number of people
 * for the review score.
 */
function reviewScore() {
    var reviewScore = totalRating / ratingCounter;
    $("#reviewScore").html("Ratings: " + reviewScore + "/5 Stars");
}

/**
 * Function grabs all the reviews for the unique restaurant and adds it to the page in the review section.
 */
function postReview() {
    db.collection("reviews")
        .where("restaurantID", "==", id)
        .get()
        .then(function (snapcollection) {
            snapcollection.forEach(function (doc) {
                console.log(doc.data());
                var r = doc.data().review;
                var d = doc.data().dateAdded;
                var n = doc.data().user;
                var score = parseInt(doc.data().ratings, 10);

                var reviewPost = '<hr/>';
                reviewPost += '<span>Name: ' + n + '</span>';
                reviewPost += '<br/>';
                reviewPost += '<span>Review: ' + r + '</span>';
                reviewPost += '<br/>';
                reviewPost += '<span>Rating: ' + score + '/5 Stars</span>';
                reviewPost += '<br/>';
                reviewPost += '<span>Reviewed on: ' + d + '</span>';
                reviewPost += '<hr/>';
                $('#reviewStart').append(reviewPost);
            })
        })
}
postReview();

