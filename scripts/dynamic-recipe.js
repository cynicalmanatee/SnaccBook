function getDetails() {

    const parsedUrl = new URL(window.location.href);
    console.log(parsedUrl.searchParams.get("id")); // "123"

    // extract id from url, assign to variable
    var id = parsedUrl.searchParams.get("id");
    console.log(id);

    db.collection("recipes")
        .doc(id)
        .get()
        .then(function(doc) {

            var recipeTitle = doc.data().title;
            var author = doc.data().author;
            var prepTime = doc.data().prepTime;
            var specialInstructions = doc.data().specialInstructions;

            document.getElementById("recipe-title").innerHTML = recipeTitle;
            document.getElementById("recipe-author").innerHTML = "by " + author;
            document.getElementById("recipe-cooking-time").innerHTML = prepTime;
            document.getElementById("special-instructions").innerHTML = specialInstructions;

            var ingredients = JSON.parse(doc.data().ingredients);

            console.log(ingredients);

            for (var x = 0; x < ingredients.length; x++) {
                var qty = ingredients[x].qty;
                var unit = ingredients[x].unit;
                var name = ingredients[x].name;
                var instructionsPrep = ingredients[x].instruction;
                console.log(instructionsPrep);

                var ingredientsList = '<div class="recipe-ingredient-item"></div>';
                ingredientsList += '<span class="name">' + "Ingredient: " + name + '</span>';
                ingredientsList += '<br>';
                ingredientsList += '<span class="quantity">' + " Quanty: " + qty + '</span>';
                ingredientsList += '<span class="unit">' + " " + unit + '</span>';
                ingredientsList += '<br>';
                if (instructionsPrep != "") {
                    ingredientsList += '<span class="special instructions">' + "Ingredient Prep: " + instructionsPrep + '</span>';
                }
                ingredientsList += '</div>';
                ingredientsList += '<br>';
                ingredientsList += '<br>';
                $("#ingredients").append(ingredientsList);
            }

            var instructions = JSON.parse(doc.data().instructions);
            console.log(instructions);

            for (var i = 0; i < instructions.length; i++) {
                var stepnumber = instructions[i].step;
                var steptime = instructions[i].time;
                var stepinstruction = instructions[i].instruction;

                var instructionsList = '<div class="recipe-steps">';
                instructionsList += '<span class="step-time-req">' + "Time Required: " + steptime + '</span>';
                instructionsList += '<br>';
                instructionsList += '<span class="step-number">' + "Step " + stepnumber + ": " + '</span>';
                instructionsList += '<span class="step-instruction">' + stepinstruction + '</span>';
                instructionsList += '<br>';
                instructionsList += '<br>';

                $("#procedure").append(instructionsList);
            }
        })

}
getDetails();

//Get the button
var mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}