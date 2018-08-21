const places = require("placesFunction.js");
const dbCalls = require("dbCalls.js");

eventListeners = {
//vvvvvvvvvvvvvvvvv THIS IS THE EVENT LISTERNER FOR THE POST BUTTON vvvvvvvvvvvvvvvvvvvvvvv
    postButton: () => {document.querySelector("body").addEventListener("click", (evt) => {
        let x = evt.target.id;
        if (x === "postButton") {
            console.log("Post Button Function clicked");
            places.postPlace();
        }
    })
    },
//vvvvvvvvvvvvvvvvv THIS IS THE EVENT LISTERNER FOR THE CHAT DELETE vvvvvvvvvvvvvvvvvvvvvvv
    deleteButton: () => {document.querySelector("body").addEventListener("click", (evt) => {
        if (evt.target.id.includes(`deletePlaceButton--${evt.target.id.split("--")[1]}`)) {
            console.log("delete button clicked");
            const id = parseInt(evt.target.id.split("--")[1]);
            console.log(id);
            event.target.parentElement.remove();
            dbCalls.deletePlace(id)
        }
    })
    },
//vvvvvvvvvvvvvvvvv THIS IS THE EVENT LISTERNER FOR EDITING THE EXISTING CHAT vvvvvvvvvvvvvvvvvvvvvvv
    editButton: () => {document.querySelector("body").addEventListener("click", (evt) => {
        if (evt.target.id.includes(`editPlaceButton--${evt.target.id.split("--")[1]}`)) {
            console.log("edit button clicked");
            const id = parseInt(evt.target.id.split("--")[1]);
            places.editMessage(id)
        }
    })
},
//vvvvvvvvvvvvvvvvv THIS IS THE EVENT LISTERNER THAY CANCELS THE EDIT BY DELETING THE PARENT HTML ELEMENT vvvvvvvvvvvvvvvvvvvvvvv
    cancelEditButton: () => {document.querySelector("body").addEventListener("click", (evt) => {
        if (evt.target.id.includes(`cancelEditButton--${evt.target.id.split("--")[1]}`)) {
            event.target.parentElement.remove();
        }
    })
    },
    //vvvvvvvvvvvvvvvvv THIS IS THE EVENT LISTERNER FOR SAVING THE CHANGES vvvvvvvvvvvvvvvvvvvvvvv
    saveEditButton: () => {document.querySelector("body").addEventListener("click", (evt) => {
        if (evt.target.id.includes(`confirmEditButton--${evt.target.id.split("--")[1]}`)) {
            const id = parseInt(evt.target.id.split("--")[1]);
            places.postEditedMessage(id)
        }
    })
    }
}

module.exports = eventListeners;