import MicroModal from 'micromodal';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import noteTemplate from '../../templates/note.hbs';
import { PRIORITY_TYPES, NOTIFICATION_MESSAGES, NOTE_ACTIONS } from './constants';
import Notepad from "./notepad-model";
import { updateNotePatch } from '../../api';

MicroModal.init();
const notyf = new Notyf();
const notepad = new Notepad();
notepad.notes.then(notes => renderNoteList(refs.list, notes));

export const state = { note: null };

export const refs = {
    list: document.querySelector(".note-list"),
    button: document.querySelector(".action"),
    editor: document.querySelector(".note-editor"),
    search: document.querySelector(".search-form"),
    editorSave: document.querySelector('.modal__btn[type="submit"]'),
    title: document.querySelector('input[name="note_title"]'),
    body: document.querySelector('textarea[name="note_body"]')
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
    const priority = PRIORITY_TYPES.LOW;
    const newNote = noteTemplate({ title, body });
    refs.list.insertAdjacentHTML('beforeend', newNote);
    notepad.saveNote({ title, body, priority });
}

export const handleEditorSubmit = event => {
    const [title, body] = event.target.elements;
    const titleValue = title.value;
    const bodyValue = body.value;
    event.preventDefault();
    if (titleValue.trim() === "" || bodyValue.trim() === "") {
        return notyf.error('Вы должны заполнить все поля!');
    } else if (!state.note) {
        event.currentTarget.reset();
        notyf.success("Заметка успешно добавлена!");
        MicroModal.close('note-editor-modal');
        return addNote(titleValue, bodyValue);
    } else if (state.note) {
        updateData();
    }
};

export const handleFilterNotes = ({ target }) => {
    const inputVal = target.value;
    const filteredArrays = notepad.filterNotesByQuery(inputVal);
    renderNoteList(refs.list, filteredArrays);
};

export const removeListItem = ({ target }) => {
    const action = target.closest("button").dataset.action;
    const parentListItemID = target.closest(".note-list__item").getAttribute("data-id");
    const parentListItem = target.closest(".note-list__item");
    if (action === NOTE_ACTIONS.DELETE) {
        notepad.deleteNote(parentListItemID);
        parentListItem.remove();
        notyf.success("Заметка успешно удалена!");
    };
};

export const updateNotePriority = ({ target }) => {
    const li = target.closest('.note-list__item');
    const action = target.closest("button").dataset.action;
    const { id } = li.dataset;
    const note = notepad.findNoteById(id);
    const currentPriority = note.priority;
    let priorityOnPage = li.querySelector('.note__priority');

    if (action === NOTE_ACTIONS.INCREASE_PRIORITY) {
        if (currentPriority < 2) {
            const updatedPriority = currentPriority + 1;
            notepad.updateNotePriority(id, updatedPriority);
            priorityOnPage.innerHTML = `Priority: ${updatedPriority}`;
        }
    } else if (action === NOTE_ACTIONS.DECREASE_PRIORITY) {
        if (currentPriority > 0) {
            const updatedPriority = currentPriority - 1;
            notepad.updateNotePriority(id, updatedPriority);
            priorityOnPage.innerHTML = '';
            priorityOnPage.innerHTML = `Priority: ${updatedPriority}`;
        }
    }
};

export function editData({ target }) {
    if (target.nodeName !== 'I') return;
    if (target.parentNode.dataset.action === 'edit-note') {
        const li = target.closest('.note-list__item');
        const { id } = li.dataset;
        const note = notepad.findNoteById(id);
        const { title, body } = note;
        refs.title.value = title;
        refs.body.value = body;
        state.note = note;
        MicroModal.show('note-editor-modal');
        refs.title.value = '';
        refs.body.value = '';
    }
}

export function updateData() {
    const title = refs.title.value;
    const body = refs.body.value;
    state.note.title = title;
    state.note.body = body;
    const { id } = state.note;
    notepad.updateNoteContent(id, { title, body }).then(data => {
        notyf.success("Заметка успешно добавлена!");
        refs.title.value = '';
        refs.body.value = '';
        MicroModal.close('note-editor-modal');
        notepad.notes.then(notes => renderNoteList(refs.list, notes))
        state.note = null;
    });
}

refs.list.addEventListener('click', editData);
refs.editor.addEventListener('submit', handleEditorSubmit);
refs.search.addEventListener("keyup", handleFilterNotes);
refs.list.addEventListener("click", removeListItem);
refs.list.addEventListener('click', updateNotePriority);