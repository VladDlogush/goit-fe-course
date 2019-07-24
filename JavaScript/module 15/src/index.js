"use strict";

export default class Notepad {
  constructor(notes = []) {
    this._notes = notes;
  }
  get notes() {
    // Принимает: ничего
    return this._notes; // Возвращает: все заметки, значение свойства _notes
  }
  findNoteById(id) {
    // Принимает: идентификатор заметки
    for (let note of this._notes) {
      // Ищет заметку в массиве _notes
      if (note.id === id) {
        return note;
        // Возвращает: заметку с совпавшим полем id или undefined если ничего не найдено
      }
    }
  }
  saveNote(note) {
    //Принимает: объект заметки
    this._notes.push(note); // Сохраняет заметку в массив _notes
    return note; // Возвращает: сохраненную заметку
  }
  deleteNote(id) {
    //  Принимает: идентификатор заметки
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
  updateNotePriority(id, priority) {
    // Принимает: идентификатор заметки и ее новый приоритет
    const note = this.findNoteById(id);

    if (!note) return;
    // Обновляет приоритет заметки
    note.priority = priority;
    return note; // Возвращает: обновленную заметку
  }
  filterNotesByQuery(query) {    
    // Принимает: подстроку для поиска в title и body заметки
    const newArr = [];
    // Фильтрует массив заметок по подстроке query.
    for (const note of this.notes) {
      const { title, body } = note;
      const noteContent = `${title} ${body}`;
      const hasQuery = noteContent.toLowerCase().includes(query.toLowerCase());
       // Если значение query есть в заголовке или теле заметки - она подходит
      if (hasQuery) {
        newArr.push(note);
      }
    }

    return newArr;// Возвращает: новый массив заметок, контент которых содержит подстроку
  }
  filterNotesByPriority(priority) {
    // Принимает: приоритет для поиска в свойстве priority заметки
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
    HIGH: 2
  };
}

// const initialNotes = [
//   {
//     id: "id-1",
//     title: "JavaScript essentials",
//     body:
//       "Get comfortable with all basic JavaScript concepts: variables, loops, arrays, branching, objects, functions, scopes, prototypes etc",
//     priority: Notepad.Priority.HIGH
//   },
//   {
//     id: "id-2",
//     title: "Refresh HTML and CSS",
//     body:
//       "Need to refresh HTML and CSS concepts, after learning some JavaScript. Maybe get to know CSS Grid and PostCSS, they seem to be trending.",
//     priority: Notepad.Priority.NORMAL
//   }
// ];

// const notepad = new Notepad(initialNotes);

