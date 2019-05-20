'use strict';

const PRIORITY_TYPES = {
  LOW: 0,
  NORMAL: 1,
  HIGH: 2,
};

const ICON_TYPES = {
  EDIT: 'edit',
  DELETE: 'delete',
  ARROW_DOWN: 'expand_more',
  ARROW_UP: 'expand_less',
};

const NOTE_ACTIONS = {
  DELETE: 'delete-note',
  EDIT: 'edit-note',
  INCREASE_PRIORITY: 'increase-priority',
  DECREASE_PRIORITY: 'decrease-priority',
};

const initialNotes = [
  {
    id: 'id-1',
    title: 'JavaScript essentials',
    body:
      'Get comfortable with all basic JavaScript concepts: variables, loops, arrays, branching, objects, functions, scopes, prototypes etc',
    priority: PRIORITY_TYPES.HIGH,
  },
  {
    id: 'id-2',
    title: 'Refresh HTML and CSS',
    body:
      'Need to refresh HTML and CSS concepts, after learning some JavaScript. Maybe get to know CSS Grid and PostCSS, they seem to be trending.',
    priority: PRIORITY_TYPES.NORMAL,
  },
  {
    id: 'id-3',
    title: 'Get comfy with Frontend frameworks',
    body:
      'First should get some general knowledge about frameworks, then maybe try each one for a week or so. Need to choose between React, Vue and Angular, by reading articles and watching videos.',
    priority: PRIORITY_TYPES.NORMAL,
  },
  {
    id: 'id-4',
    title: 'Winter clothes',
    body:
      "Winter is coming! Need some really warm clothes: shoes, sweater, hat, jacket, scarf etc. Maybe should get a set of sportwear as well so I'll be able to do some excercises in the park.",
    priority: PRIORITY_TYPES.LOW,
  },
];

class Notepad {
  static generateUniqueId = () =>
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15);



  constructor(notes = []){
    this._notes = notes;
  }
  get notes() { // Принимает: ничего
     return this._notes; // Возвращает: все заметки, значение свойства _notes
  }
  findNoteById(id) { // Принимает: идентификатор заметки
     for (let note of this._notes) { // Ищет заметку в массиве _notes
       if (note.id === id) {
          return note;
          // Возвращает: заметку с совпавшим полем id или undefined если ничего не найдено
       }
     }
  }
  saveNote(note) { //Принимает: объект заметки
     this._notes.push(note); // Сохраняет заметку в массив _notes
     return note; // Возвращает: сохраненную заметку
  }
  deleteNote(id) { //  Принимает: идентификатор заметки
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
  updateNotePriority(id, priority) { // Принимает: идентификатор заметки и ее новый приоритет
    const note = this.findNoteById(id);

    if (!note) return;
    // Обновляет приоритет заметки
    note.priority = priority;
    return note; // Возвращает: обновленную заметку
  }
  filterNotesByQuery(query) { // Принимает: подстроку для поиска в title и body заметки
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
  filterNotesByPriority(priority) { // Принимает: приоритет для поиска в свойстве priority заметки
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
      HIGH: 2,
    }
};

const notepad = new Notepad(initialNotes);

console.log('Все текущие заметки: ', notepad.notes);

const refs = {
  list:document.querySelector('ul.note-list'),
  form: document.querySelector('.note-editor'),
  filter: document.querySelector('.search-form'),
  title: document.querySelector('input[name="note_title"]'),
  textarea: document.querySelector('textarea[name="note_body"]'),
  buttonDelete: document.querySelector('button[data-action="delete-note"]'),
}

const createListItem = (note) => {
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

const createNoteContent = (note) => {
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

const createActionButton = (action, iconType) => {
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

const createNoteFooter = (note) => {
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

const renderNoteList = (listRef, notes) => {
  const listItems = notes.map(item => createListItem(item));

  listRef.innerHTML = '';
  listRef.append(...listItems);

};

const addItemToList = (listRef, item) => {
  const listItem = createListItem(item);

  listRef.appendChild(listItem);
};

const handleAddNewObj = event => {
  event.preventDefault();

  const inputValue = refs.title.value;
  const inputTextarea = refs.textarea.value;

  const newObj = {
    id: Notepad.generateUniqueId(),
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
