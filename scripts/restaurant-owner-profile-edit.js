document.readyState(function () {
    const parsedUrl = new URL(window.location.href);
    uid = parsedUrl.searchParams.get("uid");
    console.log(uid);

    var submit = $("edit-submit");
    $(submit).click(function submit(e) {
        e.preventDefault();
        db.collection("restaurants").doc(uid).set({
            name: $("restaurant-edit-name").val(),
            motto: $("restaurant-edit-name").val(),
            topReview: $("restaurant-edit-name").val(),
            name: $("restaurant-edit-name").val(),
            name: $("restaurant-edit-name").val(),
            name: $("restaurant-edit-name").val(),
            name: $("restaurant-edit-name").val(),



        });
    });

})
