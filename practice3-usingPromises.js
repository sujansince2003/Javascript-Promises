const res = require("express/lib/response");

function downloadfromUrl(url) {
  return new Promise((resolve, reject) => {
    console.log("downlaoding from url" + url);
    setTimeout(() => {
      const data = "there are 40 students";
      resolve(data);
    }, 2000);
  });
}

//writing into the file
function writeTofile(filename, datatosave) {
  return new Promise((resolve, reject) => {
    console.log("writing into file");
    setTimeout(() => {
      const message =
        "file is written with data " + datatosave + "saved to" + filename;
      resolve(message);
    }, 4000);
  });
}

function uploadtoUrl(url, fileName) {
  return new Promise((resolve, reject) => {
    console.log("uploading file");
    setTimeout(() => {
      const message = "file is uploaded to url " + url;
      resolve(message);
    }, 5000);
  });
}

downloadfromUrl("downurl.com")
  .then((downloadedData) => {
    return writeTofile("data.txt", downloadedData);
  })
  .then((result) => {
    return uploadtoUrl("upurl.com", result);
  });

//old logic: bad implementations
// downloadfromUrl("apiurl.com")
//   .then((result) => {
//     console.log("writing into file");
//     setTimeout(() => {
//       const message = "file is written with data " + result;
//       return message;
//     }, 4000);
//   })
//   .then((result) => {
//     console.log("uploading file");
//     setTimeout(() => {
//       const message = result;
//       console.log(message);
//     }, 5000);
//   });
