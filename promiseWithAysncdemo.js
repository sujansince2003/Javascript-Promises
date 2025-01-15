console.log("Script start");

async function asyncFunction() {
  console.log("Async function start");
  const value = await Promise.resolve("Awaited value");
  console.log(value);
  console.log("Async function end");
}

asyncFunction();

setTimeout(() => {
  console.log("setTimeout callback");
}, 0);

console.log("Script end");
