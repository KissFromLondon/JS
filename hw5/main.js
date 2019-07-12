// Конструктор Notepad при инициализации принимает массив заметок
const Notepad = function Notepad(notes = []) {
    // Перенеси свойства и методы объекта notepad в конструктор
    this.getNotes = function() {
        return notes;
        /*
         * Принимает: ничего
         * Возвращает: все заметки, значение свойства notes
         */
      };
      this.findNoteById = function(id) {
        for (let i = 0; i < notes.length; i += 1) {
          notes.find(id => notes[i].id === id)
            ? console.log(notes[i])
            : undefined;
        }
      };
      this.saveNote = function(note) {
        notes.push(note);
        return note;
        /*
         * Сохраняет заметку в массив notes
         *
         * Принимает: объект заметки
         * Возвращает: сохраненную заметку
         */
      };
      this.deleteNote = function(id) {
        for (let i = 0; i < notes.length; i += 1) {
          if (notes[i].id === id) {
            notes.splice(i, 1);
          }
        }
    
        /*
         * Удаляет заметку по идентификатору из массива notes
         *
         * Принимает: идентификатор заметки
         * Возвращает: ничего
         */
      };
       this.updateNoteContent = function(id, ...theArgs) {
        for (let i = 0; i < notes.length; i += 1) {
          if (notes[i].id === id) {
            for (const key in notes[i]) {
              //перебор ключей в исходном объекте
              const keys = Object.keys(theArgs[0]); //ключи в объекте аргумента
              if (key == keys) {
                notes[i][key] = theArgs[0].title; //присваиваем значение
                return notes[i]; // ура :)
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
      };
      this.updateNotePriority = function(id, newPriority) {
        for (let i = 0; i < notes.length; i += 1) {
          this.findNoteById(id);
          notes[i].priority = newPriority;
          return notes[i];
          /*
           * Обновляет приоритет заметки
           *
           * Принимает: идентификатор заметки и ее новый приоритет
           * Возвращает: обновленную заметку
           */
        }
      };
      this.filterNotesByQuery = function(query) {
        return notes.filter(
          e =>
            e.title.toLowerCase().includes(query.toLowerCase()) ||
            e.body.toLowerCase().includes(query.toLowerCase())
        );
        /*
         * Фильтрует массив заметок по подстроке query.
         * Если значение query есть в заголовке или теле заметки - она подходит
         *
         * Принимает: подстроку для поиска в title и body заметки
         * Возвращает: новый массив заметок, контент которых содержит подстроку
         */
        //  }
      };
      this.filterNotesByPriority = function(priority) {
        let newArray = [];
        for (let i = 0; i < notes.length; i += 1) {
          if (notes[i].priority === priority) {
            newArray.push(notes[i]);
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
      };
    };
  
  // Добавляем статическое свойство, в котором храним приоритеты.
  Notepad.Priority = {
    LOW: 0,
    NORMAL: 1,
    HIGH: 2,
  };


// проверка
  const initialNotes = [
    {
      id: 'id-1',
      title: 'JavaScript essentials',
      body:
        'Get comfortable with all basic JavaScript concepts: variables, loops, arrays, branching, objects, functions, scopes, prototypes etc',
      priority: Notepad.Priority.HIGH,
    },
    {
      id: 'id-2',
      title: 'Refresh HTML and CSS',
      body:
        'Need to refresh HTML and CSS concepts, after learning some JavaScript. Maybe get to know CSS Grid and PostCSS, they seem to be trending.',
      priority: Notepad.Priority.NORMAL,
    },
  ];
  
  const notepad = new Notepad(initialNotes);
  
  /*
   * Смотрю что у меня в заметках после инициализации
   */
  console.log('Все текущие заметки: ', notepad.getNotes());
  
  /*
   * Добавляю еще 2 заметки и смотрю что получилось
   */
  notepad.saveNote({
    id: 'id-3',
    title: 'Get comfy with Frontend frameworks',
    body:
      'First must get some general knowledge about frameworks, then maybe try each one for a week or so. Need to choose between React, Vue and Angular, by reading articles and watching videos.',
    priority: Notepad.Priority.NORMAL,
  });
  
  notepad.saveNote({
    id: 'id-4',
    title: 'Winter clothes',
    body:
      "Winter is coming! Need some really warm clothes: shoes, sweater, hat, jacket, scarf etc. Maybe should get a set of sportwear as well so I'll be able to do some excercises in the park.",
    priority: Notepad.Priority.LOW,
  });
  
  console.log('Все текущие заметки: ', notepad.getNotes());
  
  /*
   * Зима уже близко, пора поднять приоритет на покупку одежды
   */
  notepad.updateNotePriority('id-4', Notepad.Priority.NORMAL);
  
  console.log(
    'Заметки после обновления приоритета для id-4: ',
    notepad.getNotes(),
  );
  
  /*
   * Решил что фреймворки отложу немного, понижаю приоритет
   */
  notepad.updateNotePriority('id-3', Notepad.Priority.LOW);
  
  console.log(
    'Заметки после обновления приоритета для id-3: ',
    notepad.getNotes(),
  );
  
  /*
   * Решил отфильтровать заметки по слову html
   */
  console.log(
    'Отфильтровали заметки по ключевому слову "html": ',
    notepad.filterNotesByQuery('html'),
  );
  
  /*
   * Решил отфильтровать заметки по слову javascript
   */
  console.log(
    'Отфильтровали заметки по ключевому слову "javascript": ',
    notepad.filterNotesByQuery('javascript'),
  );
  
  /*
   * Хочу посмотреть только заметки с нормальным приоритетом
   */
  console.log(
    'Отфильтровали заметки по нормальному приоритету: ',
    notepad.filterNotesByPriority(Notepad.Priority.NORMAL),
  );
  
  /*
   * Обновим контент заметки с id-3
   */
  notepad.updateNoteContent('id-3', {
    title: 'Get comfy with React.js or Vue.js',
  });
  
  console.log(
    'Заметки после обновления контента заметки с id-3: ',
    notepad.getNotes(),
  );
  
  /*
   * Повторил HTML и CSS, удаляю запись c id-2
   */
  notepad.deleteNote('id-2');
  console.log('Заметки после удаления с id -2: ', notepad.getNotes());

  notepad.findNoteById('id-2');