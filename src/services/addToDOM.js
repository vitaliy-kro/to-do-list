export default function addToDOM(element, markup, position = 'afterbegin') {
  element.insertAdjacentHTML(position, markup);
}
