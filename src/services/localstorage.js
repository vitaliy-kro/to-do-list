import { LOCALSTORAGE_KEY } from '..';

export function addToLocaleStorage(value) {
  const inLocalStorageTasks = getTasksFromLocalStorage();
  const parsedTasks = inLocalStorageTasks
    ? JSON.parse(inLocalStorageTasks)
    : [];

  parsedTasks.push(value);

  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(parsedTasks));
}

export function getTasksFromLocalStorage(key = LOCALSTORAGE_KEY) {
  return localStorage.getItem(key);
}

export function changeLocaleStorage(id) {
  const tasksInLocalStorage = getTasksFromLocalStorage();
  const parsedTasks = JSON.parse(tasksInLocalStorage);
  const filtredTasks = parsedTasks.filter(e => e.id !== id);
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(filtredTasks));
}
