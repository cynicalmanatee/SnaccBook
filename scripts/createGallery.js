function createRecipeGallery() {
    db.collection("recipes")
        .get()  //READ asynch all the data
        .then(function (snapcollection) {
            snapcollection.forEach(function (doc) {
                
                var docID = JSON.stringify(doc.id);
                console.log(docID);
                
                var name = doc.data().recipe.title;
                var recipename = JSON.stringify(name);
                createTemplate();
                document.getElementById("recipeName").innerText = recipename;
                document.getElementById("linkID").setAttribute("id", docID);

                

            })
        })
}
createRecipeGallery();
//Got it making unique ID links now... now to link to recipe page and dynmaically change it
function createTemplate() {
    var temp = $("#template").clone();
    temp.find('#templink').attr("id","linkID");
    temp.find('#template').attr("id","")
    $("#galleryStart").append(temp);
}

// function addWebcamListener(id) {
//     document.getElementById(id)
//         .addEventListener("click", function () {
//             console.log(id + "was clicked!")
//             //window.location.href="details.html";
//             //when we redirect,tack on after "?" the id of the webcame
//             window.location.href = "details.html?id=" + id;
//         });