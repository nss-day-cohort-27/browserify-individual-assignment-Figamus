//vvvvvvvvvvvvvvvvv THIS AREA BELOW POPULATES THE #chatWindow WITH CURRENT DATA FROM API THAT IS PASSED INTO IT vvvvvvvvvvvvvvvvvvvvvvv
makePlace = (response) => {
    response.reverse().forEach((placeObject, index) => {
            let placeBox = $("<div></div>").attr("id", `placeBox--${index+1}`).attr("class", "places");
            let placeName = $("<div></div>").attr("class", "placeName").text(`${placeObject.name}`);
            let placeLocation = $("<div></div>").attr("class", "placeLocation").text(`${placeObject.location}`);
            let editButton = $("<div></div>").text("Edit").attr("id", `editPlaceButton--${placeObject.id}`).attr("class", `editPlaceButton`);
            let deleteButton = $("<div></div>").text("Delete").attr("id", `deletePlaceButton--${placeObject.id}`).attr("class", `deletePlaceButton`);
            $(placeBox).append(placeName, placeLocation, editButton, deleteButton);
            $("#mainDiv").append(placeBox);
            $("#mainDiv").scrollTop($("#mainDiv")[0].scrollHeight) //THIS MAKES THE CHAT WINDOW STAY SCROLLED TO THE MOST CURRENT POST})
        })
    }

module.exports = makePlace