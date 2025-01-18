function* Hello() {
  console.log("start");
  let x = 10;
  yield x;
  yield 5;
  console.log("end", x);
  x = x + (yield 5); //when code reach to yield it will not do x+5 instead it will stop code here and give { value: 5, done: false } now to add something to x we need to call next() with parameter eg: next(3) this will add 3 to x and code will continue.k bujna paryo vanda yield le code rokxa yeha ani feri next() call garda it will continue again but value need to be passsed from next()
  console.log("sum up", x);
}

let gen = Hello();
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());
console.log(gen.next(4));
