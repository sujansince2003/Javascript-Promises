// function download(url, cb) {
//   console.log("executing callback functions");
//   setTimeout(() => {
//     console.log("downloaded after 2 sec");
//     cb(url);
//   }, 2000);
// }

// download("myapi.com", function handleDowload(url) {
//   console.log("data fetching from", url);
// });
// problem here is what if callback function is not called like in line 5
// solution is to use promises
//let write same logic in promise

function download(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("downloaded after 2 sec");
      const data = "data is downlaoded from" + url;
      resolve(data);
    }, 2000);
  });
}

download("myapi.com").then((result) => {
  console.log("response from download api is", result);
});
