$(document).ready(function () {
    const parsedUrl = new URL(window.location.href);
    uid = parsedUrl.searchParams.get("uid");

    var submit = $("#edit-submit");
    db.collection("restaurants")
        .doc(uid)
        .get()
        .then(function (doc) {
            $("#owner").html((doc.data().owner));
            document.getElementById("restaurant-edit-name").setAttribute("placeholder", doc.data().name);
            document.getElementById("restaurant-edit-motto").setAttribute("placeholder", doc.data().motto);
            document.getElementById("restaurant-edit-top-review").setAttribute("placeholder", doc.data().topReview);
            document.getElementById("restaurant-edit-address").setAttribute("placeholder", doc.data().address);
            document.getElementById("restaurant-edit-city").setAttribute("placeholder", doc.data().city);
            document.getElementById("restaurant-edit-province").setAttribute("placeholder", doc.data().province);
            document.getElementById("restaurant-edit-postal").setAttribute("placeholder", doc.data().postalCode);
            console.log(document.getElementById("restaurant-edit-postal").setAttribute("placeholder", doc.data().baby));
        });






    $(submit).click(function submit(e) {
        e.preventDefault();

        console.log($("#restaurant-edit-name").val());
        if (typeof $("restaurant-edit-name").val() !== "") {
            $("#restaurant-edit-name").val($("#restaurant-edit-name").attr("placeholder"));
            console.log($("#restaurant-edit-name").val());
        }
        // db.collection("restaurants").doc(uid).set({
        //     name: $("#restaurant-edit-name").val(),
        //     motto: $("#restaurant-edit-motto").val(),
        //     topReview: $("#restaurant-edit-top-review").val(),
        //     address: $("#restaurant-edit-address").val(),
        //     city: $("#restaurant-edit-city").val(),
        //     province: $("#restaurant-edit-province").val(),
        //     postalCode: $("#restaurant-edit-postal").val(),
        //     owner: $("#owner").html()
        // },{merge: true});
        console.log("success!");
        // window.location.href = "/restaurant-owner-profile.html?uid=" + uid;
    });

})
