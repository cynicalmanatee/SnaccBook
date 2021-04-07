function createRecipeGallery() {
    var x=0;
    db.collection("recipes")
        .get()  //READ asynch all the data
        .then(function (snapcollection) {
            snapcollection.forEach(function (doc) {
               $('#template').hide;
                var docID = doc.id;
                var name = doc.data().title;
                var recipename = JSON.stringify(name);
                console.log(recipename);
                console.log(docID);
                x++;
                createTemplate();
                document.getElementById("recipeName"+ x).innerText = recipename;
                document.getElementById("linkID"+x).setAttribute("id", docID);
                
                function createTemplate() {
                    var temp = $("#template").clone();
                    temp.attr("id", "new" +x);
                    temp.find('#templink').attr("id", "linkID"+x);
                    temp.find('#tempName').attr("id","recipeName" + x);
                    $("#galleryStart").append(temp);
                }
                linkToRecipePage(docID);
            })
        })
}
createRecipeGallery();
//Got it making unique ID links now... now to link to recipe page and dynmaically change it



function linkToRecipePage(docID) {
    document.getElementById(docID)
        .addEventListener("click", function () {
            console.log(docID + "was clicked!")
            //window.location.href="details.html";
            //when we redirect,tack on after "?" the id of the webcame
            window.location.href = "recipe.html?id=" + docID;
        });
    }