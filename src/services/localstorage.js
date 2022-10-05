import { LOCALSTORAGE_KEY } from '..';

export function addToLocalStorage(value) {
  const inLocalStorageTasks = getTasksFromLocalStorage();
  const parsedTasks = inLocalStorageTasks
    ? JSON.parse(inLocalStorageTasks)
    : [];

  parsedTasks.push(value);

  addInfoToLocalStorage(parsedTasks);
}

export function getTasksFromLocalStorage(key = LOCALSTORAGE_KEY) {
  return localStorage.getItem(key);
}
export function changeLocalStorage(taskId, finishTaskCallback) {
  const tasksInLocalStorage = getTasksFromLocalStorage();
  const parsedTasks = JSON.parse(tasksInLocalStorage);
  const changedTask = parsedTasks.map(
    ({ id, isChecked, btnClass, btnText, value, date }) => {
      if (taskId === id) {
        isChecked = true;
        btnClass = true;
        btnText = true;
        date = finishTaskCallback;
      }
      return { id, isChecked, btnClass, btnText, value, date };
    }
  );

  addInfoToLocalStorage(changedTask);
}
export function deleteFromLocaleStorage(id) {
  const tasksInLocalStorage = getTasksFromLocalStorage();
  const parsedTasks = JSON.parse(tasksInLocalStorage);
  const filtredTasks = parsedTasks.filter(e => e.id !== id);
  addInfoToLocalStorage(filtredTasks);
}

export function addInfoToLocalStorage(params) {
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(params));
}
