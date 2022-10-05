import { format } from 'date-fns';

export function createTask(
  value,
  user = 0,
  status = false,
  btnText = false,
  btnClass = false,
  date = false,
  id = Date.now()
) {
  return {
    value,
    id,
    date,
    isChecked: status,
    btnText,
    btnClass,
    user,
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
      <p class="date"> ${booleanCheck(
        date,
        date,
        format(new Date(), 'HH:mm dd.MM.y')
      )}</p>
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

export function createUserInformation(userName, photoUrl) {
  return `<img class="user-photo" src="${photoUrl}" alt="user-photo" width="20">
  <p class="user-name">${userName}</p>`;
}
