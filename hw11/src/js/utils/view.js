import MicroModal from 'micromodal';
import 'notyf/notyf.min.css';
import { Notyf } from 'notyf';
import notes from '../../assets/notes.json'; 
import noteTemplate from '../../templates/note.hbs'; 
import { PRIORITY_TYPES, NOTIFICATION_MESSAGES, NOTE_ACTIONS} from './constants';
import Notepad from "./notepad-model";


MicroModal.init();
const notyf = new Notyf();

export const refs = {
    list: document.querySelector(".note-list"),
    button: document.querySelector(".action"),
    editor: document.querySelector(".note-editor"),
    search: document.querySelector(".search-form")
};

export const createNoteListMarkup = notes => {
    return notes.map(note => noteTemplate(note)).join('');
};

export const renderNoteList = (refs, notes) => {
    const listItems = notes.map(note => noteTemplate(note)).join('');
    refs.innerHTML = "";
    document.querySelector(".note-list").insertAdjacentHTML('beforeend', listItems);
};

 export const addNote = (title, body) => {
     const newNote = noteTemplate({ title, body });
     console.log(newNote);
     refs.list.insertAdjacentHTML('beforeend', newNote);
 }

export const handleEditorSubmit = event => {
    const [title, body] = event.target.elements;
     const titleValue = title.value;
     console.log(titleValue);
     const bodyValue = body.value;
     console.log(bodyValue);
      event.preventDefault();
     if (titleValue.trim() === "" || bodyValue.trim() === ""){
         event.preventDefault();
         return notyf.error('Вы должны заполнить все поля!');
     } else {
         event.currentTarget.reset();
         notyf.success("Заметка успешно добавлена!");
         MicroModal.close('note-editor-modal');
         return addNote(titleValue, bodyValue);
     }
};

export const handleFilterNotes = ({target}) => {
        const inputVal = target.value;
        const filteredArrays = notepad.filterNotesByQuery(inputVal);
        renderNoteList(refs.list, filteredArrays);
        console.log(filteredArrays);
    };

    export const removeListItem = ({ target }) => {
        const action = target.closest("button").dataset.action;
        const parentListItemID = target.closest(".note-list__item").dataset.id;
        const parentListItem = target.closest(".note-list__item");
        if (action === NOTE_ACTIONS.DELETE) {
            notepad.deleteNote(parentListItemID);
            parentListItem.remove();
            notyf.success("Заметка успешно удалена!");
        };
    };

const notepad = new Notepad(notes);
const markup = createNoteListMarkup(notes);
refs.list.insertAdjacentHTML('beforeend', markup);
refs.editor.addEventListener('submit', handleEditorSubmit);
refs.search.addEventListener("keyup", handleFilterNotes);
refs.list.addEventListener("click", removeListItem);
