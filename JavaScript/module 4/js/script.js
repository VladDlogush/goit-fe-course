"use strict";

const Priority = {
  LOW: 0,
  NORMAL: 1,
  HIGH: 2,
};

const notepad = {
  notes: [],
  getNotes() { // Принимает: ничего
     return this.notes; // Возвращает: все заметки, значение свойства notes
  },
  findNoteById(id) { // Принимает: идентификатор заметки
     for (let note of this.notes) { // Ищет заметку в массиве notes
       if (note.id === id) {
          return note;
          // Возвращает: заметку с совпавшим полем id или undefined если ничего не найдено
       }
     }
  },
  saveNote(note) { //Принимает: объект заметки
     const addsNotesInArrNotes = this.notes.push(note); // Сохраняет заметку в массив notes
     return addsNotesInArrNotes; // Возвращает: сохраненную заметку
  },
  deleteNote(id) { //  Принимает: идентификатор заметки
       if (this.findNoteById(id)) {
        this.notes.splice(this.notes.indexOf(this.findNoteById(id)), 1);
        // Удаляет заметку по идентификатору из массива notes
       }
       // return this.notes;
       // Возвращает: ничего
  },
  updateNoteContent(id, updatedContent) {
    // Принимает: идентификатор заметки и объект, полями которого надо обновить заметку
    // updatedContent - объект с полями вида {имя: значение, имя: значение}
    const note = this.findNoteById(id);

    if (!note) return;
    //Обновляет контент заметки
    const updateNote = this.notes[this.notes.indexOf(this.findNoteById(id))] = {...this.findNoteById(id), ...updatedContent};
    return updateNote; //Возвращает: обновленную заметку
  },
  updateNotePriority(id, priority) { // Принимает: идентификатор заметки и ее новый приоритет
    const note = this.findNoteById(id);

    if (!note) return;
    // Обновляет приоритет заметки
    note.priority = priority;
    return note; // Возвращает: обновленную заметку
  },
  filterNotesByQuery(query) { // Принимает: подстроку для поиска в title и body заметки
    const newArr = [];
    // Фильтрует массив заметок по подстроке query.

    for (let note of this.notes) {
      const {title, body} = note;
      const noteContent = `${title} ${body}`
      const hasQuery = noteContent.toLowerCase();

      // Если значение query есть в заголовке или теле заметки - она подходит
      if (hasQuery.includes(query) ) {
        newArr.push(note);
        return newArr; // Возвращает: новый массив заметок, контент которых содержит подстроку
      }
     }
  },
  filterNotesByPriority(priority) { // Принимает: приоритет для поиска в свойстве priority заметки
    // Фильтрует массив заметок по значению приоритета
    const newArr = [];

    // Если значение priority совпадает с приоритетом заметки - она подходит
    for (let note of this.notes) {
      if (priority === note.priority) {
        newArr.push(note);
      }
    }
    return newArr; // Возвращает: новый массив заметок с подходящим приоритетом
  },

};

/*
 * Добавляю 4 заметки и смотрю что получилось
 */
notepad.saveNote({
  id: 'id-1',
  title: 'JavaScript essentials',
  body: 'Get comfortable with all basic JavaScript concepts: variables, loops, arrays, branching, objects, functions, scopes, prototypes etc',
  priority: Priority.HIGH,
});

notepad.saveNote({
  id: 'id-2',
  title: 'Refresh HTML and CSS',
  body: 'Need to refresh HTML and CSS concepts, after learning some JavaScript. Maybe get to know CSS Grid and PostCSS, they seem to be trending.',
  priority: Priority.NORMAL,
});

notepad.saveNote({
  id: 'id-3',
  title: 'Get comfy with Frontend frameworks',
  body: 'First must get some general knowledge about frameworks, then maybe try each one for a week or so. Need to choose between React, Vue and Angular, by reading articles and watching videos.',
  priority: Priority.NORMAL,
});

notepad.saveNote({
  id: 'id-4',
  title: 'Winter clothes',
  body: "Winter is coming! Need some really warm clothes: shoes, sweater, hat, jacket, scarf etc. Maybe should get a set of sportwear as well so I'll be able to do some excercises in the park.",
  priority: Priority.LOW,
});

console.log('Все текущие заметки: ', notepad.getNotes());

/*
 * Зима уже близко, пора поднять приоритет на покупку одежды
 */
notepad.updateNotePriority('id-4', Priority.NORMAL);

console.log(
  'Заметки после обновления приоритета для id-4: ',
  notepad.getNotes(),
);

/*
 * Решил что фреймворки отложу немного, понижаю приоритет
 */
notepad.updateNotePriority('id-3', Priority.LOW);

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
  notepad.filterNotesByPriority(Priority.NORMAL),
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
