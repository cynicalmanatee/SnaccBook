$(document).ready(function () {

    firebase.auth().onAuthStateChanged(function (somebody) {
        var user = somebody.uid;
        console.log(user);
        $("#uid").html(user);
    });

    /**
     * When a new restaurant gets created we use this form to add fields to the restaurant collection.
     */
    var add = $("#add-restaurant");
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

        /**
         * The actually function that writes to the restaurant collection
         * 
         * @param {*} a is the uid
         * @param {*} b is the restaurant name
         * @param {*} c is the restaurant address
         * @param {*} d is the restaurant city
         * @param {*} e is the restaurant province 
         * @param {*} f is the retaurant postal code
         */
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
            db.collection("restaurants").add(newRestaurant).then(function (e) {
                window.location.href = "profile.html"
            });


        };

    });

});


