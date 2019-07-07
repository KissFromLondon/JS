const Priority = {
  LOW: 0,
  NORMAL: 1,
  HIGH: 2
};

const notepad = {
  notes: [],
  getNotes() {
    return this.notes;
    /*
     * Принимает: ничего
     * Возвращает: все заметки, значение свойства notes
     */
  },
  findNoteById(id) {
    for (let i = 0; i < this.notes.length; i += 1) {
      //   if (this.notes[i].id === id) {
      //     return this.notes[i];
      //   } else return undefined;
      // }

      this.notes.find(id => this.notes[i].id === id)
        ? this.notes[i]
        : undefined;
      /*
       * Ищет заметку в массиве notes
       *
       * Принимает: идентификатор заметки
       * Возвращает: заметку с совпавшим полем id или undefined если ничего не найдено
       */
    }
  },
  saveNote(note) {
    this.notes.push(note);
    return note;
    /*
     * Сохраняет заметку в массив notes
     *
     * Принимает: объект заметки
     * Возвращает: сохраненную заметку
     */
  },
  deleteNote(id) {
    for (let i = 0; i < this.notes.length; i += 1) {
      if (this.notes[i].id === id) {
        // delete this.notes[i];
        this.notes.splice(i, 1);
      }
    }

    /*
     * Удаляет заметку по идентификатору из массива notes
     *
     * Принимает: идентификатор заметки
     * Возвращает: ничего
     */
  },
  updateNoteContent(id, ...theArgs) {
    //   updateNoteContent(id, upNote) {
    //     const current = this.findNoteById(id);
    //     if (current) {
    //       Object.assign(current, upNote);
    //     }
    //   },

    for (let i = 0; i < this.notes.length; i += 1) {
      if (this.notes[i].id === id) {
        for (const key in this.notes[i]) {
          //перебор ключей в исходном объекте
          // console.log(key);
          const keys = Object.keys(theArgs[0]); //ключи в объекте аргумента
          // console.log(keys);
          if (key == keys) {
            this.notes[i][key] = theArgs[0].title; //присваиваем значение
            //   console.log(this.notes[i]);
            //console.log(this.notes[i].key[0]);
            return this.notes[i]; // ура :)
          }
        }
      }
    }
    /*
     * Обновляет контент заметки
     * updatedContent - объект с полями вида {имя: значение, имя: значение}
     * Свойств в объекте updatedContent может быть произвольное количество
     *
     * Принимает: идентификатор заметки и объект, полями которого надо обновить заметку
     * Возвращает: обновленную заметку
     */
  },
  updateNotePriority(id, newPriority) {
    for (let i = 0; i < this.notes.length; i += 1) {
      //   if (this.notes[i].id === id) {
      //     this.notes[i].priority = newPriority;
      //     return this.notes[i];
      //   }
      // }
      this.findNoteById(id);
      this.notes[i].priority = newPriority;
      return this.notes[i];
      /*
       * Обновляет приоритет заметки
       *
       * Принимает: идентификатор заметки и ее новый приоритет
       * Возвращает: обновленную заметку
       */
    }
  },
  filterNotesByQuery(query) {
    // for (let i = 0; i < this.notes.length; i += 1) {
    //   let newArray = [];
    //   if (
    //     this.notes[i].title
    //       .toLowerCase()
    //      // .split(" ")
    //       .includes(query) ||
    //     this.notes[i].body
    //       .toLowerCase()
    //       //.split(" ")
    //       .includes(query)
    //   ) {
    //     newArray.push(this.notes[i]);
    //     return newArray;
    //   }
    return this.notes.filter(
      e =>
        e.title.toLowerCase().includes(query.toLowerCase()) ||
        e.body.toLowerCase().includes(query.toLowerCase())
    );
    // let toLowerTitle = this.notes[i].title.toLowerCase();
    // let toLowerBody = this.notes[i].body.toLowerCase();
    // let generalNotes = this.notes;
    // let newArray = [];
    // let toLowerTitleSplit = toLowerTitle.split(" ");
    // let toLowerBodySplit = toLowerBody.split(" ");
    // const newArray = this.notes.filter(function() {
    //   for (let i = 0; i < toLowerTitleSplit.length; i += 1){
    //     if (toLowerTitleSplit[i] == input || toLowerBodySplit[i] == input) {
    //        newArray.push(toLowerTitleSplit[i]);
    //        newArray.push(toLowerBodySplit[i]);
    //        console.log(newArray);
    //     }
    //   }

    //  console.log(toLowerTitle.indexOf(query) > -1);
    //  return (toLowerTitle.indexOf(query) > -1 || toLowerBody.indexOf(query) > -1);
    //   return (toLowerTitle == query || toLowerBody == query);
    //    return (this.notes[i].body.toLowerCase() === query || this.notes[i].title.toLowerCase() === query);
    //   }
    // }
    //  });
    /*
     * Фильтрует массив заметок по подстроке query.
     * Если значение query есть в заголовке или теле заметки - она подходит
     *
     * Принимает: подстроку для поиска в title и body заметки
     * Возвращает: новый массив заметок, контент которых содержит подстроку
     */
    //  }
  },
  filterNotesByPriority(priority) {
    let newArray = [];
    for (let i = 0; i < this.notes.length; i += 1) {
      if (this.notes[i].priority === priority) {
        newArray.push(this.notes[i]);
        return newArray;
      }
    }
    /*
     * Фильтрует массив заметок по значению приоритета
     * Если значение priority совпадает с приоритетом заметки - она подходит
     *
     * Принимает: приоритет для поиска в свойстве priority заметки
     * Возвращает: новый массив заметок с подходящим приоритетом
     */
  }
};

/*
 * Добавляю 4 заметки и смотрю что получилось
 */
notepad.saveNote({
  id: "id-1",
  title: "JavaScript essentials",
  body:
    "Get comfortable with all basic JavaScript concepts: variables, loops, arrays, branching, objects, functions, scopes, prototypes etc",
  priority: Priority.HIGH
});

notepad.saveNote({
  id: "id-2",
  title: "Refresh HTML and CSS",
  body:
    "Need to refresh HTML and CSS concepts, after learning some JavaScript. Maybe get to know CSS Grid and PostCSS, they seem to be trending.",
  priority: Priority.NORMAL
});

notepad.saveNote({
  id: "id-3",
  title: "Get comfy with Frontend frameworks",
  body:
    "First must get some general knowledge about frameworks, then maybe try each one for a week or so. Need to choose between React, Vue and Angular, by reading articles and watching videos.",
  priority: Priority.NORMAL
});

notepad.saveNote({
  id: "id-4",
  title: "Winter clothes",
  body:
    "Winter is coming! Need some really warm clothes: shoes, sweater, hat, jacket, scarf etc. Maybe should get a set of sportwear as well so I'll be able to do some excercises in the park.",
  priority: Priority.LOW
});

console.log("Все текущие заметки: ", notepad.getNotes());

/*
 * Зима уже близко, пора поднять приоритет на покупку одежды
 */
notepad.updateNotePriority("id-4", Priority.NORMAL);

console.log(
  "Заметки после обновления приоритета для id-4: ",
  notepad.getNotes()
);

/*
 * Решил что фреймворки отложу немного, понижаю приоритет
 */
notepad.updateNotePriority("id-3", Priority.LOW);

console.log(
  "Заметки после обновления приоритета для id-3: ",
  notepad.getNotes()
);

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
  notepad.filterNotesByPriority(Priority.NORMAL)
);

/*
 * Обновим контент заметки с id-3
 */
notepad.updateNoteContent("id-3", {
  title: "Get comfy with React.js or Vue.js"
});

console.log(
  "Заметки после обновления контента заметки с id-3: ",
  notepad.getNotes()
);

/*
 * Повторил HTML и CSS, удаляю запись c id-2
 */
notepad.deleteNote("id-2");
console.log("Заметки после удаления с id -2: ", notepad.getNotes());
