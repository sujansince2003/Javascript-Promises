const myPromise = new Promise((resolve, reject) => {
  const fname = "sujan";
  resolve(fname); // resolve is called so it will change state to fullfilled and pass result to .then
});

// console.log(myPromise);
// myPromise.then((result) => console.log(result));

// const myPromise2 = new Promise((resolve, reject) => {
//   const data = "lets make promise rejected";
//   reject();  resolve is called so it will change state to rejected and pass result to .catch
// });

// myPromise2.catch((er) => console.log(er));

function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = true; // Simulate success or failure
      if (success) {
        resolve({ data: "Fetched data successfully!" });
      } else {
        reject("Failed to fetch data!");
      }
    }, 2000); // Simulate a 2-second delay
  });
}

fetchData()
  .then((result) => {
    console.log(result.data); // Logs: "Fetched data successfully!" if resolved
  })
  .catch((error) => {
    console.error(error); // Logs: "Failed to fetch data!" if rejected
  });
