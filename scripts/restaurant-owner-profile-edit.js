$(document).ready(function () {
    const parsedUrl = new URL(window.location.href);
    uid = parsedUrl.searchParams.get("uid");

    var submit = $("#edit-submit");
    db.collection("restaurants")
        .doc(uid)
        .get()
        .then(function (doc) {
            $("#owner").html((doc.data().owner));
        });
    $(submit).click(function submit(e) {
        e.preventDefault();

        db.collection("restaurants").doc(uid).set({
            name: $("#restaurant-edit-name").val(),
            motto: $("#restaurant-edit-motto").val(),
            topReview: $("#restaurant-edit-top-review").val(),
            address: $("#restaurant-edit-address").val(),
            city: $("#restaurant-edit-city").val(),
            province: $("#restaurant-edit-province").val(),
            postalCode: $("#restaurant-edit-postal").val(),
            owner: $("#owner").html()
        });
        console.log("success!");
        window.location.href = "/restaurant-owner-profile.html?uid=" + uid;
    });

})
