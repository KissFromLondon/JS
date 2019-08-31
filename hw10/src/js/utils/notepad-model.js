export default class Notepad {
    constructor(notes = []) {
      this._notes = notes;
    }
    get notes() {
      return this._notes;
    }
  
    findNoteById(id) {
      return this._notes.find(elem => elem.id === id);
    }
  
    saveNote(note) {
      this._notes.push(note);
      return note;
    }
  
    deleteNote(id) {
      this.findNoteById(id);
      const i = this._notes.findIndex(elem => elem.id === id);
      this._notes.splice(i, 1);
    }
  
    updateNoteContent(id, newContent) {
      const currentNote = this.findNoteById(id);
      if (currentNote) {
        Object.assign(currentNote, newContent);
      }
      return currentNote;
    }
  
    updateNotePriority(id, newPriority) {
      const currentNote = this.findNoteById(id);
      currentNote.priority = newPriority;
      return currentNote;
    }
  
    filterNotesByQuery(query) {
      return this._notes.filter(
        e =>
          e.title.toLowerCase().includes(query.toLowerCase()) ||
          e.body.toLowerCase().includes(query.toLowerCase())
      );
    }
  
    filterNotesByPriority(priority) {
      let newArray = [];
      let currentPriority = this._notes.find(elem => elem.priority === priority);
      newArray.push(currentPriority);
      return newArray;
    }
  }
