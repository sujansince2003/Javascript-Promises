const myPromise = new Promise((resolve, reject) => {
  console.log("this will log Immediately");
  resolve("resolved value passed to .then");
});

console.log("defined after promises");

myPromise.then((result) => {
  console.log(result);
});
/*  output::
this will log Immediately 
defined after promises
resolved value passed to .then   */
