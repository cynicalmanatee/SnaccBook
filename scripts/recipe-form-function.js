//ctrl+f "author" to change the userid near it to the active user logged in who submitted the recipe.


$(document).ready(function () {

    firebase.auth().onAuthStateChanged(function (somebody) {
        var user = somebody.uid;
    });

    var ingredientCounter = 1;
    var instructionCounter = 1;

    $("#recipe-add-ingredient").click(function () {
        ingredientCounter++;
        var classString = "ingredient-group-" + ingredientCounter;

        var ingredientGroup = document.createElement("div");
        ingredientGroup.setAttribute("id", classString);
        ingredientGroup.setAttribute("class", "ingredient-group");

        var qtyid = "ingredient-quantity-" + ingredientCounter;
        var qtyfield = document.createElement("input");
        qtyfield.setAttribute("type", "text");
        qtyfield.setAttribute("class", "form-control ingredient-quantity");
        qtyfield.setAttribute("id", qtyid);
        qtyfield.setAttribute("placeholder", "");

        var unitid = "ingredient-unit-" + ingredientCounter;
        var unitfield = document.createElement("input");
        unitfield.setAttribute("type", "text");
        unitfield.setAttribute("class", "form-control ingredient-unit");
        unitfield.setAttribute("id", unitid);
        unitfield.setAttribute("placeholder", "");


        var nameid = "ingredient-name-" + ingredientCounter;
        var namefield = document.createElement("input");
        namefield.setAttribute("type", "text");
        namefield.setAttribute("class", "form-control ingredient-name");
        namefield.setAttribute("id", nameid);
        namefield.setAttribute("placeholder", "");



        var instructionid = "ingredient-instruction-" + ingredientCounter;
        var instructionfield = document.createElement("input");
        instructionfield.setAttribute("type", "text");
        instructionfield.setAttribute("class", "form-control ingredient-instruction");
        instructionfield.setAttribute("id", instructionid);
        instructionfield.setAttribute("placeholder", "");



        var minusid = "ingredient-minus-" + ingredientCounter;

        var minusfield = document.createElement("button");
        minusfield.setAttribute("type", "text");
        minusfield.setAttribute("class", "btn btn-primary ingredient-minus");
        minusfield.setAttribute("id", minusid);
        minusfield.setAttribute("placeholder", "");
        minusfield.innerHTML = "x";

        $(ingredientGroup).append(qtyfield, unitfield, namefield, instructionfield, minusfield);


        $("#recipe-add-ingredient").before(ingredientGroup);
        var element = document.getElementsByClassName("ingredient-minus");
        for (var i = 0; i < element.length; i++) {

            element[i].addEventListener('click', function (event) {
                event.preventDefault();
                var idtag = $(this).attr("id");
                var idstr = idtag.substring(17);
                var idnum = parseInt(idstr);

                var target = "#ingredient-group-" + idnum;
                $(target).remove();
            });
        }




    });

    $("#recipe-add-instruction").click(function () {
        instructionCounter++;
        id = "recipe-instruction-" + instructionCounter;
        var instructionGroup = document.createElement("div");
        instructionGroup.setAttribute("class", "recipe-instruction");
        instructionGroup.setAttribute("id", id);


        var step = document.createElement("input");
        var stepid = "recipe-instruction-step-" + instructionCounter;
        step.setAttribute("id", stepid);
        step.setAttribute("class", "form-control recipe-instruction-step");
        step.setAttribute("placeholder", "Step");


        var time = document.createElement("input");
        var timeid = "recipe-instruction-time-" + instructionCounter;
        time.setAttribute("id", timeid);
        time.setAttribute("class", "form-control recipe-instruction-time");
        time.setAttribute("placeholder", "Time");

        var instructionMinus = document.createElement("button");
        var instructionminusid = "recipe-instruction-minus-" + instructionCounter
        instructionMinus.setAttribute("type", "text");
        instructionMinus.setAttribute("class", "btn btn-primary recipe-instruction-minus");
        instructionMinus.setAttribute("id", instructionminusid);
        instructionMinus.setAttribute("placeholder", "");
        instructionMinus.innerHTML = "x";


        var description = document.createElement("textarea");
        descriptionid = "recipe-instruction-description-" + instructionCounter;
        description.setAttribute("class", "form-control recipe-instruction-description");
        description.setAttribute("id", descriptionid);
        description.setAttribute("rows", "2");
        description.setAttribute("placeholder", "Instructions");

        $(instructionGroup).append(step, time, instructionMinus, description);


        $("#recipe-add-instruction").before(instructionGroup);

        var instructions = document.getElementsByClassName("recipe-instruction-minus");
        for (var i = 0; i < instructions.length; i++) {

            instructions[i].addEventListener('click', function (event) {
                event.preventDefault();
                var instag = $(this).attr("id");
                var insstr = instag.substring(25);
                var insnum = parseInt(insstr);

                var instarget = "#recipe-instruction-" + insnum;
                $(instarget).remove();
            });
        }


    });

    $("#submit-button").click(function (submit) {
        submit.preventDefault();
        var title = $("#recipe-title").val();
        var userid = "";
        var author = $("#recipe-author").val();
        var prepTime = $("#recipe-prep-time").val();
        var specialInstructions = $("#recipe-special-instructions").val();
        var ingredients = document.getElementsByClassName("ingredient-group");
        var ingredientlist = [];
        for (var i = 0; i < ingredients.length; i++) {

            var ingredientindex = $(ingredients[i]).attr("id");
            console.log(ingredientindex);
            var idstr = ingredientindex.substring(17);
            var idnum = parseInt(idstr);

            console.log(idstr);

            var myqty = $("#ingredient-quantity-" + idnum).val();
            var myunit = $("#ingredient-unit-" + idnum).val();
            var myname = $("#ingredient-name-" + idnum).val();
            var myinstruction = $("#ingredient-instruction-" + idnum).val();
            var ingredientObject = { qty: myqty, unit: myunit, name: myname, instruction: myinstruction };

            ingredientlist.push(ingredientObject);
        };
        var instructions = document.getElementsByClassName("recipe-instruction");
        var instructionlist = [];
        for (var i = 0; i < instructions.length; i++) {
            var instag = $(instructions[i]).attr("id");
            var insstr = instag.substring(19);
            var insnum = parseInt(insstr);

            var mystep = $("#recipe-step-" + insnum).val();
            var mytime = $("#recipe-step-time-" + insnum).val();
            var myinstruction = $("#recipe-instruction-desciption-" + insnum).val();
            var instructionobject = { step: mystep, time: mytime, instruction: myinstruction };
            instructionlist.push(instructionobject);
        };

        var ingredientstring = JSON.stringify(ingredientlist);
        var instructionstring = JSON.stringify(instructionlist);

        var myrecipe = {
            title: title, author: author, id: userid
            , prepTime: prepTime, specialInstructions: specialInstructions,
            ingredients: ingredientstring, instructions: instructionstring
        };

        console.log(myrecipe);



        // sending title, author, userid, prepTime, myrecipe


        writeRecipes();



    });




});

$(document).keypress(
    function (event) {
        if (event.which == '13') {
            event.preventDefault();
        }
    }
);
function writeRecipes() {
    var recipeRef = db.collection("recipes");
    recipeRef.add({ "recipe": myrecipe });
}

//Query to implement later
// function recipeQuery() {
//     db.collection("recipes")
//         //can query the recipe name to user input
//         .where("RecipeTitle", "==", "Snake Meat Pie")
//         .get()
//         .then((querySnapshot) => {
//             querySnapshot.forEach((doc) => {
//                 // doc.data() is never undefined for query doc snapshots
//                 //console.log(doc.data());
//                 var recipe = doc.data();
//                 console.log(recipe);
//                 //prints out the object will have to directly move everything
//                 //dynamically update recipe page
//                 str = JSON.stringify(recipe)
//                 document.getElementById("testingRecipe").innerHTML = str;

//             })
//         })
// }