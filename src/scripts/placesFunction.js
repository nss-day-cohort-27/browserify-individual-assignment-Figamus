const makePlace = require("makePlace.js");
const dbCalls = require("dbCalls.js");

const places = Object.create(null, {
    //vvvvvvvvvvvvvvvvv CreateWindow MAKES THE HTML FOR PLACES WITH CURRENT DATA vvvvvvvvvvvvvvvvvvvvvvv
    createWindow: {
        value: () => {
            console.log("Create Chat Window");
            let container = $("<div></div>").attr("id", "mainContainer").attr("class", "container");
            let container2 = $("<div></div>").attr("id", "headerContainer").attr("class", "container mx-auto");
            let header = $("<div></div>").attr("id", "mainContainer").attr("class", "row");
            let title = $("<h3></h3>").text("Favorite Places").attr("class", "col-md-12 text-center");
            let nameContainer = $("<div></div>").attr("id", "nameContainer").attr("class", "col-md-4 row");
            let placeNameLable = $("<label>Name:</label>").attr("for", "placeNameLable ").attr("class", "col-md-12 text-center");
            let placeName = $("<input></input>").attr("id", "placeName").attr("placeholder", "Name of Place").attr("class", "col-md-12");
            let typeContainer = $("<div></div>").attr("id", "typeContainer").attr("class", "col-md-4");
            let placeTypeLable = $("<label>Type:</label>").attr("for", "placeTypeLable").attr("class", "col-md-12 text-center");
            let placeType = $("<input></input>").attr("id", "placeType").attr("placeholder", "Type of Place").attr("class", "col-md-12");
            let locationContainer = $("<div></div>").attr("id", "locationContainer").attr("class", "col-md-4");
            let placeLocationLable = $("<label>Location:</label>").attr("for", "placeLocationLable").attr("class", "col-md-12 text-center");
            let placeLocation = $("<input></input>").attr("id", "placeLocation").attr("placeholder", "Location of Place").attr("class", "col-md-12");
            let postButton = $("<button>Post</button>").attr("id", "postButton").attr("class", "col-md-12 btn btn-sm btn-outline-secondary mx-auto");
            let listOfPlaces = $("<div></div>").attr("id", "listOfPlaces").attr("class", "row");
            $(nameContainer).append(placeNameLable, placeName);
            $(typeContainer).append(placeTypeLable, placeType);
            $(locationContainer).append(placeLocationLable, placeLocation);
            $(header).append(title, nameContainer, typeContainer, locationContainer, postButton);
            $(container2).append(header);
            $(container).append(container2, listOfPlaces);
            $("#mainDiv").append(container);
            return dbCalls.getPlaces()
            .then((response) => {
                makePlace(response)
            })
        }
    },
    //vvvvvvvvvvvvvvvvv postPlace GENERATES AN OBJECT BASED ON CURRENT VALUES OF "placeName" "placeType" "placeLocation" and POSTS IT TO API vvvvvvvvvvvvvvvvvvvvvvv
    postPlace: {
        value: () => {
            const newEntry = {
                name: document.querySelector("#placeName").value,
                type: document.querySelector("#placeType").value,
                location: document.querySelector("#placeLocation").value,
            }
            dbCalls.savePlace(newEntry)
                .then(() => {
                    document.querySelector("#placeName").value = "";
                    document.querySelector("#placeType").value = "";
                    document.querySelector("#placeLocation").value = "";
                })
                //THEN CALLS ON DATABASE MANAGER TO GET DATA AND GENERATE THE CHAT WINDOW AGAIN WITH CURRENT DATA vvvvvvvvvvvvvvvvvvvvvvv
                .then(() => {
                    return dbCalls.getPlaces()
                })
                .then((result) => {
                    document.querySelector("#listOfPlaces").innerHTML = "";
                    makePlace(result)
                })
            }
        },
    //vvvvvvvvvvvvvvvvv THIS CALLS ON DATABASE MANAGER TO DELETE THE MESSAGE BASED ON ID vvvvvvvvvvvvvvvvvvvvvvv
    deleteMessage: {
        value: (id) => {
            dbCalls.deletePlace(id);
        },
    },
    //vvvvvvvvvvvvvvvvv THIS CALLS ON DATABASE MANAGER TO EDIT A PREVIOUSLY POSTED MESSAGE vvvvvvvvvvvvvvvvvvvvvvv
    editMessage: {
        value: (id) => {
            let editDiv = $("<div></div>").attr("id", `editBlock--${id}`);
            let editPlaceTitle = $("<h3></h3>").text("Edit Your Message");
            let editPlaceNameLable = $("<label>Name:</label>").attr("for", "placeNameLable");
            let editPlaceName = $("<input></input>").attr("id", `editPlaceName--${id}`).attr("placeholder", "Edit Name of Place");
            let editPlaceTypeLable = $("<label>Type:</label>").attr("for", "placeTypeLable");
            let editPlaceType = $("<input></input>").attr("id", `editPlaceType--${id}`).attr("placeholder", "Edit Type of Place");
            let editPlaceLocationLable = $("<label>Location:</label>").attr("for", "placeLocationLable");
            let editPlaceLocation = $("<input></input>").attr("id", `editPlaceLocation--${id}`).attr("placeholder", "Edit Location of Place");
            let confirmEditButton = $("<button>Confirm Edit</button>").attr("id", `confirmEditButton--${id}`).attr("class", `confirmEdit btn btn-sm btn-outline-secondary`);
            let cancelEditButton = $("<button>Cancel Edit</button>").attr("id", `cancelEditButton--${id}`).attr("class", `cancelEdit btn btn-sm btn-outline-secondary`);
            editDiv.append(editPlaceTitle, editPlaceNameLable, editPlaceName, editPlaceTypeLable, editPlaceType, editPlaceLocationLable, editPlaceLocation, confirmEditButton, cancelEditButton);
            $(`#placeBox--${id}`).append(editDiv);
        }
    },
    postEditedMessage: {
        value: (id) => {
            const entryEdit = {
                name: document.querySelector(`#editPlaceName--${id}`).value,
                type: document.querySelector(`#editPlaceType--${id}`).value,
                location: document.querySelector(`#editPlaceLocation--${id}`).value,
            }
            dbCalls.editPlace(id, entryEdit)
                .then(() => {
                    return dbCalls.getPlaces()
                })
                .then((result) => {
                    document.querySelector("#listOfPlaces").innerHTML = "";
                    makePlace(result)
                })
            }
        }
})

module.exports = places