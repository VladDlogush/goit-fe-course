import Micromodal from 'micromodal';
import { Notyf } from 'notyf';
import {PRIORITY_TYPES, ICON_TYPES, NOTE_ACTIONS} from './utils/constants';
import initialNotes from '../assets/notes.json';
import Notepad from './utils/notepad-model';
import noteTemplate from '../templates/note.hbs';

const localStorageNotes = localStorage.getItem('notes') ?
JSON.parse(localStorage.getItem('notes')) : initialNotes;

const shortid = require('shortid');

const notepad = new Notepad(localStorageNotes);
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

  notepad
  .saveNote(newObj)
  .then(savedItem => {
    addItemToList(refs.list, savedItem);
  });

  notyf.success('Заметка добавлена успешно!');
  Micromodal.close('note-editor-modal');

  event.currentTarget.reset();
}

const removeListItem = item => {
  item.remove()
}

const handleDeleteObj = event => {
  event.preventDefault();

  const id = event.target.parentNode.dataset.action === "delete-note";

  if (id) {
    notepad
        .deleteNote(event.target.closest('li').dataset.id)
        .then(() => {
           removeListItem(event.target.closest('li'));
            notyf.success('Заметка удалена');
        });
    }
}

const handleFilterChange = event => {
  notepad
  .filterNotesByQuery(event.target.value)
  .then(filteredItems => {
     renderNoteList(refs.list, filteredItems);
  });
}

const handleOpenEditor = () => {
  Micromodal.show('note-editor-modal');
};

renderNoteList(refs.list, localStorageNotes);

refs.form.addEventListener('submit', handleAddNewObj);
refs.list.addEventListener('click', handleDeleteObj);
refs.filter.addEventListener('input', handleFilterChange);
refs.openEditorModalBtn.addEventListener('click', handleOpenEditor);
