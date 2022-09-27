import Notiflix from 'notiflix';
import DragonDrop from 'drag-on-drop';
import { format } from 'date-fns';
import './css/styles.css';
import { createTask, createMarkup, deleteTask } from './markup/markup';
import {
  addToFirebaseStorage,
  getTasksFromFirebaseStorage,
  deleteFromFirebaseStorage,
  changeFirebaseStorage,
} from './services/firebaseStorage';
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

async function itemsToMarkupCheck() {
  const tasksInFirebaseStorage = await getTasksFromFirebaseStorage();
  if (!tasksInFirebaseStorage) return;
  console.log(123);
  addToDOM(refs.body, createMarkup(tasksInFirebaseStorage));
}

function addCard(e) {
  e.preventDefault();
  const trimmedValue = refs.form.elements.message.value.trim();

  if (!trimmedValue) return Notiflix.Notify.warning('Type something!');
  const data = createTask(trimmedValue);
  const markup = createMarkup([data]);
  addToDOM(refs.body, markup);
  addToFirebaseStorage(data);

  refs.form.reset();
}

async function taskStatusChange(e) {
  if (!e.target.type) return;
  const elementToChange = e.target.parentNode;
  const elementId = Number(elementToChange.dataset.id);
  if (elementToChange.classList.contains('checked')) {
    deleteFromFirebaseStorage(elementId, elementToChange);
    return deleteTask(e.target);
  }
  elementToChange.classList.add('checked');

  const dateRef = elementToChange.firstElementChild;
  const status = await changeFirebaseStorage(
    elementId,
    doneTime(elementId, dateRef)
  );

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
