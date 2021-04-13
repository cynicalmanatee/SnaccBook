$(document).ready(function () {
    const parsedUrl = new URL(window.location.href);
    uid = parsedUrl.searchParams.get("uid");

    var submit = $("#edit-submit");
    db.collection("restaurants")
        .doc(uid)
        .get()
        .then(function (doc) {
            $("#owner").html((doc.data().owner));
            if (typeof doc.data().name === 'undefined') {
                document.getElementById("restaurant-edit-name").setAttribute("placeholder", "");
            } else {
                document.getElementById("restaurant-edit-name").setAttribute("placeholder", doc.data().name);
            }
            if (typeof doc.data().motto === 'undefined') {
                document.getElementById("restaurant-edit-motto").setAttribute("placeholder", "");
            } else {
                document.getElementById("restaurant-edit-motto").setAttribute("placeholder", doc.data().motto);
            }
            if (typeof doc.data().topReview === 'undefined') {
                document.getElementById("restaurant-edit-top-review").setAttribute("placeholder", "");
            } else {
                document.getElementById("restaurant-edit-top-review").setAttribute("placeholder", doc.data().topReview);
            }
            if (typeof doc.data().address === 'undefined') {
                document.getElementById("restaurant-edit-address").setAttribute("placeholder", "");
            } else {
                document.getElementById("restaurant-edit-address").setAttribute("placeholder", doc.data().address);
            }
            if (typeof doc.data().city === 'undefined') {
                document.getElementById("restaurant-edit-city").setAttribute("placeholder", "");
            } else {
                document.getElementById("restaurant-edit-city").setAttribute("placeholder", doc.data().city);
            }

            if (typeof doc.data().province === 'undefined') {
                document.getElementById("restaurant-edit-province").setAttribute("placeholder", "");
            } else {
                document.getElementById("restaurant-edit-province").setAttribute("placeholder", doc.data().province);
            }

            if (typeof doc.data().postalCode === 'undefined') {
                document.getElementById("restaurant-edit-postal").setAttribute("placeholder", "");
            } else {
                document.getElementById("restaurant-edit-postal").setAttribute("placeholder", doc.data().postalCode);
            }

        });






    $(submit).click(function submit(e) {
        e.preventDefault();

        if (document.getElementById("restaurant-edit-name").value.length == 0) {
            $("#restaurant-edit-name").val($("#restaurant-edit-name").attr("placeholder"));
        };
        if (document.getElementById("restaurant-edit-motto").value.length == 0) {
            $("#restaurant-edit-motto").val($("#restaurant-edit-motto").attr("placeholder"));
        };
        if (document.getElementById("restaurant-edit-top-review").value.length == 0) {
            $("#restaurant-edit-top-review").val($("#restaurant-edit-top-review").attr("placeholder"));
        };
        if (document.getElementById("restaurant-edit-address").value.length == 0) {
            $("#restaurant-edit-address").val($("#restaurant-edit-address").attr("placeholder"));
        }
        if (document.getElementById("restaurant-edit-city").value.length == 0) {
            $("#restaurant-edit-city").val($("#restaurant-edit-city").attr("placeholder"));
        }
        if (document.getElementById("restaurant-edit-province").value.length == 0) {
            $("#restaurant-edit-province").val($("#restaurant-edit-province").attr("placeholder"));
        }
        if (document.getElementById("restaurant-edit-postal").value.length == 0) {
            $("#restaurant-edit-postal").val($("#restaurant-edit-postal").attr("placeholder"));
        }

        console.log($("#restaurant-edit-motto").val());
        db.collection("restaurants").doc(uid).set({
            name: $("#restaurant-edit-name").val(),
            motto: $("#restaurant-edit-motto").val(),
            topReview: $("#restaurant-edit-top-review").val(),
            address: $("#restaurant-edit-address").val(),
            city: $("#restaurant-edit-city").val(),
            province: $("#restaurant-edit-province").val(),
            postalCode: $("#restaurant-edit-postal").val(),
            owner: $("#owner").html()
        }, { merge: true }).then(
            function (e) {
                console.log("success!");
                window.location.href = "/restaurant-owner-profile.html?uid=" + uid;
            });

    });

})
