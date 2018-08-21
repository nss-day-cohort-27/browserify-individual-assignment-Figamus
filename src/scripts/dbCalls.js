dbCalls = {
    getPlaces: () => {
        return fetch("http://localhost:8088/places")
        .then(response => response.json())
    },
    savePlace: (entry) => {
        return fetch("http://localhost:8088/places", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(entry)
        })
    },
    deletePlace: (id) => {
        return fetch(`http://localhost:8088/places/${id}`, {
            method: "DELETE"
        })
        .then(r => r.json())
    },
    editPlace: (id, updatedMessage) => {
        return fetch(`http://localhost:8088/places/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedMessage)
        })
        .then(response => response.json())
    }
};

module.exports = dbCalls;