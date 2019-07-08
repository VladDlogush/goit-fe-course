import {PRIORITY_TYPES, ICON_TYPES, NOTE_ACTIONS} from './constants.js'
import noteTemplate from '../../templates/note.hbs';

export const getRefs = () => ({
  list:document.querySelector('ul.note-list'),
  form: document.querySelector('.note-editor'),
  filter: document.querySelector('.search-form'),
  title: document.querySelector('input[name="note_title"]'),
  textarea: document.querySelector('textarea[name="note_body"]'),
  buttonDelete: document.querySelector('button[data-action="delete-note"]'),
  openEditorModalBtn: document.querySelector('button[data-action="open-editor"]'),
});

export const renderNoteList = (listRef, notes) => {
  const listItems = notes.map(item => noteTemplate(item)).join('');
    listRef.innerHTML = '';
    listRef.insertAdjacentHTML('beforeend', listItems );
};

export const addItemToList = (listRef, item) => {
  const listItem = noteTemplate(item);
  listRef.insertAdjacentHTML('beforeend',listItem );
};
