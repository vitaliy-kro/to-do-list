import { initializeApp } from 'firebase/app';
import { LOCALSTORAGE_KEY } from '..';
import firebaseConfig from '../firebase/firebase';
import { getDatabase, ref, set, get, update, remove } from 'firebase/database';

const app = initializeApp(firebaseConfig);

const db = getDatabase();

export function addToFirebaseStorage(task) {
  try {
    set(ref(db, 'tasks/' + task.id), task);
  } catch (error) {
    console.log(error);
  }
}

export function getTasksFromFirebaseStorage(key = LOCALSTORAGE_KEY) {
  return get(ref(db, 'tasks/'))
    .then(snapshot => {
      if (snapshot.exists()) {
        return Object.values(snapshot.val());
      } else {
        console.log('No data available');
      }
    })
    .catch(error => {
      console.error(error);
    });
}

export function deleteFromFirebaseStorage(id, element) {
  try {
    remove(ref(db, 'tasks/' + id), element);
  } catch (error) {
    console.log(error);
  }
}

export function changeFirebaseStorage(taskId, finishTaskCallback) {
  try {
    update(ref(db, 'tasks/' + taskId), {
      isChecked: true,
      btnClass: true,
      btnText: true,
      date: finishTaskCallback,
    });
  } catch (error) {
    console.log('error', error);
  }
}

// export function addToFirebaseStorage(value) {
//   const inLocalStorageTasks = getTasksFromLocalStorage();
//   const parsedTasks = inLocalStorageTasks
//     ? JSON.parse(inLocalStorageTasks)
//     : [];

//   parsedTasks.push(value);

//   localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(parsedTasks));
// }

// export function getTasksFromLocalStorage(key = LOCALSTORAGE_KEY) {
//   return localStorage.getItem(key);
// }
// export function changeLocalStorage(taskId, finishTaskCallback) {
//   const tasksInLocalStorage = getTasksFromLocalStorage();
//   const parsedTasks = JSON.parse(tasksInLocalStorage);
//   const changeTask = parsedTasks.map(
//     ({ id, isChecked, btnClass, btnText, value, date }) => {
//       if (taskId === id) {
//         isChecked = true;
//         btnClass = true;
//         btnText = true;
//         date = finishTaskCallback;
//       }
//       return { id, isChecked, btnClass, btnText, value, date };
//     }
//   );

//   localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(changeTask));
// }
// export function deleteFromLocaleStorage(id) {
//   const tasksInLocalStorage = getTasksFromLocalStorage();
//   const parsedTasks = JSON.parse(tasksInLocalStorage);
//   const filtredTasks = parsedTasks.filter(e => e.id !== id);
//   localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(filtredTasks));
// }
