# **JavaScript Promises ::**

## **What is a Promise?**

- A **Promise** is a special type of object in JavaScript that represents the eventual completion (or failure) of an asynchronous operation.
- A Promise has three states:
  1.  **Pending**: The initial state, neither fulfilled nor rejected.
  2.  **Fulfilled**: The operation completed successfully, and `resolve` was called.
  3.  **Rejected**: The operation failed, and `reject` was called.

---

## **Creating a Promise**

- You create a Promise using the `new Promise()` constructor.
- The constructor takes a **callback function** with two arguments:
  - `resolve`: A function to fulfill the promise.
  - `reject`: A function to reject the promise.

### **Syntax**

```
const promise = new Promise((resolve, reject) => {
  // Asynchronous operation here
  if (successCondition) {
    resolve(value); // Marks the promise as fulfilled
  } else {
    reject(error);  // Marks the promise as rejected
  }
});

```

---

## **Synchronous vs Asynchronous Code in Promises**

### **Synchronous Code in Promises**

- The executor function inside the `Promise` runs synchronously when the promise is created.

- Example: **Output:**

  ```
  const promise = new Promise((resolve, reject) => {
    console.log("Inside Promise (synchronous)");
    resolve("Resolved value");
  });

  console.log("After creating promise");

  promise.then((value) => {
    console.log("Promise resolved:", value);
  });

  ```

  ```
  Inside Promise (synchronous)
  After creating promise
  Promise resolved: Resolved value

  ```

### **Asynchronous Code in Promises**

- When asynchronous code (like `setTimeout` or `fetch`) is inside a Promise, it delays the resolution or rejection until the async task completes.

- Example: **Output:**

  ```
  const promise = new Promise((resolve, reject) => {
    console.log("Inside Promise (asynchronous)");
    setTimeout(() => {
      resolve("Resolved after 2 seconds");
    }, 2000);
  });

  console.log("After creating promise");

  promise.then((value) => {
    console.log("Promise resolved:", value);
  });

  ```

  ```
  Inside Promise (asynchronous)
  After creating promise
  Promise resolved: Resolved after 2 seconds

  ```

---

## **Key Points about `resolve` and `reject`**

- **`resolve`**:
  - Marks the promise as fulfilled.
  - Passes a value to the `.then()` handlers.
- **`reject`**:
  - Marks the promise as rejected.
  - Passes an error to the `.catch()` handlers.

### **Example with `resolve` and `reject`**

```
const myPromise = new Promise((resolve, reject) => {
  const success = true;
  if (success) {
    resolve("Operation succeeded!");
  } else {
    reject("Operation failed!");
  }
});

myPromise
  .then((value) => console.log(value)) // Runs if resolved
  .catch((error) => console.error(error)); // Runs if rejected

```

---

## **Chaining Promises**

- You can chain `.then()` to handle the results of previous promises.

- Each `.then()` returns a new promise, allowing further asynchronous processing.

- Example: **Output:**

  ```
  const promise = new Promise((resolve, reject) => {
    resolve(10);
  });

  promise
    .then((value) => value * 2)
    .then((value) => value + 5)
    .then((value) => console.log("Final result:", value));

  ```

  ```
  Final result: 25

  ```

---

## **Handling Errors in Promises**

- Use `.catch()` to handle errors in promises.

- Errors can be explicitly triggered by calling `reject` or thrown inside the executor or `.then()` handlers.

- Example: **Output:**

  ```
  const promise = new Promise((resolve, reject) => {
    reject("Error occurred!");
  });

  promise
    .then((value) => console.log(value))
    .catch((error) => console.error("Caught error:", error));

  ```

  ```
  Caught error: Error occurred!

  ```

---

## **Combining Promises**

### **`Promise.all`**

- Runs multiple promises in parallel and waits for all of them to resolve.

- If any promise rejects, the entire `Promise.all` rejects.

- Example: **Output:**

  ```
  const p1 = Promise.resolve(1);
  const p2 = Promise.resolve(2);
  const p3 = Promise.resolve(3);

  Promise.all([p1, p2, p3]).then((values) => {
    console.log("All resolved values:", values);
  });

  ```

  ```
  All resolved values: [1, 2, 3]

  ```

### **`Promise.race`**

- Resolves or rejects as soon as one promise settles (whichever is faster).

- Example: **Output:**

  ```
  const p1 = new Promise((resolve) => setTimeout(() => resolve("First!"), 1000));
  const p2 = new Promise((resolve) => setTimeout(() => resolve("Second!"), 2000));

  Promise.race([p1, p2]).then((value) => {
    console.log("Race winner:", value);
  });

  ```

  ```
  Race winner: First!

  ```

---

## **Promise Behavior**

- **Promises are always asynchronous:**

  - Even if a promise resolves immediately, its `.then()` callback is added to the microtask queue and runs after the current synchronous code.

- **Example:Output:**

  ```
  const promise = Promise.resolve("Resolved!");

  console.log("Before promise");

  promise.then((value) => {
    console.log(value);
  });

  console.log("After promise");

  ```

  ```
  Before promise
  After promise
  Resolved!

  ```

---

## **Practical Use Case: Fetching Data**

```
function fetchMovies() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([
        { title: "Inception", rating: 8.8 },
        { title: "Interstellar", rating: 8.6 },
      ]);
    }, 2000);
  });
}

fetchMovies()
  .then((movies) => {
    movies.forEach((movie) => {
      console.log(`${movie.title} - Rating: ${movie.rating}`);
    });
  })
  .catch((error) => {
    console.error("Error fetching movies:", error);
  });

```

---

## **Summary of Key Points**

- **Promises** allow you to handle asynchronous operations cleanly.
- Use `resolve` for success and `reject` for errors.
- `.then()` handles resolved values, while `.catch()` handles errors.
- Promises are always asynchronous, even for synchronous code.
- Use chaining or helper methods (`Promise.all`, `Promise.race`) to manage multiple promises.

<h1>when creating Promises in javasript using new keyword there are two parameters passed resolve and reject . what are these? </h1>

When you create a **Promise** in JavaScript using the `new Promise` constructor, you pass a **callback function** as an argument. This callback function takes two parameters: **`resolve`** and **`reject`**. These are functions provided by the JavaScript engine that allow you to control the state of the Promise.

---

### **`resolve`**

- **Purpose**: The `resolve` function is used to mark the Promise as **fulfilled (successful)** and pass the resulting value to the `.then()` handlers.
- **What it does**:
  - Changes the Promise state from **"pending"** to **"fulfilled"**.
  - Passes the resolved value to the next `.then()` in the Promise chain.
- **When to use**: Call `resolve` when the asynchronous operation completes successfully.

#### Example:

```
const myPromise = new Promise((resolve, reject) => {
  const data = "Success!";
  resolve(data); // Fulfill the promise with the value "Success!"
});

myPromise.then((result) => {
  console.log(result); // Logs: "Success!"
});

```

---

### **`reject`**

- **Purpose**: The `reject` function is used to mark the Promise as **rejected (failed)** and pass the error reason to the `.catch()` handlers.
- **What it does**:
  - Changes the Promise state from **"pending"** to **"rejected"**.
  - Passes the error to the `.catch()` handler.
- **When to use**: Call `reject` when the asynchronous operation encounters an error or fails.

#### Example:

```
const myPromise = new Promise((resolve, reject) => {
  const error = "Something went wrong!";
  reject(error); // Reject the promise with an error message
});

myPromise.catch((error) => {
  console.log(error); // Logs: "Something went wrong!"
});

```

---

### **How `resolve` and `reject` Work Together**

- A Promise can only transition from **"pending"** to either:
  1.  **"fulfilled"** when `resolve` is called.
  2.  **"rejected"** when `reject` is called.
- Once a Promise has transitioned to a settled state (fulfilled or rejected), it cannot change state again.

#### Example: Simulating an Asynchronous Task

```
const myPromise = new Promise((resolve, reject) => {
  const isSuccess = true; // Simulate success or failure
  if (isSuccess) {
    resolve("Task completed successfully!");
  } else {
    reject("Task failed!");
  }
});

myPromise
  .then((result) => {
    console.log(result); // Logs: "Task completed successfully!" if resolved
  })
  .catch((error) => {
    console.error(error); // Logs: "Task failed!" if rejected
  });

```

---

### **Key Points about `resolve` and `reject`**

1.  **Only one can be called**:

    - Once you call `resolve` or `reject`, the Promise is settled and its state cannot change.
    - Example:

      ```
      const myPromise = new Promise((resolve, reject) => {
        resolve("Done!");
        reject("This won't be executed."); // Ignored
      });

      ```

2.  **Optional Values**:

    - Both `resolve` and `reject` can take a value or reason, but they are optional.
    - Example:

      ```
      const myPromise = new Promise((resolve) => {
        resolve(); // Resolves with `undefined`
      });

      myPromise.then((result) => {
        console.log(result); // Logs: undefined
      });

      ```

3.  **Chaining with `.then()` and `.catch()`**:

    - Values passed to `resolve` or `reject` are accessible in `.then()` and `.catch()` handlers, respectively.
    - Example:

      ```
      const myPromise = new Promise((resolve, reject) => {
        resolve("Hello, world!");
      });

      myPromise
        .then((result) => {
          console.log(result); // Logs: "Hello, world!"
          throw new Error("Something went wrong!"); // Triggers the catch block
        })
        .catch((error) => {
          console.error(error.message); // Logs: "Something went wrong!"
        });

      ```

---

### **Common Use Case Example: Simulating an API Request**

```
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

```

---

### **Summary of `resolve` and `reject`**

| Aspect           | `resolve`                        | `reject`                         |
| ---------------- | -------------------------------- | -------------------------------- |
| **Purpose**      | Fulfill the Promise with a value | Reject the Promise with a reason |
| **State Change** | "pending" → "fulfilled"          | "pending" → "rejected"           |
| **Next Step**    | Triggers `.then()` handlers      | Triggers `.catch()` handlers     |
| **Use Case**     | Successful completion            | Failure or error                 |

## **Consuming a Promise in JavaScript**

Consuming a promise refers to using a promise that has been returned by some function or operation. When you consume a promise, you handle its eventual resolution (success) or rejection (failure) using methods like `.then()`, `.catch()`, and optionally `.finally()`.

---

### **Key Methods for Consuming Promises**

1.  **`.then()`**:

    - Used to handle the **fulfilled (resolved)** state of a promise.
    - It takes a callback function that is executed with the resolved value of the promise.

    **Example:**

    ```
    const promise = Promise.resolve("Hello, World!");

    promise.then((value) => {
      console.log("Resolved value:", value); // Output: Resolved value: Hello, World!
    });

    ```

2.  **`.catch()`**:

    - Used to handle the **rejected** state of a promise.
    - It takes a callback function that is executed with the reason for rejection.

    **Example:**

    ```
    const promise = Promise.reject("Something went wrong!");

    promise.catch((error) => {
      console.error("Error:", error); // Output: Error: Something went wrong!
    });

    ```

3.  **`.finally()`**:

    - Used to execute code **after the promise is settled** (either resolved or rejected).
    - It does not modify the value or error of the promise.

    **Example:**

    ```
    const promise = Promise.resolve("Success!");

    promise
      .then((value) => {
        console.log("Resolved value:", value);
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        console.log("Promise is settled!"); // Always runs
      });

    ```

---

### **Example: Consuming a Promise from an API**

Promises are commonly used for tasks like fetching data from APIs. Here's an example:

```
function fetchData() {
  return new Promise((resolve, reject) => {
    const success = true; // Simulating a successful API call
    setTimeout(() => {
      if (success) {
        resolve({ id: 1, name: "John Doe" });
      } else {
        reject("Failed to fetch data!");
      }
    }, 2000);
  });
}

fetchData()
  .then((data) => {
    console.log("Data received:", data);
  })
  .catch((error) => {
    console.error("Error:", error);
  })
  .finally(() => {
    console.log("Fetch operation complete.");
  });

```

**Output:**

```
Fetch operation complete.
Data received: { id: 1, name: "John Doe" }

```

---

### **Chaining Promises**

When consuming promises, you can chain `.then()` calls to perform sequential operations. Each `.then()` returns a new promise.

**Example:**

```
const fetchNumber = new Promise((resolve) => resolve(5));

fetchNumber
  .then((number) => {
    console.log("Received:", number);
    return number * 2; // Pass result to the next `.then()`
  })
  .then((result) => {
    console.log("After doubling:", result);
    return result + 10;
  })
  .then((finalResult) => {
    console.log("Final Result:", finalResult);
  })
  .catch((error) => {
    console.error("Error occurred:", error);
  });

```

**Output:**

```
Received: 5
After doubling: 10
Final Result: 20

```

---

### **Handling Errors in Promises**

Errors in a promise chain are "bubbled up" to the nearest `.catch()` method.

**Example:**

```
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("Something went wrong!");
  }, 1000);
});

promise
  .then((value) => {
    console.log("Value:", value);
  })
  .then(() => {
    console.log("This will not run if the promise is rejected.");
  })
  .catch((error) => {
    console.error("Caught error:", error);
  })
  .finally(() => {
    console.log("Promise is done!");
  });

```

**Output:**

```
Caught error: Something went wrong!
Promise is done!

```

---

### **Consuming Promises with `async/await`**

Instead of using `.then()` and `.catch()`, you can consume promises with the `async/await` syntax for cleaner and more readable code.

**Example:**

```
async function fetchData() {
  try {
    const response = await new Promise((resolve) => {
      setTimeout(() => resolve("Fetched data"), 1000);
    });
    console.log("Response:", response);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    console.log("Operation complete.");
  }
}

fetchData();

```

**Output:**

```
Response: Fetched data
Operation complete.

```

---

### **Real-World Example: Fetch API**

The Fetch API returns a promise, which can be consumed to handle HTTP requests.

**Example with `.then()`:**

```
fetch("https://api.example.com/data")
  .then((response) => response.json()) // Parse JSON response
  .then((data) => {
    console.log("Data:", data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

```

**Example with `async/await`:**

```
async function fetchData() {
  try {
    const response = await fetch("https://api.example.com/data");
    const data = await response.json();
    console.log("Data:", data);
  } catch (error) {
    console.error("Error:", error);
  }
}

fetchData();

```

---

### **Summary**

- To consume a promise:
  1.  Use `.then()` for resolved values.
  2.  Use `.catch()` for rejected values.
  3.  Use `.finally()` for cleanup after the promise settles.
- You can chain `.then()` to handle successive operations.
- Errors are automatically propagated to the nearest `.catch()` in a chain.
- Use `async/await` for more readable and synchronous-looking code.

### **Call Stack, Event Loop, Callback Queue, and Microtask Queue in Terms of Consuming Promises**

JavaScript is a **single-threaded** language, which means it executes one task at a time using the **Call Stack**. However, it can handle asynchronous operations efficiently using the **Event Loop**, **Callback Queue**, and **Microtask Queue**.

When consuming Promises, these concepts determine how and when the `.then()`, `.catch()`, or `async/await` handlers are executed.

---

### **Components of JavaScript's Execution Model**

1.  **Call Stack**:

    - It keeps track of the current function being executed.
    - Functions are pushed onto the stack when called and popped off when they return.

2.  **Event Loop**:

    - Monitors the Call Stack and decides what to execute next.
    - It prioritizes tasks from the **Microtask Queue** over the **Callback Queue**.

3.  **Microtask Queue**:

    - Contains tasks that need to run immediately after the current operation completes (e.g., `.then()` or `catch()` handlers of Promises).
    - Has higher priority than the Callback Queue.

4.  **Callback Queue**:

    - Stores callbacks from asynchronous operations (e.g., `setTimeout`, event listeners).
    - Processed only after the Call Stack is clear and the Microtask Queue is empty.

---

### **Flow of Execution with Promises**

When you consume Promises, here's what happens:

1.  The Promise executor function runs **synchronously** and is placed on the Call Stack.
2.  If a `.then()` or `catch()` is attached to the Promise, its callback is scheduled in the **Microtask Queue**.
3.  The Event Loop:
    - Checks the Call Stack. If it's empty, it processes tasks from the Microtask Queue first.
    - Only after the Microtask Queue is empty, it processes tasks from the Callback Queue.

---

### **Example: Promises with Microtask and Callback Queue**

```
console.log("Script start");

const promise = Promise.resolve("Promise resolved");

setTimeout(() => {
  console.log("setTimeout callback");
}, 0);

promise
  .then((value) => {
    console.log(value); // Microtask
  })
  .catch((error) => {
    console.log(error); // Microtask
  });

console.log("Script end");

```

---

### **Execution Flow**:

1.  **Call Stack**:

    - `console.log("Script start")` is executed → Logs `Script start`.
    - `Promise.resolve("Promise resolved")` creates a promise. No `.then()` is executed immediately.
    - `setTimeout` schedules a callback in the **Callback Queue** and exits.
    - `console.log("Script end")` is executed → Logs `Script end`.

2.  **Microtask Queue**:

    - The `.then()` callback from the Promise is added to the **Microtask Queue**.

3.  **Callback Queue**:

    - The `setTimeout` callback is added to the **Callback Queue**.

4.  **Event Loop**:

    - After the Call Stack is empty, the Event Loop processes the **Microtask Queue** first.
    - The `.then()` callback is executed → Logs `Promise resolved`.
    - Only then does the Event Loop process the **Callback Queue**:
      - Executes the `setTimeout` callback → Logs `setTimeout callback`.

**Output**:

```
Script start
Script end
Promise resolved
setTimeout callback

```

---

### **Adding Another Promise**

If we add another Promise to the `.then()` chain:

```
console.log("Script start");

const promise = Promise.resolve("Promise resolved");

setTimeout(() => {
  console.log("setTimeout callback");
}, 0);

promise
  .then((value) => {
    console.log(value);
    return Promise.resolve("Second promise resolved");
  })
  .then((value) => {
    console.log(value);
  });

console.log("Script end");

```

---

### **Execution Flow**:

1.  **Call Stack**:

    - Executes `console.log("Script start")` → Logs `Script start`.
    - Executes `Promise.resolve("Promise resolved")`.
    - Schedules `setTimeout` in the Callback Queue.
    - Executes `console.log("Script end")` → Logs `Script end`.

2.  **Microtask Queue**:

    - The first `.then()` callback is added to the **Microtask Queue**.
    - The Event Loop processes it:
      - Logs `Promise resolved`.
      - Returns a new Promise, scheduling its `.then()` callback in the **Microtask Queue**.

3.  **Callback Queue**:

    - Processes the `setTimeout` callback after the Microtask Queue is empty.

**Output**:

```
Script start
Script end
Promise resolved
Second promise resolved
setTimeout callback

```

---

### **Microtask Queue vs Callback Queue**

1.  Microtasks (e.g., `.then()`):

    - Higher priority.
    - Always executed before the Callback Queue tasks, even if both are scheduled at the same time.

2.  Callback Queue (e.g., `setTimeout`):

    - Lower priority.
    - Executed only after the Microtask Queue is empty.

---

### **Promises with `async/await`**

When you use `async/await`, the `await` keyword pauses execution of the **async function** until the Promise is resolved. However, this pausing happens only for the async function, not for the rest of the script.

**Example**:

```
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

```

---

### **Execution Flow**:

1.  **Call Stack**:

    - Executes `console.log("Script start")` → Logs `Script start`.
    - Executes `asyncFunction()`:
      - Logs `Async function start`.
      - Encounters `await`, pauses execution of the function.
    - Executes `setTimeout` → Schedules callback in the Callback Queue.
    - Executes `console.log("Script end")` → Logs `Script end`.

2.  **Microtask Queue**:

    - Resolves the Promise used with `await` and schedules its continuation (rest of the `asyncFunction`).

3.  **Callback Queue**:

    - Processes the `setTimeout` callback after the Microtask Queue is empty.

**Output**:

```
Script start
Async function start
Script end
Awaited value
Async function end
setTimeout callback

```

---

### **Summary of Execution Priority**

1.  Synchronous code in the Call Stack runs first.
2.  The Event Loop processes:
    - Microtask Queue (`.then()` callbacks, resolved Promises).
    - Callback Queue (`setTimeout`, event listeners).

Promises and `async/await` rely on the **Microtask Queue**, ensuring they are prioritized over other asynchronous tasks like `setTimeout`.

### **Difference Between Callback Queue and Microtask Queue**

Both the **Callback Queue** and **Microtask Queue** are used in JavaScript's asynchronous execution model, but they are designed to handle different kinds of tasks. Below is a detailed explanation of what is stored in each queue:

---

### **Callback Queue**

The **Callback Queue** (or **Task Queue**) stores **macrotasks**, which are larger asynchronous operations that are scheduled to run after the Call Stack is empty and the Microtask Queue is cleared.

#### **Examples of Tasks Stored in the Callback Queue**:

1.  **Timers**:
    - Callbacks from `setTimeout()` and `setInterval()`.
2.  **DOM Events**:
    - Click events, keypress events, or any other browser event listeners.
3.  **I/O Tasks**:
    - File system operations or network requests in environments like Node.js.
4.  **Message Channels**:
    - Callbacks from `postMessage` or `MessageChannel`.

#### **Execution Priority**:

- Lower priority compared to tasks in the Microtask Queue.
- Executed only after the Call Stack is empty and the Microtask Queue is completely cleared.

**Example**:

```
console.log("Script start");

setTimeout(() => {
  console.log("setTimeout callback");
}, 0);

console.log("Script end");

```

**Execution Flow**:

1.  `console.log("Script start")` → Logs `Script start`.
2.  `setTimeout` schedules the callback in the **Callback Queue**.
3.  `console.log("Script end")` → Logs `Script end`.
4.  After the Call Stack is empty, the Event Loop processes the Callback Queue.
    - Logs `setTimeout callback`.

**Output**:

```
Script start
Script end
setTimeout callback

```

---

### **Microtask Queue**

The **Microtask Queue** stores **microtasks**, which are smaller, more immediate asynchronous operations. These tasks are scheduled to run as soon as the currently executing code (synchronous or asynchronous) finishes, **before any macrotasks (Callback Queue tasks)**.

#### **Examples of Tasks Stored in the Microtask Queue**:

1.  **Promise Callbacks**:
    - `.then()`, `.catch()`, and `.finally()` handlers of Promises.
2.  **Mutation Observers**:
    - Callbacks from `MutationObserver` API.
3.  **QueueMicrotask**:
    - Tasks explicitly queued using `queueMicrotask()`.

#### **Execution Priority**:

- Higher priority compared to the Callback Queue.
- All microtasks are executed before any macrotask.

**Example**:

```
console.log("Script start");

Promise.resolve().then(() => {
  console.log("Promise resolved");
});

console.log("Script end");

```

**Execution Flow**:

1.  `console.log("Script start")` → Logs `Script start`.
2.  `Promise.resolve()` schedules its `.then()` callback in the **Microtask Queue**.
3.  `console.log("Script end")` → Logs `Script end`.
4.  After the Call Stack is empty, the Event Loop processes the **Microtask Queue**:
    - Logs `Promise resolved`.

**Output**:

```
Script start
Script end
Promise resolved

```

---

### **Comparison Between Callback Queue and Microtask Queue**

| Feature                | **Callback Queue**                          | **Microtask Queue**                            |
| ---------------------- | ------------------------------------------- | ---------------------------------------------- |
| **Tasks Stored**       | Macrotasks (e.g., `setTimeout`, DOM events) | Microtasks (e.g., `.then()`, `queueMicrotask`) |
| **Execution Priority** | Lower priority, runs after Microtask Queue  | Higher priority, runs before Callback Queue    |
| **Examples**           | `setTimeout`, `setInterval`, DOM Events     | Promises, Mutation Observers                   |
| **When Executed**      | After the Microtask Queue is empty          | As soon as the current Call Stack is clear     |
| **Use Case**           | For less urgent, deferred tasks             | For immediate, small follow-up tasks           |

---

### **Combined Example: Microtask vs Callback Queue**

```
console.log("Script start");

setTimeout(() => {
  console.log("setTimeout callback");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise resolved");
});

console.log("Script end");

```

---

**Execution Flow**:

1.  **Call Stack**:

    - `console.log("Script start")` → Logs `Script start`.
    - `setTimeout` schedules its callback in the **Callback Queue**.
    - `Promise.resolve()` schedules its `.then()` callback in the **Microtask Queue**.
    - `console.log("Script end")` → Logs `Script end`.

2.  **Microtask Queue**:

    - Executes `Promise.resolve().then()` → Logs `Promise resolved`.

3.  **Callback Queue**:

    - Executes `setTimeout` callback → Logs `setTimeout callback`.

**Output**:

```
Script start
Script end
Promise resolved
setTimeout callback

```

---

### **Why This Matters**

Understanding the differences between the Callback Queue and Microtask Queue is essential for:

1.  Writing predictable asynchronous code.
2.  Debugging timing issues in your applications.
3.  Optimizing performance by appropriately scheduling tasks.

### **Key Points to Remember**

1.  **Global Code** (synchronous) is executed first.
2.  **Microtask Queue** tasks (Promises, etc.) have higher priority than the **Callback Queue** tasks.
3.  The **Callback Queue** (macrotasks) is processed only after the Microtask Queue is cleared.
