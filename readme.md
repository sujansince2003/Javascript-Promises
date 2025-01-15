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
