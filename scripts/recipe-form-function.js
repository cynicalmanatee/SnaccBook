$(document).ready(function () {

    var counter = 1;




    $("#recipe-add-ingredient").click(function () {
        counter++;
        var classString = "ingredient-group-" + counter;

        var qtyBox = document.createElement("div");

        qtyBox.setAttribute("class", "col-md-2 " + classString);

        var qtyid = "ingredient-quantity-" + counter;
        var qtyfield = document.createElement("input");
        qtyfield.setAttribute("type", "text");
        qtyfield.setAttribute("class", "form-control ingredient-quantity");
        qtyfield.setAttribute("id", qtyid);
        qtyfield.setAttribute("placeholder", "");
        $(qtyBox).append(qtyfield);


        var unitBox = document.createElement("div");
        unitBox.setAttribute("class", "col-md-1 " + classString);

        var unitid = "ingredient-unit-" + counter;
        var unitfield = document.createElement("input");
        unitfield.setAttribute("type", "text");
        unitfield.setAttribute("class", "form-control ingredient-quantity");
        unitfield.setAttribute("id", unitid);
        unitfield.setAttribute("placeholder", "");
        $(unitBox).append(unitfield);

        var nameBox = document.createElement("div");
        nameBox.setAttribute("class", "col-md-3 " + classString);

        var nameid = "ingredient-name-" + counter;
        var namefield = document.createElement("input");
        namefield.setAttribute("type", "text");
        namefield.setAttribute("class", "form-control ingredient-quantity");
        namefield.setAttribute("id", nameid);
        namefield.setAttribute("placeholder", "");
        $(nameBox).append(namefield);


        var instructionBox = document.createElement("div");
        instructionBox.setAttribute("class", "col-md-5 " + classString);

        var instructionid = "ingredient-instruction-" + counter;
        var instructionfield = document.createElement("input");
        instructionfield.setAttribute("type", "text");
        instructionfield.setAttribute("class", "form-control ingredient-quantity");
        instructionfield.setAttribute("id", instructionid);
        instructionfield.setAttribute("placeholder", "");
        $(instructionBox).append(instructionfield);

        var minusBox = document.createElement("div");
        minusBox.setAttribute("class", "col-md-1 minus " + classString);
        minusBox.setAttribute("data-id", counter);


        var minusid = "ingredient-minus-" + counter;

        var minusfield = document.createElement("button");
        minusfield.setAttribute("type", "text");
        minusfield.setAttribute("class", "btn btn-primary ingredient-minus");
        minusfield.setAttribute("id", minusid);
        minusfield.setAttribute("placeholder", "");
        minusBox.setAttribute("data-id", counter);
        minusfield.innerHTML = "x";




        var element = document.getElementsByClassName("ingredient-minus");
        $(minusBox).append(minusfield);

        $('#recipe-add-ingredient').before(qtyBox, unitBox, nameBox, instructionBox, minusBox);
        for (var i = 0; i < element.length; i++) {

            element[i].addEventListener('click', function (event) {
                event.preventDefault();
                var idtag = $(this).attr("id");
                var idstr = idtag.substring(17);
                var idnum = parseInt(idstr);

                var target = ".ingredient-group-" + idnum;
                $(target).remove();
            });
        }


    });



});
$(document).keypress(
    function (event) {
        if (event.which == '13') {
            event.preventDefault();
        }
    });