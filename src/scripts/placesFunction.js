const makePlace = require("makePlace.js");
const dbCalls = require("dbCalls.js");

const places = Object.create(null, {
    //vvvvvvvvvvvvvvvvv CreateWindow MAKES THE HTML FOR PLACES WITH CURRENT DATA vvvvvvvvvvvvvvvvvvvvvvv
    createWindow: {
        value: () => {
            console.log("Create Chat Window");
            let title = $("<h3></h3>").text("Favorite Places");
            let placeNameLable = $("<label>Name:</label>").attr("for", "placeNameLable");
            let placeName = $("<input></input>").attr("id", "placeName").attr("placeholder", "Name of Place");
            let placeTypeLable = $("<label>Type:</label>").attr("for", "placeTypeLable");
            let placeType = $("<input></input>").attr("id", "placeType").attr("placeholder", "Type of Place");
            let placeLocationLable = $("<label>Location:</label>").attr("for", "placeLocationLable");
            let placeLocation = $("<input></input>").attr("id", "placeLocation").attr("placeholder", "Location of Place");
            let postButton = $("<button>Post</button>").attr("id", "postButton").attr("class", "btn btn-sm btn-outline-secondary");
            let listOfPlaces = $("<div></div>").attr("id", "listOfPlaces").attr("class", "row");
            $("#mainDiv").append(title, placeNameLable, placeName, placeTypeLable, placeType, placeLocationLable, placeLocation, postButton, listOfPlaces);
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
            let newDiv = $("<div></div>").attr("id", `editBlock--${id}`);
            let editTitle = $("<h3></h3>").text("Edit Your Message");
            let editMessageArea = $("<textarea></textarea>").attr("id", "editMessageArea");
            let editButton = $("<button>Confirm Edit</button>").attr("id", `confirmEdit--${id}`);
            newDiv.append(editTitle, editMessageArea, editButton);
            $(`#messageBox--${id-1}`).append(newDiv);
        }
    },
    postEditedMessage: {
        value: (id) => {
            const entryEdit = {
                message: document.querySelector("#editMessageArea").value,
            }
            dbCalls.editPlace(id, entryEdit)
                .then(() => {
                    return dbCalls.getPlaces()
                })
                .then((result) => {
                    document.querySelector("#chatHistory").innerHTML = "";
                    makeChat(result)
                })
            }
        }
})

module.exports = places