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

const handleAddNewObj = async event => {
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


  try {
    const savedItem = await notepad.saveNote(newObj);
      addItemToList(refs.list, savedItem);
      notyf.success('Заметка добавлена успешно!');
      Micromodal.close('note-editor-modal');

    return savedItem;  
  } catch (error) {
      notyf.error("Status Text: " + error.response.status);
  }
 
  event.currentTarget.reset();
}

const removeListItem = item => {
  item.remove()
}

const handleDeleteObj = async event => {
  event.preventDefault();

  const id = event.target.parentNode.dataset.action === "delete-note";

  if (id) {
    try {
      const deleteItem = await notepad.deleteNote(event.target.closest('li').dataset.id);
       removeListItem(event.target.closest('li'));
       notyf.success('Заметка удалена');

      return deleteItem;
    } catch (error) {
        notyf.error("Status Text: " + error.response.status);
    }
  }
}

const handleFilterChange = async event => {
  try {
    const filteredItems = await notepad.filterNotesByQuery(event.target.value);
    renderNoteList(refs.list, filteredItems);
    
    return filteredItems;
  } catch (error) {
      notyf.error("Status Text: " + error.response.status);
  }
}

const handleOpenEditor = () => {
  Micromodal.show('note-editor-modal');
};

refs.form.addEventListener('submit', handleAddNewObj);
refs.list.addEventListener('click', handleDeleteObj);
refs.filter.addEventListener('input', handleFilterChange);
refs.openEditorModalBtn.addEventListener('click', handleOpenEditor);
