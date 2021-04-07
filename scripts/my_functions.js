//Authentication and pulls the unique userID from the database
function sayHello() {
    firebase.auth().onAuthStateChanged(function(somebody) {
        if (somebody) {
            console.log(somebody.uid);
            db.collection("users")
                .doc(somebody.uid)
                .get()
                .then(function(doc) {
                    //console.log(doc.data().name);
                    var n = doc.data().name;
                    $("#name-goes-here1").text(n);
                    $("#name-goes-here2").text(n);
                    //get other things and do other things per this user.
                })
        }
    })
}
sayHello();


//Listen for for submit in profile post form
document.getElementById('userPost').addEventListener('submit', postForm);
// Submit form function
function postForm(e) {
    e.preventDefault();
    //Get Values from the post
    var post = document.getElementById('post').value;
    console.log(post);

    function writePostToDb() {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                console.log(user.uid);
                db.collection("users")
                    .doc(user.uid)
                    .get()
                    .then(function(doc) {
                        console.log(doc.data().name);
                        //change 
                        db.collection("posts").add({ userpost: post, userName: doc.data().name, date: date, time: time });

                    })
            }

        })
    }
    writePostToDb();
}
// getting the current date and time
var today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
//



//displaying content and writting it to first comment box..
function displayProfile() {
    db.collection("posts").get()
        .then(function(snap) {
            snap.forEach(function(doc) {
                var m = doc.data().userPost; //gets the name field
                console.log(m);
                document.getElementById(userPost).innerText = m;
            })

        })
}
displayProfile();

function changeName() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log(user.uid);
            db.collection("users")
                .doc(user.uid)
                .add({ name:"harry" });

               
        }

    })
}
//changeName();

