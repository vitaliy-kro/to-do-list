import { format } from 'date-fns';

export function createTask(
  value,
  status = false,
  btnText = false,
  btnClass = false
) {
  return {
    value,
    id: Date.now(),
    date: format(new Date(), 'HH:mm dd.MM.y'),
    isChecked: status,
    btnText,
    btnClass,
  };
}
export function createMarkup(tasks) {
  return tasks
    .map(
      ({
        id,
        value,
        date,
        isChecked,
        btnText,
        btnClass,
      }) => `<li class="item ${booleanCheck(
        isChecked,
        'checked'
      )}" data-id="${id}">
      <p class="date">Create date: ${date}</p>
        <p class="text">${value} </p>
        <button class="button close-js done ${booleanCheck(
          btnClass,
          'is-checked'
        )}" type="button">${booleanCheck(btnText, 'x', 'Done')}</button>
      </li>`
    )
    .join('');
}
export function deleteTask(task) {
  task.parentNode.remove();
}

function booleanCheck(bool, trueValue, falseValue = '') {
  return bool ? trueValue : falseValue;
}
