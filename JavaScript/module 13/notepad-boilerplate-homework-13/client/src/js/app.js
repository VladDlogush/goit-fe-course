import Micromodal from 'micromodal';
import { Notyf } from 'notyf';
import {PRIORITY_TYPES, ICON_TYPES, NOTE_ACTIONS} from './utils/constants';
import Notepad from './utils/notepad-model';
import {getRefs, renderNoteList, addItemToList} from './utils/view.js';

const notepad = new Notepad();
const refs = getRefs();
const notyf = new Notyf();

notepad.get()
  .then(initialNotes => {
    renderNoteList(refs.list, initialNotes);
  })
  .catch(error => {
    console.log(error);
  });

const handleAddNewObj = event => {
  event.preventDefault();

  const inputValue = refs.title.value;
  const inputTextarea = refs.textarea.value;

  const newObj = {
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
  })
  .catch(error => {
    console.log(error);
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
        })
        .catch(error => {
          console.log(error);
        });
    }
}

const handleFilterChange = event => {
  notepad
  .filterNotesByQuery(event.target.value)
  .then(filteredItems => {
     renderNoteList(refs.list, filteredItems);
  })
  .catch(error => {
    console.log(error);
  });
}

const handleOpenEditor = () => {
  Micromodal.show('note-editor-modal');
};

refs.form.addEventListener('submit', handleAddNewObj);
refs.list.addEventListener('click', handleDeleteObj);
refs.filter.addEventListener('input', handleFilterChange);
refs.openEditorModalBtn.addEventListener('click', handleOpenEditor);
