"use strict";

class Notepad {
  constructor(notes = []){
    this._notes = notes;
  }
  get notes() { // Принимает: ничего
     return this._notes; // Возвращает: все заметки, значение свойства _notes
  }
  findNoteById(id) { // Принимает: идентификатор заметки
     for (let note of this._notes) { // Ищет заметку в массиве _notes
       if (note.id === id) {
          return note;
          // Возвращает: заметку с совпавшим полем id или undefined если ничего не найдено
       }
     }
  }
  saveNote(note) { //Принимает: объект заметки
     this._notes.push(note); // Сохраняет заметку в массив _notes
     return note; // Возвращает: сохраненную заметку
  }
  deleteNote(id) { //  Принимает: идентификатор заметки
       if (this.findNoteById(id)) {
        this._notes.splice(this._notes.indexOf(this.findNoteById(id)), 1);
        // Удаляет заметку по идентификатору из массива _notes
       }
       // return this._notes;
       // Возвращает: ничего
  }
  updateNoteContent(id, updatedContent) {
    // Принимает: идентификатор заметки и объект, полями которого надо обновить заметку
      // updatedContent - объект с полями вида {имя: значение, имя: значение}
      const note = this.findNoteById(id);

      if (!note) return;
      //Обновляет контент заметки
      const updateNote = Object.assign(note, updatedContent);
      return updateNote; //Возвращает: обновленную заметку
  }
  updateNotePriority(id, priority) { // Принимает: идентификатор заметки и ее новый приоритет
    const note = this.findNoteById(id);

    if (!note) return;
    // Обновляет приоритет заметки
    note.priority = priority;
    return note; // Возвращает: обновленную заметку
  }
  filterNotesByQuery(query) { // Принимает: подстроку для поиска в title и body заметки
    const newArr = [];
      // Фильтрует массив заметок по подстроке query.

    for (let note of this._notes) {
      const {title, body} = note;
      const noteContent = `${title} ${body}`
      const hasQuery = noteContent.toLowerCase();

      // Если значение query есть в заголовке или теле заметки - она подходит
      if (hasQuery.includes(query) ) {
        newArr.push(note);
        return newArr; // Возвращает: новый массив заметок, контент которых содержит подстроку
      }
     }
  }
  filterNotesByPriority(priority) { // Принимает: приоритет для поиска в свойстве priority заметки
    // Фильтрует массив заметок по значению приоритета
    const newArr = [];

    // Если значение priority совпадает с приоритетом заметки - она подходит
    for (let note of this._notes) {
      if (priority === note.priority) {
        newArr.push(note);
      }
    }
    return newArr; // Возвращает: новый массив заметок с подходящим приоритетом
  }
   static Priority = {
      LOW: 0,
      NORMAL: 1,
      HIGH: 2,
    }
};

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
  Смотрю что у меня в заметках после инициализации
*/
console.log('Все текущие заметки: ', notepad.notes);

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

console.log('Все текущие заметки: ', notepad.notes);

/*
 * Зима уже близко, пора поднять приоритет на покупку одежды
 */
notepad.updateNotePriority('id-4', Notepad.Priority.NORMAL);

console.log('Заметки после обновления приоритета для id-4: ', notepad.notes);

/*
 * Решил что фреймворки отложу немного, понижаю приоритет
 */
notepad.updateNotePriority('id-3', Notepad.Priority.LOW);

console.log('Заметки после обновления приоритета для id-3: ', notepad.notes);

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
  notepad.notes,
);

/*
 * Повторил HTML и CSS, удаляю запись c id-2
 */
notepad.deleteNote('id-2');
console.log('Заметки после удаления с id -2: ', notepad.notes);
