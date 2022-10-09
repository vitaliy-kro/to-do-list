import { getTasksFromLocalStorage } from './localstorage';
import { getTasksFromFirebaseStorage } from './firebaseStorage';
import { USER } from './authentication';
import addToDOM from './addToDOM';
import { createMarkup } from '../markup/markup';
import { refs } from '../refs/refs';

export async function itemsToMarkup(isLogIn = false) {
  refs.body.innerHTML = '';

  const tasksInStorage = isLogIn
    ? await getTasksFromFirebaseStorage(USER.id)
    : getTasksFromLocalStorage();

  if (!tasksInStorage) return;
  if (!isLogIn) {
    const parsedTasks = JSON.parse(tasksInStorage);
    addToDOM(refs.body, createMarkup(parsedTasks));
    return;
  }
  addToDOM(refs.body, createMarkup(tasksInStorage));
}
