import Notiflix from 'notiflix';
import DragonDrop from 'drag-on-drop';
import './css/styles.css';
import { createTask, createMarkup, deleteTask } from './markup/createMarkup';
import {
  addToLocaleStorage,
  getTasksFromLocalStorage,
  changeLocaleStorage,
} from './services/localstorage';
import addToDOM from './services/addToDOM';
export const LOCALSTORAGE_KEY = 'To do cards';
const refs = {
  form: document.querySelector('.js-form'),
  addButton: document.querySelector('.js-add-button'),
  body: document.querySelector('.js-body'),
};
itemsToMarkupCheck();
const card = document.querySelector('.item');
console.log(card);
const dragon = new DragonDrop(refs.body, {
  handle: false,
  announcement: {
    grabbed: el => `${el.firstElementChild.textContent} grabbed`,
    dropped: el => `${el.firstElementChild.textContent} dropped`,
    reorder: (el, items) => {
      const pos = items.indexOf(el) + 1;
      const text = el.querySelector('li').firstElementChild.textContent;
      return `The schedule has changed, ${text} is now item ${pos} of ${items.length}`;
    },
    cancel: 'Reschedule cancelled.',
  },
});

refs.form.addEventListener('submit', addCard);

refs.body.addEventListener('click', taskStatusChange);

function itemsToMarkupCheck() {
  const tasksInLocalStorage = getTasksFromLocalStorage();
  if (!tasksInLocalStorage) return;
  const parsedTasks = JSON.parse(tasksInLocalStorage);
  addToDOM(refs.body, createMarkup(JSON.parse(tasksInLocalStorage)));
}

function addCard(e) {
  e.preventDefault();
  const trimmedValue = refs.form.elements.message.value.trim();

  if (!trimmedValue) return Notiflix.Notify.warning('Type something!');
  const data = createTask(trimmedValue);
  const markup = createMarkup([data]);
  addToDOM(refs.body, markup);
  addToLocaleStorage(data);

  refs.form.reset();
}

function taskStatusChange(e) {
  if (!e.target.type) return;
  const elementToChange = e.target.parentNode;
  if (elementToChange.classList.contains('checked')) {
    changeLocaleStorage(Number(elementToChange.dataset.id));
    return deleteTask(e.target);
  }
  elementToChange.classList.add('checked');
  e.target.textContent = 'x';
}
