const baseURL = "http://localhost:3030/notes";
export { getNotes, getNotesByID, deleteNote, saveNote, updateNotePatch, updatePriority };

function getNotes() {
    return fetch(baseURL)
    .then(response => response.json())
    .catch(console.warn());
}

function getNotesByID(id) {
    return fetch(baseURL + `/${id}`)
    .then(console.log)
    .catch(console.warn());
}

function deleteNote(id) {
    const options = {
        method: "DELETE"
    }
    return fetch(baseURL + `/${id}`, options)
    .then()
    .catch(console.warn());
}

function saveNote(data) {
    const body = JSON.stringify(data);
    const options = {
        method: "POST",
        body,
        headers: {
            "Content-Type": "application/json"
        }
    };
    return fetch(baseURL, options)
    .then(data => {
    console.log(data);
    return data;
})
    .catch(console.warn());
}

// function updateNotePut(id, data) {
//     const body = JSON.stringify(data);
//     const options = {
//         method: "PUT",
//         body,
//         headers: {
//             "Content-Type": "application/json"
//         }
//     };
//     return fetch(baseURL + `/${id}`, options)
//     .then(console.log)
//     .catch(console.warn());
// }

function updateNotePatch(id, data) {
    const body = JSON.stringify(data);
    const options = {
        method: "PATCH",
        body,
        headers: {
            "Content-Type": "application/json"
        }
    };
    return fetch(baseURL + `/${id}`, options)
    .then(console.log)
    .catch(console.warn());
}

function updatePriority(id, newPriority) {
    const priority = JSON.stringify(newPriority);
    const options = {
        method: "PATCH",
        priority,
        headers: {
            "Content-Type": "application/json"
        }
    };
    return fetch(baseURL + `/${id}`, options)
    .then(console.log)
    .catch(console.warn());
}


