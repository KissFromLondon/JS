import initialNotes from "./initial-notes";
import { PRIORITY_TYPES, ICON_TYPES, NOTE_ACTIONS } from "./constants";
import Notepad from "./notepad-model";
import shortid from "shortid";

export const createListItem = ({ id, title, body }) => {
    const listItem = document.createElement("li");
    listItem.classList.add("note-list__item");
    listItem.dataset.id = id;

    listItem.append(createNoteContent(title, body));
    return listItem;
};

export const createNoteContent = (title, body) => {
    const note = document.createElement("div");
    note.classList.add("note");

    const noteContent = document.createElement("div");
    noteContent.classList.add("note__content");

    const noteTitle = document.createElement("h2");
    noteTitle.classList.add("note__title");
    noteTitle.textContent = title;

    const noteBody = document.createElement("p");
    noteBody.classList.add("note__body");
    noteBody.textContent = body;

    note.appendChild(noteContent);
    noteContent.appendChild(noteTitle);
    noteContent.appendChild(noteBody);
    note.appendChild(createNoteFooter());

    return note;
};

export const createNoteFooter = priority => {
    const footer = document.createElement("footer");
    footer.classList.add("note__footer");

    const noteSection = document.createElement("section");
    noteSection.classList.add("note__section");

    const notePriority = document.createElement("span");
    notePriority.classList.add("note__priority");
    notePriority.textContent = "Priority: Low";

    footer
        .appendChild(
            createNoteSection(
                NOTE_ACTIONS.DECREASE_PRIORITY,
                ICON_TYPES.ARROW_DOWN,
                NOTE_ACTIONS.INCREASE_PRIORITY,
                ICON_TYPES.ARROW_UP
            )
        )
        .append(notePriority);

    footer.appendChild(
        createNoteSection(
            NOTE_ACTIONS.EDIT,
            ICON_TYPES.EDIT,
            NOTE_ACTIONS.DELETE,
            ICON_TYPES.DELETE
        )
    );

    return footer;
};

export const createNoteSection = (priority1, text1, priority2, text2) => {
    const noteSection = document.createElement("section");
    noteSection.classList.add("note__section");

    noteSection.appendChild(createActionButton(priority1, text1));
    noteSection.appendChild(createActionButton(priority2, text2));
    return noteSection;
};

export const createActionButton = (priority, text) => {
    const actionButton = document.createElement("button");
    actionButton.classList.add("action");
    actionButton.dataset.action = priority;

    const actionIcon = document.createElement("i");
    actionIcon.classList.add("material-icons");
    actionIcon.classList.add("action__icon");
    actionIcon.textContent = text;

    actionButton.appendChild(actionIcon);
    return actionButton;
};

export const renderNoteList = (listRef, notes) => {
    const listItems = notes.map(item => createListItem(item));
    listRef.innerHTML = "";
    listRef.append(...listItems);
};
//hw9
export const refs = {
    editor: document.querySelector(".note-editor"),
    button: document.querySelector(".button"),
    list: document.querySelector(".note-list"),
    search: document.querySelector(".search-form")
};

export const addListItem = (title, body) => {
    const listItem = createListItem({
        id: id,
        title: title,
        body: body
    });
    refs.list.appendChild(listItem);
};

export const handleEditorSubmit = event => {
    const [title, body] = event.target.elements;
    const titleValue = title.value;
    const bodyValue = body.value;
    event.preventDefault();
    if (titleValue.trim() === "" || bodyValue.trim() === "") {
        event.preventDefault();
        return alert("Необходимо заполнить все поля!");
    } else {
        event.currentTarget.reset();
        return addListItem(titleValue, bodyValue);
    }
};

export const removeListItem = ({ target }) => {
    const action = target.closest("button").dataset.action;
    const parentListItemID = target.closest(".note-list__item").dataset.id;
    const parentListItem = target.closest(".note-list__item");
    if (action === NOTE_ACTIONS.DELETE) {
        notepad.deleteNote(parentListItemID);
        parentListItem.remove();
    };
};

export const filterNotes = ({ target }) => {
    const inputVal = target.value;
    const filteredArrays = notepad.filterNotesByQuery(inputVal);
    renderNoteList(refs.list, filteredArrays);
};

const id = shortid.generate();
const notepad = new Notepad(initialNotes);
refs.editor.addEventListener("submit", handleEditorSubmit);
refs.list.addEventListener("click", removeListItem);
refs.search.addEventListener("keyup", filterNotes);
//refs.list.addEventListener('click', handleListClick);
renderNoteList(refs.list, initialNotes);
