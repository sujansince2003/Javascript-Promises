console.log("start");

setTimeout(() => {
  console.log("this is timer 1");
}, 3000);

let x = Promise.resolve("promise resolved");

for (let i = 0; i < 10000000; i++) {}
x.then((result) => {
  console.log("this is fulfilled handler");
  console.log(result);
});

setTimeout(() => {
  console.log("This is timer 2");
}, 2000);

console.log("end");
