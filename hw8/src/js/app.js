'use strict';

const PRIORITY_TYPES = {
  LOW: 0,
  NORMAL: 1,
  HIGH: 2,
};

const ICON_TYPES = {
  EDIT: 'edit',
  DELETE: 'delete',
  ARROW_DOWN: 'expand_more',
  ARROW_UP: 'expand_less',
};

const NOTE_ACTIONS = {
  DELETE: 'delete-note',
  EDIT: 'edit-note',
  INCREASE_PRIORITY: 'increase-priority',
  DECREASE_PRIORITY: 'decrease-priority',
};

const initialNotes = [
  {
    id: 'id-1',
    title: 'JavaScript essentials',
    body:
      'Get comfortable with all basic JavaScript concepts: variables, loops, arrays, branching, objects, functions, scopes, prototypes etc',
    priority: PRIORITY_TYPES.HIGH,
  },
  {
    id: 'id-2',
    title: 'Refresh HTML and CSS',
    body:
      'Need to refresh HTML and CSS concepts, after learning some JavaScript. Maybe get to know CSS Grid and PostCSS, they seem to be trending.',
    priority: PRIORITY_TYPES.NORMAL,
  },
  {
    id: 'id-3',
    title: 'Get comfy with Frontend frameworks',
    body:
      'First should get some general knowledge about frameworks, then maybe try each one for a week or so. Need to choose between React, Vue and Angular, by reading articles and watching videos.',
    priority: PRIORITY_TYPES.NORMAL,
  },
  {
    id: 'id-4',
    title: 'Winter clothes',
    body:
      "Winter is coming! Need some really warm clothes: shoes, sweater, hat, jacket, scarf etc. Maybe should get a set of sportwear as well so I'll be able to do some excercises in the park.",
    priority: PRIORITY_TYPES.LOW,
  },
];

class Notepad {
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

  // static Priority = {
  //   LOW: 0,
  //   NORMAL: 1,
  //   HIGH: 2,
  // };
}

const notepad = new Notepad(initialNotes);
console.log('Все текущие заметки: ', notepad.notes);

const createListItem = ({ id, title, body }) => {
  const listItem = document.createElement('li');
  listItem.classList.add('note-list__item');
  listItem.dataset.id = id;

  //вызываем функции
  listItem.append(createNoteContent(title, body));
  return listItem;
};

const createNoteContent = (title, body) => {
  const note = document.createElement('div');
  note.classList.add('note');

  const noteContent = document.createElement('div');
  noteContent.classList.add('note__content');

  const noteTitle = document.createElement('h2');
  noteTitle.classList.add('note__title');
  noteTitle.textContent = title;
  //noteTitle.textContent = 'Lorem, ipsum dolor.';

  const noteBody = document.createElement('p');
  noteBody.classList.add('note__body');
  noteBody.textContent = body;
  //noteBody.textContent =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus libero atque, sint quas impedit est illum labore veniam aspernatur neque nostrum aliquam dicta blanditiis. Esse porro impedit ratione soluta amet?';

  note.appendChild(noteContent);
  noteContent.appendChild(noteTitle);
  noteContent.appendChild(noteBody);
  note.appendChild(createNoteFooter());

  return note;
};

const createNoteFooter = priority => {
  const footer = document.createElement('footer');
  footer.classList.add('note__footer');

  const noteSection = document.createElement('section');
  noteSection.classList.add('note__section');

  const notePriority = document.createElement('span');
  notePriority.classList.add('note__priority');
  notePriority.textContent = 'Priority: Low';

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

const createNoteSection = (priority1, text1, priority2, text2) => {
  const noteSection = document.createElement('section');
  noteSection.classList.add('note__section');

  noteSection.appendChild(createActionButton(priority1, text1));
  noteSection.appendChild(createActionButton(priority2, text2));
  return noteSection;
};

const createActionButton = (priority, text) => {
  const actionButton = document.createElement('button');
  actionButton.classList.add('action');
  actionButton.dataset.action = priority;

  const actionIcon = document.createElement('i');
  actionIcon.classList.add('material-icons');
  actionIcon.classList.add('action__icon');
  actionIcon.textContent = text;

  actionButton.appendChild(actionIcon);
  return actionButton;
};

const renderNoteList = (listRef, notes) => {
  const listItems = initialNotes.map(item => createListItem(item));
  //console.log(listItems);
  listRef.append(...listItems);
};

const list = document.querySelector('.note-list');
renderNoteList(list, initialNotes);
