function* getElement() {
  console.log("this is generator start");
  yield 1;
  yield 2;
  console.log("middleee");
  yield 3;
  yield 4;
}

const gen = getElement();
console.log(gen.next());
