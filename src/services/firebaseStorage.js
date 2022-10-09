import { initializeApp } from 'firebase/app';
import firebaseConfig from '../firebase/firebase';
import { getDatabase, ref, set, get, update, remove } from 'firebase/database';
const app = initializeApp(firebaseConfig);

const db = getDatabase();

export function addToFirebaseStorage(task) {
  try {
    set(ref(db, `todo ${task.user}/${task.id}`), task);
  } catch (error) {
    console.log(error);
  }
}

export function getTasksFromFirebaseStorage(id) {
  return get(ref(db, `todo ${id}/`))
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
  } catch (error) {}
}
