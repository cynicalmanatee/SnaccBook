$(document).ready(function () {
    const parsedUrl = new URL(window.location.href);
    uid = parsedUrl.searchParams.get("uid");
    console.log(uid);

    db.collection("restaurants")
        .doc(uid)
        .get()
        .then(function (doc) {
            $("#restaurant-name").html(doc.data().name);
            $("#restaurant-address").html(doc.data().address);
            $("#restaurant-city").html(doc.data().city);
            $("#restaurant-province").html(doc.data().province);
            $("#restaurant-postal").html(doc.data().postalCode);

            if (doc.data().motto !== undefined) {
                $("#restaurant-motto").html(doc.data().motto);

            }
            if (doc.data().topReview !== undefined) {
                $("#restaurant-top-review").html(doc.data().topReview);

            }
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


});

