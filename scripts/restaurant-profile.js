/**to do list:
- ADD JS to make the font of the banner title dymanic to the lenth of the name 

*/




$(document).ready(function() {

    var showC1 = { 'grid-template-columns': '1fr 0fr 0fr' };
    var showC2 = { 'grid-template-columns': '0fr 1fr 0fr' };
    var showC3 = { 'grid-template-columns': '0fr 0fr 1fr' };

    $("#tab1").mouseenter(function() {
        $('#tab1').css({
            'color': 'grey'
        });
    });
    $('#tab1').mouseleave(function() {
        $('#tab1').css({
            'color': 'black'
        });
    });
    $("#tab2").mouseenter(function() {
        $('#tab2').css({
            'color': 'grey'
        });
    });
    $('#tab2').mouseleave(function() {
        $('#tab2').css({
            'color': 'black'
        });
    });
    $("#tab3").mouseenter(function() {
        $('#tab3').css({
            'color': 'grey'
        });
    });
    $('#tab3').mouseleave(function() {
        $('#tab3').css({
            'color': 'black'
        });
    });

    $("#tab1").click(function() {
        $("#content").css(showC1);
        $("#content2").css('visibility', 'hidden');
        $("#content3").css('visibility', 'hidden');
        $("#content1").css('visibility', 'visible');
    });
    $("#tab2").click(function() {
        $("#content").css(showC2);
        $("#content1").css('visibility', 'hidden');
        $("#content3").css('visibility', 'hidden');
        $("#content2").css('visibility', 'visible');
    });
    $("#tab3").click(function() {
        $("#content").css(showC3);
        $("#content2").css('visibility', 'hidden');
        $("#content1").css('visibility', 'hidden');
        $("#content3").css('visibility', 'visible');
    });


});

const parsedUrl = new URL(window.location.href);
console.log(parsedUrl.searchParams.get("id")); // "123"

// extract id from url, assign to variable
var id = parsedUrl.searchParams.get("id");
console.log(id);

function displayDetails() {
    db.collection("restaurants")
        .doc(id)
        .get()
        .then(function(doc) {

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

            var feature = JSON.parse(doc.data().feature);
            for (var i = 0; i < feature.length; i++) {
                var featureName = feature[i].name;
                var featureDesc = feature[i].description;
                console.log(featureName + featureDesc);

                var featureAdd = '<hr/>';
                featureAdd += '<div><span>' + featureName + '</span></div>'
                featureAdd += '<div><span>' + featureDesc + '</span></div>'
                $('#content1').append(featureAdd);
            }
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
                console.log(menuPrice);

                //need to add all fields or undefined
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
    var r = JSON.stringify(rating);
    var d = JSON.stringify(date);

    //write rating

    function writeReviewToDb() {

        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                console.log(user.uid);
                db.collection("users")
                    .doc(user.uid)
                    .get()
                    .then(function (doc) {
                        console.log(doc.data().name);
                        var userName = JSON.stringify(doc.data().name);

                        db.collection("reviews")
                            .doc()
                            .set({
                                review: post,
                                ratings: r,
                                user: userName,
                                dateAdded: date,
                                restaurantID: id

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
                console.log(totalRating);
                reviewScore();
            })

        })


}
calcReview();

function reviewScore() {
    var reviewScore = totalRating / ratingCounter;
    $("#reviewScore").html("Ratings: " + reviewScore + "/5 Stars");
}

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
                reviewPost += '<span>Name: '+ n + '</span>';
                reviewPost += '<br/>';
                reviewPost += '<span>Review: '+r+'</span>';
                reviewPost += '<br/>';
                reviewPost += '<span>Rating: '+score+'/5 Stars</span>';
                reviewPost += '<br/>';
                reviewPost += '<span>Reviewed on: '+d+'</span>';
                reviewPost += '<hr/>';

                $('#reviewStart').append(reviewPost);


            })

        })
}
postReview();

