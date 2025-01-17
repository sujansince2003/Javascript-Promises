function Hello() {
  let x = 10;
  function printHello() {
    console.log("print hello");
    // x = x + 5;
    console.log(x + 5); //doining this will only print 15 nomatter how many times we call this function but if we modify it like in line 5 ,then in every function call value of x will be modified
  }
  return printHello;
}

let myfun = Hello();

myfun();
myfun();
myfun();
myfun();
