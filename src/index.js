import Notiflix from 'notiflix';
import DragonDrop from 'drag-on-drop';

import './css/styles.css';
import { createTask, createMarkup, deleteTask } from './markup/markup';
import {
  addToFirebaseStorage,
  getTasksFromFirebaseStorage,
  deleteFromFirebaseStorage,
  changeFirebaseStorage,
} from './services/firebaseStorage';
import {
  addToLocalStorage,
  getTasksFromLocalStorage,
  changeLocalStorage,
  deleteFromLocaleStorage,
  addInfoToLocalStorage,
} from './services/localstorage';
import addToDOM from './services/addToDOM';
import { completedTime, convertMs } from './timer/timer';
import { signIn, signOff } from './services/authentication';
import { itemsToMarkup } from './services/itemsToMarkup';
import { USER } from './services/authentication';

export const LOCALSTORAGE_KEY = 'To do cards';
export const refs = {
  form: document.querySelector('.js-form'),
  addButton: document.querySelector('.js-add-button'),
  body: document.querySelector('.js-body'),
  signInButton: document.querySelector('.sign-button-in'),
  userInformation: document.querySelector('.user-information'),
};

refs.form.addEventListener('submit', addCard);

refs.body.addEventListener('click', taskStatusChange);

refs.signInButton.addEventListener('click', e => {
  e.target.classList.contains('sign-button-in') ? signIn() : signOff();
});

function addCard(e) {
  e.preventDefault();
  const trimmedValue = refs.form.elements.message.value.trim();
  if (!trimmedValue) return Notiflix.Notify.warning('Type something!');
  console.log(USER.id);

  const data = createTask(trimmedValue, USER.Id);
  console.log('data', data);
  const markup = createMarkup([data]);
  if (!USER.isLogIn) {
    addToDOM(refs.body, markup);
    addToLocalStorage(data);
    refs.form.reset();
    return;
  }
  addToDOM(refs.body, markup);
  addToFirebaseStorage(data);

  refs.form.reset();
}

async function taskStatusChange(e) {
  if (!e.target.type) return;
  const elementToChange = e.target.parentNode;
  const elementId = Number(elementToChange.dataset.id);
  if (elementToChange.classList.contains('checked')) {
    USER.isLogIn
      ? deleteFromFirebaseStorage(elementId, elementToChange)
      : deleteFromLocaleStorage(elementId);
    return deleteTask(e.target);
  }
  elementToChange.classList.add('checked');

  const dateRef = elementToChange.firstElementChild;
  e.target.classList.add('is-checked');
  e.target.textContent = 'x';
  if (!USER.IsLogIn) {
    changeLocalStorage(elementId, doneTime(elementId, dateRef));
    return;
  }
  const status = await changeFirebaseStorage(
    elementId,
    doneTime(elementId, dateRef)
  );
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
