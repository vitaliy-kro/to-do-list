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
  console.log('tasksInLocalStorage', tasksInLocalStorage);
  if (!tasksInLocalStorage) return;
  const parsedTasks = JSON.parse(tasksInLocalStorage);
  console.log('parsedTasks', parsedTasks);
  addToDOM(refs.body, createMarkup(parsedTasks));
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

  const dateRef = elementToChange.firstElementChild;
  changeLocalStorage(elementId, doneTime(elementId, dateRef));

  e.target.classList.add('is-checked');
  e.target.textContent = 'x';
}

const dragon = new DragonDrop(refs.body, {
  handle: false,
});

function doneTime(id, changeEl) {
  const executionTime = completedTime(id);
  const convertTime = convertMs(executionTime);
  const resultMessage = `You did it for ${convertTime.hours}:${convertTime.minutes}:${convertTime.seconds}`;
  changeEl.textContent = resultMessage;
  return resultMessage;
}
