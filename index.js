const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => resolve("Resolved after 2 seconds"), 2000);
});

console.log(myPromise);
// Immediately logs: Promise { <pending> }
