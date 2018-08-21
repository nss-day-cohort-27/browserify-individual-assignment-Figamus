console.log("Hello main.js");

const places = require("placesFunction.js");
const eventListeners = require("eventListeners.js");


places.createWindow();
eventListeners.postButton();
eventListeners.deleteButton();
eventListeners.editButton();
eventListeners.cancelEditButton();
eventListeners.saveEditButton();