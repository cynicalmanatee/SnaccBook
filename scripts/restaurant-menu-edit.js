$(document).ready(function () {
    const parsedUrl = new URL(window.location.href);
    uid = parsedUrl.searchParams.get("uid");
    var menuCounter = 1;
    $("#add-menu").click(function (e) {
        e.preventDefault();

        menuCounter++;
        var menuGroup = "menu-card-" + menuCounter;

        var box = document.createElement("div");
        box.setAttribute("id", menuGroup);
        box.setAttribute("class", "menu-card");

        var nameid = "menu-name-" + menuCounter;
        var name = document.createElement("input");
        name.setAttribute("id", nameid);
        name.setAttribute("class", "menu-name");
        name.setAttribute("placeholder", "menu Name");
        $(box).append(name);

        var priceid = "menu-price-" + menuCounter;
        var price = document.createElement("input");
        price.setAttribute("id", nameid);
        price.setAttribute("class", "menu-price");
        price.setAttribute("placeholder", "Item Price");
        $(box).append(price);

        var descriptionid = "menu-description-" + menuCounter;
        var description = document.createElement("input");
        description.setAttribute("id", descriptionid);
        description.setAttribute("class", "menu-description");
        description.setAttribute("placeholder", "menu Description");
        $(box).append(description);


        var minusid = "minus-" + menuCounter;
        var minus = document.createElement("button");
        minus.setAttribute("id", minusid);
        minus.setAttribute("class", "minus");
        minus.innerHTML = "X";
        $(box).append(minus);


        $("#add-menu").before(box);

        var element = document.getElementsByClassName("minus");
        for (var i = 0; i < element.length; i++) {
            element[i].addEventListener('click', function (e) {
                e.preventDefault();
                var idtag = $(this).attr("id");
                var idstr = idtag.substring(6);
                var idnum = parseInt(idstr);

                var target = "#menu-card-" + idnum;
                $(target).remove();

                console.log(idnum);
            })
        }

    });
    $("#submit").click(function (e) {
        e.preventDefault();
        var menu = document.getElementsByClassName("menu-card");
        var menulist = [];
        for (var i = 0; i < menu.length; i++) {
            var index = $(menu[i]).attr("id");
            var idstr = index.substring(10);
            var idnum = parseInt(idstr);

            console.log(idnum);

            var menuName = $("#menu-name-" + idnum).val();
            var menuPrice = $("#menu-price-" + idnum).val();
            var menuDes = $("#menu-description-" + idnum).val();

            var menuObject = { name: menuName, price: menuPrice, description: menuDes };

            menulist.push(menuObject);
        };

        var menuString = JSON.stringify(menulist);

        db.collection("restaurants").doc(uid).set({
            menu: menuString
        }, { merge: true }).then(function () {
            window.location.href = "/restaurant-owner-profile.html?uid=" + uid;
        });


    });
});