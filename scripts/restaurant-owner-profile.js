$(document).ready(function () {
    //Gets UID from url
    const parsedUrl = new URL(window.location.href);
    uid = parsedUrl.searchParams.get("uid");

    //writes relevent info in each section
    db.collection("restaurants")
        .doc(uid)
        .get()
        .then(function (doc) {
            $("#restaurant-name").html(doc.data().name);
            $("#restaurant-address").html(doc.data().address);
            $("#restaurant-city").html(doc.data().city);
            $("#restaurant-province").html(doc.data().province);
            $("#restaurant-postal").html(doc.data().postalCode);
            $("#restaurant-promotion").html(doc.data().promotion);

            //shows up only if there is a motto or review
            if (doc.data().motto !== undefined) {
                $("#restaurant-motto").html(doc.data().motto);
            }
            if (doc.data().topReview !== undefined) {
                $("#restaurant-top-review").html(doc.data().topReview);
            }

            /**
             * Writes the features in the feature section after getting data from DB
             */
            var features = doc.data().feature;
            var objects = JSON.parse(features);

            objects.forEach(function (e) {
                let box = document.createElement("div");
                box.setAttribute("class", "feature-card");
                let name = document.createElement("span");
                name.setAttribute("class", "feature-name");
                $(name).html(e.name);
                let description = document.createElement("span");
                description.setAttribute("class", "feature-description");
                $(description).html(e.description);
                $(box).append(name, description);
                $("#features").after(box);

            });

            /**
             * Writes the menu items in the menu section after getting data from DB
             */
            var menu = doc.data().menu;
            var menuobjects = JSON.parse(menu);

            menuobjects.forEach(function (e) {
                let box = document.createElement("div");
                box.setAttribute("class", "menu-card");
                let name = document.createElement("span");
                let price = document.createElement("span");
                let description = document.createElement("span");
                name.setAttribute("class", "menu-name");
                price.setAttribute("class", "menu-price");
                description.setAttribute("class", "menu-description");
                $(name).html(e.name);
                $(price).html(e.price);
                $(description).html(e.description);

                $(box).append(name, price, description);
                $("#menu").after(box);
            });
        });

    var button = $("#edit-restaurant-info");
    $(button).click(function nextPage(e) {
        e.preventDefault();
        window.location.href = "restaurant-owner-profile-edit.html?uid=" + uid;
    });

    var button = $("#edit-restaurant-features");
    $(button).click(function nextPage(e) {
        e.preventDefault();
        window.location.href = "restaurant-feature-edit.html?uid=" + uid;
    });

    var button = $("#edit-restaurant-menu");
    $(button).click(function nextPage(e) {
        e.preventDefault();
        window.location.href = "restaurant-menu-edit.html?uid=" + uid;
    });

    //Listen for for submit in profile post form
    document.getElementById('promo').addEventListener('submit', postForm);

    // // Submit form function. Adds promotion field to the restaurant collections when there is one.
    function postForm(e) {
        e.preventDefault();
        //Get Values from the post
        var post = document.getElementById('promotion').value;

        db.collection("restaurants").doc(uid).set({
            promotion: post
        }, { merge: true })
            .then(function (e) {
                refresh = location.reload();
            });
    };
});

