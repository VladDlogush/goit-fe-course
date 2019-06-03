import {PRIORITY_TYPES, ICON_TYPES, NOTE_ACTIONS} from './utils/constants';
import  initialNotes from '../assets/notes.json';
import Notepad from './utils/notepad-model';
import {getRefs, renderNoteList, addItemToList} from './utils/view.js';

const shortid = require('shortid');

const notepad = new Notepad(initialNotes);
const refs = getRefs();

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
    return alert('Необходимо заполнить все поля!');
  }

  const savedItem = notepad.saveNote(newObj);

  addItemToList(refs.list, savedItem);

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
  }
}

const handleFilterChange = event => {
  const filteredItems = notepad.filterNotesByQuery(event.target.value)

  renderNoteList(refs.list, filteredItems);
}

renderNoteList(refs.list, initialNotes);

refs.form.addEventListener('submit', handleAddNewObj);
refs.list.addEventListener('click', handleDeleteObj);
refs.filter.addEventListener('input', handleFilterChange);
