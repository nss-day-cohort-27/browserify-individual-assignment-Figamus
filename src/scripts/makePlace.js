//vvvvvvvvvvvvvvvvv THIS AREA BELOW POPULATES THE #listOfPlaces WITH CURRENT DATA FROM API THAT IS PASSED INTO IT vvvvvvvvvvvvvvvvvvvvvvv
makePlace = (response) => {
    response.forEach((placeObject, index) => {
            let placeBox = $("<div></div>").attr("id", `placeBox--${index+1}`).attr("class", "card col-md-3 places");
            let placeName = $("<div></div>").attr("class", "placeName").text(`Name: ${placeObject.name}`);
            let placeType = $("<div></div>").attr("class", "placeType").text(`Type: ${placeObject.type}`);
            let placeLocation = $("<div></div>").attr("class", "placeLocation").text(`Location: ${placeObject.location}`);
            let editButton = $("<div></div>").text("Edit").attr("id", `editPlaceButton--${placeObject.id}`).attr("class", `editPlaceButton btn btn-sm btn-outline-secondary`);
            let deleteButton = $("<div></div>").text("Delete").attr("id", `deletePlaceButton--${placeObject.id}`).attr("class", `deletePlaceButton btn btn-sm btn-outline-secondary`);
            $(placeBox).append(placeName, placeType, placeLocation, editButton, deleteButton);
            $("#listOfPlaces").append(placeBox);
            $("#listOfPlaces").scrollTop($("#listOfPlaces")[0].scrollHeight) //THIS MAKES THE CHAT WINDOW STAY SCROLLED TO THE MOST CURRENT POST})
        })
    }

module.exports = makePlace