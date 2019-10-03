import axios from "axios";

axios.defaults.baseURL = "http://localhost:3030/notes";
export { getNotes, getNotesByID, deleteNote, saveNote, updateNotePatch, updatePriority };

const getNotes = async () => {
    try {
        const response = await axios.get();
        const data = await response.data;
        return data;
    } catch (error) {
        throw new Error(`Error while requesting ${response.statusText}`);
    }
}

const getNotesByID = async (id) => {
    try {
        const response = await axios.get(`/${id}`);
        const data = await response.data;
        return data;
    } catch (error) {
        throw new Error(`Error while requesting ${response.statusText}`);
    }
}

const deleteNote = async (id) => {
    try {
        const response = await axios.delete(`/${id}`);
        const data = await response.data;
        return data;
    } catch (error) {
        throw new Error(`Error while requesting ${response.statusText}`);
    }
}

const saveNote = async (data) => {
    try {
        const response = await axios.post('', data);
        const data = await response.data;
        return data;
    } catch (error) {
        throw new Error(`Error while requesting ${response.statusText}`);
    }
}

const updateNotePatch = async (id, data) => {
    try {
        const response = await axios.patch(`/${id}`, data)
        const data = await response.data;
        return data;
    } catch (error) {
        throw new Error(`Error while requesting ${response.statusText}`);
    }

}

const updatePriority = async (id, newPriority) => {
    try {
        const response = await axios.patch(`/${id}`, newPriority)
        const data = await response.data;
        return data;
    } catch (error) {
        throw new Error(`Error while requesting ${response.statusText}`);
    }
}


