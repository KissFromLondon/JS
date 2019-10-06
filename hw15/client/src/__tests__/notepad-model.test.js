import Notepad from "../js/utils/notepad-model";
//import { deleteNote } from "../api";
const notesFromDB = require('../../../server/db.json');
const { getNotes, deleteNote } = require('../api');

test(' get notes ', async () => {
    const init = await getNotes();
    const notepad = new Notepad(init);
    expect(notepad._notes).toEqual(notesFromDB.notes);
}
);

test(' findNoteById ', async () => {
    const init = await getNotes();
    const notepad = new Notepad(init);
    const testedNote = notesFromDB.notes[0];
    expect(notepad.findNoteById('QMom9q4Ku')).toEqual(testedNote);
});

describe(' save note ', () => {
    beforeAll(() => {
        console.log('test save note start ');
    });
    test(' save note ', () => {
    let title, body, priority, target;
    const notepad = new Notepad();
     ({ title, body, priority } = notesFromDB.notes[2]);
     target = {
         title,
         body,
         priority
     };

     expect(
         notepad.saveNote(target).then(note => {
             ({ title, body, priority } = note);
             const source = {
                title, 
                body, 
                priority
             };
             return source;    
         })
     ).resolves.toEqual(target);

     afterAll(() => {
         getNotes().then(data => {
           const { id } = data[data.length - 1];
           notepad.deleteNote(id);
         })
     })
    });
});


describe(' delete note ', () => {
    beforeAll(() => {
        console.log('test delete note start ');
    });

test(' delete note ', async () => {
    let title, body, priority, noteId;
    const init = await getNotes();
    const notepad = new Notepad(init);
    const targetNote = notesFromDB.notes.length - 1;
    ({ title, body, priority, noteId } = targetNote);
    const targetNoteId = noteId;
    const newNotesTest = (targetNoteId) => {
    notepad._notes = notepad._notes.filter(e => e.id !== targetNoteId);
    return notepad._notes;
    };

    notepad.deleteNote(targetNoteId);
    const newNotesDB = await getNotes();
    expect(newNotesDB).toEqual(newNotesTest());
})
});