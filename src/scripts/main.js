console.log("Hello main.js");

const places = require("placesFunction.js");
const eventListeners = require("eventListeners.js");


places.createWindow();
eventListeners.postButton();
eventListeners.deleteButton();