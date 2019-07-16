import { Notyf } from 'notyf';
import * as api from './../services/api';

const notyf = new Notyf();

export default class Notepad {
  static Priority = {
     LOW: 0,
     NORMAL: 1,
     HIGH: 2,
  }
  constructor(notes = []){
    this._notes = notes;
  }
  async get() { // Принимает: ничего
    try {
      const getNotes = await api.getNotes();
      this._notes = getNotes;
      
      return this._notes; // Возвращает: все заметки, значение свойства _notes
    } catch (error) {
        notyf.error("Status Text: " + error.response.status);
    }
  }
  async findNoteById(id) { // Принимает: идентификатор заметки
    try {
      const note = await this._notes.find(note => note.id === id); 
                                    // Ищет заметку в массиве _notes
      return note;
      // Возвращает: заметку с совпавшим полем id или undefined если ничего не найдено
    } catch (error) {
        notyf.error("Status Text: " + error.response.status);
    }
  }
  async saveNote(note) { //Принимает: объект заметки
    try {
      const addNote = await api.addNote(note);
      this._notes.push(addNote) // Сохраняет заметку в массив _notes

      return addNote; // Возвращает: сохраненную заметку
    } catch (error) {
        notyf.error("Status Text: " + error.response.status);
    }
  }
  async deleteNote(id) { //  Принимает: идентификатор заметки
    try {
      const deleteNote = await api.deleteNote(id);
        if (this.findNoteById(id)) {
            this._notes = this._notes.filter(note => note.id !== id);
          }
      // return id
    } catch (error) {
        notyf.error("Status Text: " + error.response.status);
    }
  }
  async updateNoteContent(id, updatedContent) {
      // Принимает: идентификатор заметки и объект, полями которого надо обновить заметку
      // updatedContent - объект с полями вида {имя: значение, имя: значение}
      try {
        const note = await this.findNoteById(id);

        if (!note) return;
        //Обновляет контент заметки
        const updateNote = await Object.assign(note, updatedContent);
        return updateNote; //Возвращает: обновленную заметку
      } catch (error) {
          notyf.error("Status Text: " + error.response.status);
      }
  }
  async updateNotePriority(id, priority) { // Принимает: идентификатор заметки и ее новый приоритет
    try {
      const note = await this.findNoteById(id);

      if (!note) return;
      // Обновляет приоритет заметки
      note.priority = priority;
      return note; // Возвращает: обновленную заметку
    } catch (error) {
        notyf.error("Status Text: " + error.response.status);
    }
  }
  async filterNotesByQuery(query) { // Принимает: подстроку для поиска в title и body заметки
    try {
      const arr = await this._notes.filter(note =>
        note.title.toLowerCase().includes(query.toLowerCase()) ||
        note.body.toLowerCase().includes(query.toLowerCase())
      );
      return arr; // Возвращает: новый массив заметок, контент которых содержит подстроку
    } catch (error) {
        notyf.error("Status Text: " + error.response.status);
    }
  }
  async filterNotesByPriority(priority) { // Принимает: приоритет для поиска в свойстве priority заметки
    try {
      const newArr = await this._notes.filter(note => priority === note.priority)

      return newArr;
    } catch (error) {
        notyf.error("Status Text: " + error.response.status);
    }
  }
};
