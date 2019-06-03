import {PRIORITY_TYPES, ICON_TYPES, NOTE_ACTIONS} from './constants.js'

export const getRefs = () => ({
  list:document.querySelector('ul.note-list'),
  form: document.querySelector('.note-editor'),
  filter: document.querySelector('.search-form'),
  title: document.querySelector('input[name="note_title"]'),
  textarea: document.querySelector('textarea[name="note_body"]'),
  buttonDelete: document.querySelector('button[data-action="delete-note"]'),
});


export const createListItem = (note) => {
  const { id, title, body, priority} = note;
  const listItem = document.createElement('li');
  listItem.classList.add('note-list__item');
  listItem.dataset.id = id;

  const note_container = document.createElement('div');
  note_container.classList.add('note');

  note_container.append(createNoteContent(note), createNoteFooter(note));
  listItem.append(note_container);

  return listItem;
};

export const createNoteContent = (note) => {
  const { id, title, body, priority} = note;
  const content = document.createElement('div');
  content.classList.add('note__content');

  const note_title = document.createElement('h2');
  note_title.classList.add('note__title');
  note_title.textContent = title;

  const note_body = document.createElement('p');
  note_body.classList.add('note__body');
  note_body.textContent = body;

  content.append(note_title, note_body);

  return content;
};

export const createActionButton = (action, iconType) => {
  const button = document.createElement('button');
  button.classList.add('action');
  button.dataset.action = action;

  const buttonInner = document.createElement('i');
  buttonInner.classList.add('material-icons');
  buttonInner.classList.add('action__icon');
  buttonInner.textContent = iconType;

  button.append(buttonInner);

  return button;
};

export const createNoteFooter = (note) => {
  const { id, title, body, priority} = note;
  const footer = document.createElement('footer');
  footer.classList.add('note__footer');

  const expandSection = document.createElement('section');
  expandSection.classList.add('note__section');

  const note_priority = document.createElement('span');
  note_priority.classList.add('note__priority');
  note_priority.textContent = priority;


  const editSection = document.createElement('section');
  editSection.classList.add('note__section');

  expandSection.append(
      createActionButton(NOTE_ACTIONS.DECREASE_PRIORITY,ICON_TYPES.ARROW_DOWN),
      createActionButton(NOTE_ACTIONS.INCREASE_PRIORITY,ICON_TYPES.ARROW_UP),
      note_priority);

  editSection.append(
    createActionButton(NOTE_ACTIONS.EDIT,ICON_TYPES.EDIT),
    createActionButton(NOTE_ACTIONS.DELETE,ICON_TYPES.DELETE));

  footer.append(expandSection, editSection);

  return footer;
};

export const renderNoteList = (listRef, notes) => {
  const listItems = notes.map(item => createListItem(item));

  listRef.innerHTML = '';
  listRef.append(...listItems);

};

export const addItemToList = (listRef, item) => {
  const listItem = createListItem(item);

  listRef.appendChild(listItem);
};
