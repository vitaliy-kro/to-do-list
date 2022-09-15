import Notiflix from 'notiflix';
import DragonDrop from 'drag-on-drop';
import { format } from 'date-fns';
import './css/styles.css';
import { createTask, createMarkup, deleteTask } from './markup/markup';
import {
  addToLocaleStorage,
  getTasksFromLocalStorage,
  deleteFromLocaleStorage,
  changeLocalStorage,
} from './services/localstorage';
import addToDOM from './services/addToDOM';
import { completedTime, convertMs } from './timer/timer';
export const LOCALSTORAGE_KEY = 'To do cards';
const refs = {
  form: document.querySelector('.js-form'),
  addButton: document.querySelector('.js-add-button'),
  body: document.querySelector('.js-body'),
};
itemsToMarkupCheck();

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
  const elementId = Number(elementToChange.dataset.id);
  if (elementToChange.classList.contains('checked')) {
    deleteFromLocaleStorage(elementId);
    return deleteTask(e.target);
  }
  elementToChange.classList.add('checked');
  changeLocalStorage(elementId);

  const executionTime = completedTime(elementId);
  const dateRef = elementToChange.firstElementChild;
  const convertTime = convertMs(executionTime);
  dateRef.textContent = `You did it for ${convertTime.hours}:${convertTime.minutes}:${convertTime.seconds}`;

  e.target.classList.add('is-checked');
  e.target.textContent = 'x';
}

const dragon = new DragonDrop(refs.body, {
  handle: false,
});
