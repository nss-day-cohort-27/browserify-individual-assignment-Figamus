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
    // deleteButton: () => {document.querySelector("body").addEventListener("click", (evt) => {
    //     //console.log(evt)
    //     // console.log(evt.target.id)
    //     if (evt.target.id.includes(`deletechatButton--${evt.target.id.split("--")[1]}`)) {
    //         console.log("delete button clicked");
    //         const id = parseInt(evt.target.id.split("--")[1]);
    //         console.log(id);
    //         event.target.parentElement.remove();
    //         chat.deleteMessage(id)
    //     }
    // })
    // },
//vvvvvvvvvvvvvvvvv THIS IS THE EVENT LISTERNER FOR EDITING THE EXISTING CHAT vvvvvvvvvvvvvvvvvvvvvvv
    // editButton: () => {document.querySelector("body").addEventListener("click", (evt) => {
    //     // console.log(evt)
    //     // console.log(evt.target.id)
    //     if (evt.target.id.includes(`editchatButton--${evt.target.id.split("--")[1]}`)) {
    //         console.log("edit button clicked");
    //         const id = parseInt(evt.target.id.split("--")[1]);
    //         chat.editMessage(id)
    //     }
    // })
    // },
    // saveEditButton: () => {document.querySelector("body").addEventListener("click", (evt) => {
    //     // console.log(evt)
    //     // console.log(evt.target.id)
    //     if (evt.target.id.includes(`confirmEdit--${evt.target.id.split("--")[1]}`)) {
    //         console.log("save edit button clicked");
    //         const id = parseInt(evt.target.id.split("--")[1]);
    //         chat.postEditedMessage(id)
    //     }
    // })
    // }
}

module.exports = eventListeners;