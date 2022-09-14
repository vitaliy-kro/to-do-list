export function createTask(value) {
  return { value, id: Date.now() };
}
export function createMarkup(tasks) {
  return tasks
    .map(
      ({ id, value }) => `<li class="item" data-id="${id}">
        <p class="text">${value}</p>
        <button class="button close-js" type="button">Done</button>
      </li>`
    )
    .join('');
}
export function deleteTask(task) {
  task.parentNode.remove();
}
