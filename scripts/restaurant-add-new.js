$(document).ready(function () {

    firebase.auth().onAuthStateChanged(function (somebody) {
        var user = somebody.uid;
        console.log(user);
        $("#uid").html(user);

    });

    var add = $("#add-restaurant");
    console.log($(add).html());

    $(add).click(function addRestaurant(e) {
        e.preventDefault();


        var uid = $("#uid").html();
        console.log(uid);
        var restaurantName = $("#new-restaurant-name").val();
        var restaurantAddress = $("#new-restaurant-address").val();
        var restaurantCity = $("#new-restaurant-city").val();
        var restaurantProvince = $("#new-restaurant-province").val();
        var restaurantPostal = $("#new-restaurant-postal").val();

        createRestaurant(uid, restaurantName, restaurantAddress, restaurantCity, restaurantProvince, restaurantPostal);

        function createRestaurant(a, b, c, d, e, f) {
            var newRestaurant = {
                owner: a,
                name: b,
                address: c,
                city: d,
                province: e,
                postalCode: f,
                ratings: ""
            };
            console.log(newRestaurant);
            db.collection("restaurants").add(newRestaurant).then(function(){
                window.location.href = "profile.html";

            }
                
                );


        };
        
    });

});


