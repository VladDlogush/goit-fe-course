import Micromodal from 'micromodal';
import { Notyf } from 'notyf';
import {PRIORITY_TYPES, ICON_TYPES, NOTE_ACTIONS} from './utils/constants';
import  initialNotes from '../assets/notes.json';
import Notepad from './utils/notepad-model';
import {getRefs, renderNoteList, addItemToList} from './utils/view.js';
import noteTemplate from '../templates/note.hbs'; 

const shortid = require('shortid');

const notepad = new Notepad(initialNotes);
const refs = getRefs();
const notyf = new Notyf();

console.log('Все текущие заметки: ', notepad.notes);

const handleAddNewObj = event => {
  event.preventDefault();

  const inputValue = refs.title.value;
  const inputTextarea = refs.textarea.value;

  const newObj = {
    id: shortid.generate(),
    title: inputValue,
    body: inputTextarea,
    priority: PRIORITY_TYPES.LOW,
  }

  if (!newObj.title || !newObj.body) {
    return notyf.error('Необходимо заполнить все поля!');
  }

  const savedItem = notepad.saveNote(newObj);

  addItemToList(refs.list, savedItem);

  notyf.success('Заметка добавлена успешно!');
  Micromodal.close('note-editor-modal');

  event.currentTarget.reset();
}

const removeListItem = item => {
  notepad.deleteNote(item.dataset.id);

  item.remove();
}

const handleDeleteObj = event => {
  event.preventDefault();

  const id = event.target.parentNode.dataset.action === "delete-note";

  if (id) {
    removeListItem(event.target.closest('li'));
    notyf.success('Заметка удалена');
  }
}

const handleFilterChange = event => {
  const filteredItems = notepad.filterNotesByQuery(event.target.value)

  renderNoteList(refs.list, filteredItems);
}

const handleOpenEditor = () => {
  Micromodal.show('note-editor-modal');
};

renderNoteList(refs.list, initialNotes);

refs.form.addEventListener('submit', handleAddNewObj);
refs.list.addEventListener('click', handleDeleteObj);
refs.filter.addEventListener('input', handleFilterChange);
refs.openEditorModalBtn.addEventListener('click', handleOpenEditor);
