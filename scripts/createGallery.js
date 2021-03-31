function createRecipeGallery() {
    db.collection("recipes")
        .get()  //READ asynch all the data
        .then(function (snapcollection) {
            snapcollection.forEach(function (doc) {
                console.log(doc.data().recipe);
                var id = doc.id;
                var name = doc.data().recipe.title;
                var recipename = JSON.stringify(name)
                createTemplate();
                document.getElementById("recipeName").innerText = recipename;
                

            })
        })
}
createRecipeGallery();

function createTemplate() {
    var temp = $("#template").clone();
    $("#galleryStart").append(temp);
}