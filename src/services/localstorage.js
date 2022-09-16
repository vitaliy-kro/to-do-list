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

export function deleteFromLocaleStorage(id) {
  const tasksInLocalStorage = getTasksFromLocalStorage();
  const parsedTasks = JSON.parse(tasksInLocalStorage);
  const filtredTasks = parsedTasks.filter(e => e.id !== id);
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(filtredTasks));
}

export function changeLocalStorage(taskId, finishTaskCallback) {
  const tasksInLocalStorage = getTasksFromLocalStorage();
  const parsedTasks = JSON.parse(tasksInLocalStorage);
  const changeTask = parsedTasks.map(
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
  console.log('changeTask', changeTask);
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(changeTask));
}
