const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => resolve("Resolved after 2 seconds"), 2000);
});

const x = myPromise;
console.log(x);
myPromise.then((result) => {
  console.log(result);
  console.log(x);
});
