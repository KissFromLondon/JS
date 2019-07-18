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

  static Priority = {
    LOW: 0,
    NORMAL: 1,
    HIGH: 2
  };
  /*
   * Перенеси свойства и методы конструктора в класс
   *
   * Замени метод getNotes геттером, чтобы можно было обратиться как notepad.notes,
   * для этого создай свойство _notes, в котором храни массив заметок,
   * а геттер notes возвращает значение этого поля
   *
   * Добавь статическое свойство Priority используя ключевое слово static
   */
}

// // Конструктор Notepad при инициализации принимает массив заметок
// const Notepad = function Notepad(notes = []) {
//   this.notes = notes;
//   // Перенеси свойства и методы объекта notepad в конструктор
// };
// //методы
// Notepad.prototype.getNotes = function() {
//   return this.notes;
// };
// Notepad.prototype.findNoteById = function(id) {
//   return this.notes.find(elem => elem.id === id);
// };
// Notepad.prototype.saveNote = function(note) {
//   this.notes.push(note);
//   return note;
// };
// Notepad.prototype.deleteNote = function(id) {
//   this.findNoteById(id);
//   const i = this.notes.findIndex(elem => elem.id === id);
//   this.notes.splice(i, 1);
// };
// Notepad.prototype.updateNoteContent = function(id, newContent) {
//   const currentNote = this.findNoteById(id);
//   if (currentNote) {
//     Object.assign(currentNote, newContent);
//   }
//   return currentNote;
// };
// Notepad.prototype.updateNotePriority = function(id, newPriority) {
//   const currentNote = this.findNoteById(id);
//   currentNote.priority = newPriority;
//   return currentNote;
// };
// Notepad.prototype.filterNotesByQuery = function(query) {
//   return this.notes.filter(
//     e =>
//       e.title.toLowerCase().includes(query.toLowerCase()) ||
//       e.body.toLowerCase().includes(query.toLowerCase())
//   );
// };
// Notepad.prototype.filterNotesByPriority = function(priority) {
//   let newArray = [];
//   let currentPriority = this.notes.find(elem => elem.priority === priority);
//  newArray.push(currentPriority);
//      return newArray;
// };
// // Добавляем статическое свойство, в котором храним приоритеты.
// Notepad.Priority = {
//   LOW: 0,
//   NORMAL: 1,
//   HIGH: 2
// };

//-------------------------------------------------проверка

const initialNotes = [
  {
    id: "id-1",
    title: "JavaScript essentials",
    body:
      "Get comfortable with all basic JavaScript concepts: variables, loops, arrays, branching, objects, functions, scopes, prototypes etc",
    priority: Notepad.Priority.HIGH
  },
  {
    id: "id-2",
    title: "Refresh HTML and CSS",
    body:
      "Need to refresh HTML and CSS concepts, after learning some JavaScript. Maybe get to know CSS Grid and PostCSS, they seem to be trending.",
    priority: Notepad.Priority.NORMAL
  }
];

const notepad = new Notepad(initialNotes);

/*
  Смотрю что у меня в заметках после инициализации
*/
console.log("Все текущие заметки: ", notepad.notes);

/*
 * Добавляю еще 2 заметки и смотрю что получилось
 */
notepad.saveNote({
  id: "id-3",
  title: "Get comfy with Frontend frameworks",
  body:
    "First must get some general knowledge about frameworks, then maybe try each one for a week or so. Need to choose between React, Vue and Angular, by reading articles and watching videos.",
  priority: Notepad.Priority.NORMAL
});

notepad.saveNote({
  id: "id-4",
  title: "Winter clothes",
  body:
    "Winter is coming! Need some really warm clothes: shoes, sweater, hat, jacket, scarf etc. Maybe should get a set of sportwear as well so I'll be able to do some excercises in the park.",
  priority: Notepad.Priority.LOW
});

console.log("Все текущие заметки: ", notepad.notes);

/*
 * Зима уже близко, пора поднять приоритет на покупку одежды
 */
notepad.updateNotePriority("id-4", Notepad.Priority.NORMAL);

console.log("Заметки после обновления приоритета для id-4: ", notepad.notes);

/*
 * Решил что фреймворки отложу немного, понижаю приоритет
 */
notepad.updateNotePriority("id-3", Notepad.Priority.LOW);

console.log("Заметки после обновления приоритета для id-3: ", notepad.notes);

/*
 * Решил отфильтровать заметки по слову html
 */
console.log(
  'Отфильтровали заметки по ключевому слову "html": ',
  notepad.filterNotesByQuery("html")
);

/*
 * Решил отфильтровать заметки по слову javascript
 */
console.log(
  'Отфильтровали заметки по ключевому слову "javascript": ',
  notepad.filterNotesByQuery("javascript")
);

/*
 * Хочу посмотреть только заметки с нормальным приоритетом
 */
console.log(
  "Отфильтровали заметки по нормальному приоритету: ",
  notepad.filterNotesByPriority(Notepad.Priority.NORMAL)
);

/*
 * Обновим контент заметки с id-3
 */
notepad.updateNoteContent("id-3", {
  title: "Get comfy with React.js or Vue.js"
});

console.log(
  "Заметки после обновления контента заметки с id-3: ",
  notepad.notes
);

/*
 * Повторил HTML и CSS, удаляю запись c id-2
 */
notepad.deleteNote("id-2");
console.log("Заметки после удаления с id -2: ", notepad.notes);
