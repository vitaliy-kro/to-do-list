export default function addToDOM(element, markup) {
  element.insertAdjacentHTML('afterbegin', markup);
}
