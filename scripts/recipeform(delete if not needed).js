//Listen for for submit in profile post form

document.getElementById('submit-button').addEventListener("click", postRecipe);

function postRecipe(e) {
    // e.preventDefault();
    //Get Values from the post
    var recipeTitle = document.getElementById("recipe-title").value;
    var recipeAuthor = document.getElementById("recipe-author").value;
    var recipePrep = document.getElementById("recipe-prep-time").value;
    var recipeSpecialInstruction = document.getElementById("recipe-special-instruction").value;

    var ingredidentQuantity1 = document.getElementById("ingredient-quantity-1").value;
    var ingredientUnit1 = document.getElementById("ingredient-unit-1").value;
    var ingredientName1 = document.getElementById("ingredient-name-1").value;
    var ingredientInstruction1 = document.getElementById("ingredient-instruction-1").value;

    var ingredidentQuantity2 = document.getElementById("ingredient-quantity-2").value;
    var ingredientUnit2 = document.getElementById("ingredient-unit-2").value;
    var ingredientName2 = document.getElementById("ingredient-name-2").value;
    var ingredientInstruction2 = document.getElementById("ingredient-instruction-2").value;

    var recipeStep1 = document.getElementById("recipe-step-1").value;
    var recipeStepTime1 = document.getElementById("recipe-step-time-1").value;
    var recipeInstruction1 = document.getElementById("recipe-instruction-1").value;

    var recipeStep2 = document.getElementById("recipe-step-2").value;
    var recipeStepTime2 = document.getElementById("recipe-step-time-2").value;
    var recipeInstruction2 = document.getElementById("recipe-instruction-2").value;

    var recipeStep3 = document.getElementById("recipe-step-3").value;
    var recipeStepTime3 = document.getElementById("recipe-step-time-3").value;
    var recipeInstruction3 = document.getElementById("recipe-instruction-3").value;

    //adding to database
    var recipeRef = db.collection("recipes");

    recipeRef.add({
        RecipeTitle: recipeTitle,
        RecipeAuthor: recipeAuthor,
        RecipePrep: recipePrep,
        RecipeSpecialInstruction: recipeSpecialInstruction,

        IngredidentQuantity1: ingredidentQuantity1,
        IngredientUnit1: ingredientUnit1,
        IngredientName1: ingredientName1,
        IngredientInstruction1: ingredientInstruction1,

        IngredidentQuantity2: ingredidentQuantity2,
        IngredientUnit2: ingredientUnit2,
        IngredientName2: ingredientName2,
        IngredientInstruction2: ingredientInstruction2,

        RecipeStep1: recipeStep1,
        RecipeStepTime1: recipeStep1,
        RecipeInstruction1: recipeStep1,

        RecipeStep2: recipeStep2,
        RecipeStepTime2: recipeStep2,
        RecipeInstruction2: recipeStep2,

        RecipeStep3: recipeStep3,
        RecipeStepTime3: recipeStep3,
        RecipeInstruction3: recipeStep3
    })
}

function recipeQuery() {
    db.collection("recipes")
        //can query the recipe name to user input
        .where("RecipeTitle", "==", "Snake Meat Pie")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                //console.log(doc.data());
                var recipe = doc.data();
                console.log(recipe);
                //prints out the object will have to directly move everything
                //dynamically update recipe page
                str = JSON.stringify(recipe)
                document.getElementById("testingRecipe").innerHTML = str;

            })
        })
}
