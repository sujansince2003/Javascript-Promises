function getNextElement(array) {
  let index = 0;
  function next() {
    let element = array[index];
    index++;
    return element;
  }
  return next;
}

const getElement = getNextElement([1, 2, 3, 4, 5, 6]);
console.log(getElement);
console.log(getElement());
console.log(getElement());
console.log(getElement());
console.log(getElement());
