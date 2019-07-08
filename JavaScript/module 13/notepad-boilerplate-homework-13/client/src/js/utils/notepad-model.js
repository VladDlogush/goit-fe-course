import * as api from './../services/api';

export default class Notepad {
  static Priority = {
     LOW: 0,
     NORMAL: 1,
     HIGH: 2,
  }
  constructor(notes = []){
    this._notes = notes;
  }
  get() { // Принимает: ничего
    return api.getNotes().then(getNotes => {
      this._notes = getNotes;
      return this._notes; // Возвращает: все заметки, значение свойства _notes
    })

  }
  findNoteById(id) { // Принимает: идентификатор заметки
    return new Promise(resolve => {
      for (let note of this._notes) { // Ищет заметку в массиве _notes
        if (note.id === id) {
           resolve(note);
           // Возвращает: заметку с совпавшим полем id или undefined если ничего не найдено
        }
      }
    })
  }
  saveNote(note) { //Принимает: объект заметки
    return api.addNote(note).then(saveNote => {
        this._notes.push(saveNote); // Сохраняет заметку в массив _notes
        return saveNote; // Возвращает: сохраненную заметку
    })

  }
  deleteNote(id) { //  Принимает: идентификатор заметки
    return api.deleteNote(id).then(deleteNote => {
        if (this.findNoteById(id)) {
          this._notes = this._notes.filter(note => note.id !== id);
        }
        return id;
    })

  }
  updateNoteContent(id, updatedContent) {
    // Принимает: идентификатор заметки и объект, полями которого надо обновить заметку
      // updatedContent - объект с полями вида {имя: значение, имя: значение}
      return new Promise(resolve => {
        const note = this.findNoteById(id);

        if (!note) return;
        //Обновляет контент заметки
        const updateNote = Object.assign(note, updatedItem);
        return updateNote; //Возвращает: обновленную заметку
      })
  }
  updateNotePriority(id, priority) { // Принимает: идентификатор заметки и ее новый приоритет
    return new Promise(resolve => {
      const note = this.findNoteById(id);

      if (!note) return;
      // Обновляет приоритет заметки
      note.priority = priority;
      resolve(note); // Возвращает: обновленную заметку
    })
  }
  filterNotesByQuery(query) { // Принимает: подстроку для поиска в title и body заметки
    return new Promise(resolve => {
      const arr = this._notes.filter(note =>
        note.title.toLowerCase().includes(query.toLowerCase()) ||
        note.body.toLowerCase().includes(query.toLowerCase())
      );
      resolve(arr); // Возвращает: новый массив заметок, контент которых содержит подстроку
    })
  }
  filterNotesByPriority(priority) { // Принимает: приоритет для поиска в свойстве priority заметки
    return new Promise(resolve => {
      // Фильтрует массив заметок по значению приоритета
      const newArr = [];

      // Если значение priority совпадает с приоритетом заметки - она подходит
      for (let note of this._notes) {
        if (priority === note.priority) {
          newArr.push(note);
        }
      }
      resolve(newArr); // Возвращает: новый массив заметок с подходящим приоритетом
    })
  }
};
