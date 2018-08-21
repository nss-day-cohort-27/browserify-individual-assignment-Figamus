//vvvvvvvvvvvvvvvvv THIS AREA BELOW POPULATES THE #listOfPlaces WITH CURRENT DATA FROM API THAT IS PASSED INTO IT vvvvvvvvvvvvvvvvvvvvvvv
makePlace = (response) => {
    response.forEach((placeObject, index) => {
            let col = $("<div></div>").attr("id", `colBox--${placeObject.id}`).attr("class", "col-md-4");
            let placeBox = $("<div></div>").attr("id", `placeBox--${placeObject.id}`).attr("class", "card mb-4 box-shadow");
            let placeName = $("<div></div>").attr("class", `placeName--${placeObject.id}`).text(`Name: ${placeObject.name}`);
            let placeType = $("<div></div>").attr("class", `placeType--${placeObject.id}`).text(`Type: ${placeObject.type}`);
            let placeLocation = $("<div></div>").attr("class", `placeLocation--${placeObject.id}`).text(`Location: ${placeObject.location}`);
            let editButton = $("<div></div>").text("Edit").attr("id", `editPlaceButton--${placeObject.id}`).attr("class", `editPlaceButton btn btn-sm btn-outline-secondary`);
            let deleteButton = $("<div></div>").text("Delete").attr("id", `deletePlaceButton--${placeObject.id}`).attr("class", `deletePlaceButton btn btn-sm btn-outline-secondary`);
            $(placeBox).append(placeName, placeType, placeLocation, editButton, deleteButton);
            $(col).append(placeBox);
            $("#listOfPlaces").append(col);
        })
    }

module.exports = makePlace