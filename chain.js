function myPromise() {
  return new Promise((resolve, reject) => {
    resolve("promise resolved");
  });
}

myPromise()
  .then((result) => {
    setTimeout(() => {
      console.log("timer 1");
      console.log(result);
      return result;
    }, 4000);
  })
  .then((result) => {
    setTimeout(() => {
      console.log("timer 2");
      console.log("hello" + result);
    }, 1000);
  });
