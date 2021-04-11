$(document).ready(function() {
    const parsedUrl = new URL(window.location.href);
    uid = parsedUrl.searchParams.get("uid");
    var featureCounter = 1;
    $("#add-feature").click(function(e) {
        e.preventDefault();

        featureCounter++;
        var featureGroup = "feature-card-" + featureCounter;

        var box = document.createElement("div");
        box.setAttribute("id", featureGroup);
        box.setAttribute("class", "feature-card");

        var nameid = "feature-name-" + featureCounter;
        var name = document.createElement("input");
        name.setAttribute("id", nameid);
        name.setAttribute("class", "feature-name");
        name.setAttribute("placeholder", "Feature Name");
        $(box).append(name);

        var descriptionid = "feature-description-" + featureCounter;
        var description = document.createElement("input");
        description.setAttribute("id", descriptionid);
        description.setAttribute("class", "feature-description");
        description.setAttribute("placeholder", "Feature Description");
        $(box).append(description);


        var minusid = "minus-" + featureCounter;
        var minus = document.createElement("button");
        minus.setAttribute("id", minusid);
        minus.setAttribute("class", "minus");
        minus.innerHTML = "Delete";
        $(box).append(minus);


        $("#add-feature").before(box);

        var element = document.getElementsByClassName("minus");
        for (var i = 0; i < element.length; i++) {
            element[i].addEventListener('click', function(e) {
                e.preventDefault();
                var idtag = $(this).attr("id");
                var idstr = idtag.substring(6);
                var idnum = parseInt(idstr);

                var target = "#feature-card-" + idnum;
                $(target).remove();

                console.log(idnum);
            })
        }

    });
    $("#submit").click(function(e) {
        e.preventDefault();
        var feature = document.getElementsByClassName("feature-card");
        var featurelist = [];
        for (var i = 0; i < feature.length; i++) {
            var index = $(feature[i]).attr("id");
            var idstr = index.substring(13);
            var idnum = parseInt(idstr);

            console.log(idnum);

            var featureName = $("#feature-name-" + idnum).val();
            var featureDes = $("#feature-description-" + idnum).val();

            var featureObject = { name: featureName, description: featureDes };

            featurelist.push(featureObject);
        };

        var featureString = JSON.stringify(featurelist);

        db.collection("restaurants").doc(uid).set({
                feature: featureString
            }, { merge: true })
            .then(function() {
                window.location.href = "/restaurant-owner-profile.html?uid=" + uid
            });

        console.log("finished");
        //window.location.href = "/restaurant-owner-profile.html?uid=" + uid;
    });
});