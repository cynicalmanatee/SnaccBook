/**
 * Function gets recipe collections and recipe info on a card to display in carosel.
 */
function createRecipeCards() {
    db.collection("recipes")
        .get()  //READ asynch all the data
        .then(function (snapcollection) {
            snapcollection.forEach(function (doc) {

                var docID = doc.id;
                var name = doc.data().title;
                var recipename = JSON.stringify(name);
                var author = doc.data().author;
                var preptime = doc.data().prepTime;

                var recipeCollection = '<div class="carousel-item">';
                recipeCollection += '<div class="card w-75">';
                recipeCollection += '<div class="card-body">';
                recipeCollection += '<h5 class="card-title">' + recipename + '</h5>';
                recipeCollection += '<p class="card-text"> By: ' + author + '<br/>Prep Time: ' + preptime + '</p>';
                recipeCollection += '<a href="#" class="btn btn-primary" id="' + docID + '">View</a>'
                recipeCollection += '</div></div></div>';

                $('#recipeAttach').append(recipeCollection);
                linkToRecipePage(docID);
            })
        })
}
createRecipeCards();

/**
 * Link for button to go to recipe page. Passes recipe UID to url.
 * @param docID is the recipe UID
 */
function linkToRecipePage(docID) {
    document.getElementById(docID)
        .addEventListener("click", function () {
            window.location.href = "recipe.html?id=" + docID;
        });
}

/**
 * Grabs from collection of restaurants to display in main.html. Displays restaurant name, promo and a link to restaurant profile.
 */
function createRestaurantTable() {
    db.collection("restaurants")
        .get()  //READ asynch all the data
        .then(function (snapcollection) {
            snapcollection.forEach(function (doc) {

                var restID = doc.id;
                var restName = doc.data().name;
                if (typeof doc.data().promotion === 'undefined') {
                    var promo = "No promos currently. Check back soon!"
                } else {
                    var promo = doc.data().promotion;
                }
                var restTable = '<tr>';
                restTable += '<td>' + restName + '</td>';
                restTable += '<td>' + promo + '</td>';
                restTable += '<td><button type="button" class="btn btn-danger" id=' + restID + '>Lets Go</button></td>';
                restTable += '</tr>';

                $('#tableStart').append(restTable);
                linkToRestPage(restID);
            })
        })
}
createRestaurantTable();

/**
 * Link for button to go to restaurant-profile page. Passes restaurant UID to url.
 * @param restID is the restaurant-profile UID
 */
function linkToRestPage(restID) {
    document.getElementById(restID)
        .addEventListener("click", function () {
            window.location.href = "restaurant-profile.html?id=" + restID;
        });
}

//Displays first name
function sayHello() {
    firebase.auth().onAuthStateChanged(function (somebody) {
        if (somebody) {
            console.log(somebody.uid);
            db.collection("users")
                .doc(somebody.uid)
                .get()
                .then(function (doc) {
                    var n = doc.data().firstName;
                    if (typeof n === "undefined") {
                        n = doc.data().name;
                    }
                    $("#greetings").html(n);
                })
        }
    })
}
sayHello();

//Listen for for submit in profile post form
document.getElementById('userPost').addEventListener('submit', postForm);
// getting the current date and time
var today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
// Submit form function
function postForm(e) {
    e.preventDefault();
    //Get Values from the post
    var post = document.getElementById('post').value;
    writePostToDb();

    /**
     * Function writes post value to post collection.
     * Added a sort field to sort post from most recent. Sort value uses date value as a number.
     */
    function writePostToDb() {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                console.log(user.uid);
                db.collection("users")
                    .doc(user.uid)
                    .get()
                    .then(function (doc) {
                        db.collection("posts").add({ userpost: post, userID: user.uid, date: date, time: time, sort: Date.now() });
                    })
            };
        });
    };
};


/**
 * Sorts post using the date/sort field. Displays to page in descending order.
 */
db.collection("posts")
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

        var postCollection = '<div class="content">';
        postCollection += '<img class="profilePicture" src="https://dummyimage.com/600x400/000/fff" width="100%"/>';
        postCollection += '<div id="comment">' + message + '</div>';
        postCollection += '<div id = "date">' + date + '<br/>' + time + '</div>';
        postCollection += '</div>';
        postCollection += '<button type="button" class="btn btn-primary" id="' + likeID + '">Likes <span id="' + likeNumber + '"></span></button>'
        postCollection += '<br/><br/>'
       $("#postWall").append(postCollection);
        addLikeListener(id, likeID);
        var likes = doc.data().likes;
        $('#' + likeNumber).html(likes);
    });
});
displayPost();

/**
 * Like event listener that uses firebase increment to increase field when button is clicked.
 * @param {*} id is the UID
 * @param {*} likeId is the id selector to know what like button is being clicked
 */
function addLikeListener(id, likeId) {
document.getElementById(likeId).addEventListener("click", function () {
console.log("like was click!");
db.collection("posts")
    .doc(id)
    .update({
        likes: firebase.firestore.FieldValue.increment(1) //increments the field!
    })
})

}