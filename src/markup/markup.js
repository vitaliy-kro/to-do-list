import { format } from 'date-fns';

export function createTask(value, status = false) {
  return {
    value,
    id: Date.now(),
    date: format(new Date(), 'HH:mm dd.MM.y'),
    isChecked: status,
  };
}
export function createMarkup(tasks) {
  return tasks
    .map(
      ({ id, value, date, isChecked }) => `<li class="item ${
        isChecked ? 'checked' : ''
      }" data-id="${id}">
      <p class="date">Create date: ${date}</p>
        <p class="text">${value} </p>
        <button class="button close-js done" type="button">Done</button>
      </li>`
    )
    .join('');
}
export function deleteTask(task) {
  task.parentNode.remove();
}
