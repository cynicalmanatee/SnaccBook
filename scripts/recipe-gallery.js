/** Function creates the gallery in DOM. Uses a template clone to create cards 
 * in the gallery. Sets unquie ids with a 'x' as a counter for some card elements so 
 * they are different.
 */
function createRecipeGallery() {

    var x = 0;
    db.collection("recipes")
        .get()  //READ asynch all the data
        .then(function (snapcollection) {
            snapcollection.forEach(function (doc) {
                $('#template').hide;
                var docID = doc.id;
                var name = doc.data().title;
                var recipename = JSON.stringify(name);

                x++;
                createTemplate();
                document.getElementById("recipeName" + x).innerText = recipename;
                document.getElementById("linkID" + x).setAttribute("id", docID);

                function createTemplate() {
                    var temp = $("#template").clone();
                    temp.attr("id", "new" + x);
                    temp.find('#templink').attr("id", "linkID" + x);
                    temp.find('#tempName').attr("id", "recipeName" + x);
                    $("#galleryStart").append(temp);
                }
                linkToRecipePage(docID);
            })
        })
}
createRecipeGallery();

/**
 * This function takes the unique of the recipe and uses it in the link.
 * From the link we can use that UID to pull the correct data from the DB.
 * @param docID  is the unique ID for the recipe from the recipe collection
 */
function linkToRecipePage(docID) {
    document.getElementById(docID)
        .addEventListener("click", function () {
            window.location.href = "recipe.html?id=" + docID;
        });
}

