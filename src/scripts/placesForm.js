const makeChat = require("placesHTML.js");
const dbCalls = require("dbCalls.js");

chat = Object.create(null, {
    //vvvvvvvvvvvvvvvvv CreateWindow MAKES THE HTML FOR CHAT & POPULATES WITH CURRENT DATA vvvvvvvvvvvvvvvvvvvvvvv
    createWindow: {
        value: () => {
            console.log("Create Chat Window");
            let txt1 = $("<h3></h3>").text("Chat");
            let chatHistory = $("<div></div>").attr("id", "chatHistory");
            let messageArea = $("<textarea></textarea>").attr("id", "messageArea");
            let postButton = $("<button>Post</button>").attr("id", "postButton");
            $(".chatDiv").append(txt1, chatHistory, messageArea, postButton);
            return dbCalls.getchatMessages()
            .then((response) => {
                makeChat(response)
            })
        }
    },
    //vvvvvvvvvvvvvvvvv postMessage GENERATES AN OBJECT BASED ON CURRENT VALUES OF #messageArea and POSTS IT TO API vvvvvvvvvvvvvvvvvvvvvvv
    postMessage: {
        value: () => {
            let activeUser = JSON.parse(sessionStorage.getItem("session"));
            const newEntry = {
                userId: activeUser.id,
                message: document.querySelector("#messageArea").value,
                date: Date.now(),
            }
            chatDBCalls.savechatMessage(newEntry)
                .then(() => {
                    document.querySelector("#chatHistory").value = "";
                    document.querySelector("#messageArea").value = "";
                })
                //THEN CALLS ON DATABASE MANAGER TO GET DATA AND GENERATE THE CHAT WINDOW AGAIN WITH CURRENT DATA vvvvvvvvvvvvvvvvvvvvvvv
                .then(() => {
                    return chatDBCalls.getchatMessages()
                })
                .then((result) => {
                    document.querySelector("#chatHistory").innerHTML = "";
                    makeChat(result)
                })
            }
        },
    //vvvvvvvvvvvvvvvvv THIS CALLS ON DATABASE MANAGER TO DELETE THE MESSAGE BASED ON ID vvvvvvvvvvvvvvvvvvvvvvv
    deleteMessage: {
        value: (id) => {
            chatDBCalls.deletechatMessage(id);
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
            chatDBCalls.editchatMessage(id, entryEdit)
                .then(() => {
                    return chatDBCalls.getchatMessages()
                })
                .then((result) => {
                    document.querySelector("#chatHistory").innerHTML = "";
                    makeChat(result)
                })
            }
        }
})

module.exports = chat
