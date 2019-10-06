import * as api from "../../api"; 

export default class Notepad {
  constructor(notes = []) {
    this._notes = notes;
  }
  get notes() {
    return api.getNotes().then(notes => {
          this._notes = notes;
          return this._notes;
          });
  }

  findNoteById = id => {
      return this._notes.find(elem => '' + elem.id === id);
  }

  saveNote = note => {
    return api.saveNote(note).then(savedNote => {
      this._notes.push(savedNote);
      return savedNote;
    });
  }

  deleteNote = id => {
    return api.deleteNote(id).then(() => {
    return this._notes = this._notes.filter(e => e.id !== id);
    });
  }

  updateNoteContent = (id, updatedContent) => {
    const note = this.findNoteById(id);
    if (!note) return;
    Object.assign(note, updatedContent);
    return api.updateNotePatch(id, note);
  }
/////////////////// to do tomorrow
  updateNotePriority = (id, newPriority) => {
   return api.updatePriority(id, newPriority).then(() => {
      const currentNote = this.findNoteById(id);
      currentNote.priority = newPriority;
      console.log(currentNote.priority);
      return currentNote;
    });
  }

  filterNotesByQuery = query => {
      const filteredNotes = this._notes.filter(
        e =>
          e.title.toLowerCase().includes(query.toLowerCase()) ||
          e.body.toLowerCase().includes(query.toLowerCase())
      );
      return filteredNotes;
  }

  filterNotesByPriority = priority => {
    new Promise((resolve) => {
      let newArray = [];
      let currentPriority = this._notes.find(elem => elem.priority === priority);
      newArray.push(currentPriority);
      resolve(newArray);
    });
  }
}
