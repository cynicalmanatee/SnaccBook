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
                console.log(recipename);
                console.log(docID);
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

function linkToRecipePage(docID) {
    document.getElementById(docID)
        .addEventListener("click", function () {
            console.log(docID + "was clicked!")
            //window.location.href="details.html";
            //when we redirect,tack on after "?" the id of the webcame
            window.location.href = "recipe.html?id=" + docID;
        });
}

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


                console.log(restName);
                console.log(restID);
                var restTable = '<tr>';
                restTable += '<td>' + restName + '</td>';
                //promo line goes here
                restTable += '<td>' + promo + '</td>';
                restTable += '<td><button type="button" class="btn btn-danger" id=' + restID + '>Lets Go</button></td>';
                restTable += '</tr>';


                $('#tableStart').append(restTable);
                linkToRestPage(restID);

            })
        })
}
createRestaurantTable();

function linkToRestPage(restID) {
    document.getElementById(restID)
        .addEventListener("click", function () {
            console.log(restID + "was clicked!")
            //window.location.href="details.html";
            //when we redirect,tack on after "?" the id of the webcame
            window.location.href = "restaurant-profile.html?id=" + restID;
        });
}


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
                    //get other things and do other things per this user.
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
    console.log(post);
    writePostToDb();

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
                        db.collection("posts").add({ userpost: post, userID: user.uid, date: date, time: time, sort: Date.now() });

                    })
            };

        });
    };
};

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

        console.log(doc.id);
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