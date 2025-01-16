// function to download  from url

function downloadfromUrl(url, cb) {
  console.log("downlaoding from url");
  setTimeout(() => {
    const data = "students" + url;
    cb(data);
  }, 2000);
}

//function to write file

function writeFile(data, cb) {
  console.log("writing into file");
  setTimeout(() => {
    const message = "file is written with data " + data;
    cb(message);
  }, 4000);
}

function uploadFile(url, file, cb) {
  console.log("uploading file");
  setTimeout(() => {
    const message = file + "file is uploaded to url " + url;
    cb(message);
  }, 3000);
}

downloadfromUrl("myapi.com", (d) => {
  console.log(d);
  writeFile(d, (msg) => {
    console.log(msg);
    uploadFile("uploadurl", msg, (msg2) => {
      console.log(msg2);
    });
  });
});
