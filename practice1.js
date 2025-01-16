function fetchData(url) {
  return new Promise((res, rej) => {
    console.log("startd fetcing ", url);
    setTimeout(() => {
      const data = "data from API ....";
      console.log("data fetched");
      res(data);
      console.log("data sent");
    }, 6000);
  });
}

console.log("start");
const myPromise = fetchData("api.com");
myPromise.then((result) => {
  console.log(result);
});
console.log("end");

/* 

### **Execution Flow** (Step-by-Step)

### **1. Start of Script (Global Code)**

- `"start"` is logged immediately.
- The **Call Stack** has the `console.log("start")` statement, which executes and logs to the console.

**Output so far:**

```
start

```

---

### **2. Calling `fetchData("api.com")`**

- The `fetchData` function is invoked.
- Inside `fetchData`, a new `Promise` is created.
- The `Promise` constructor's callback function (`(res, rej) => { ... }`) is immediately executed because the Promise starts as **pending** as soon as it's created.

---

### **3. Synchronous Code Inside the `Promise`**

- `"started fetching api.com"` is logged (inside the `Promise` constructor, but it is synchronous).
- The `setTimeout` is set to execute after 6 seconds, and the function inside `setTimeout` is pushed to the **Callback Queue**.

**Output so far:**

```
start
started fetching api.com

```

---
≈
### **4. Registering `.then()`**

- The `.then()` method is called on `myPromise`.
- This registers a callback (`result => console.log(result)`) to be executed when the `Promise` is resolved.
- At this point, nothing happens with `.then()` yet because the `Promise` is still **pending**.

---

### **5. Logging `"end"`**

- The `console.log("end")` statement is executed.
- The main script's synchronous code is now complete, and the **Call Stack** becomes empty.

**Output so far:**

```
start
started fetching api.com
end

```

---

### **6. Timer Expires (`setTimeout`)**

- After 6 seconds, the function inside the `setTimeout` is added to the **Callback Queue**.
- The Event Loop moves it to the **Call Stack** once the stack is empty.

---

### **7. Resolving the Promise**

- Inside the `setTimeout`, the following happens:
    - `"data fetched"` is logged.
    - `res(data)` is called, resolving the `Promise` with the value `"data from API ...."`.
    - `"data sent"` is logged.

**Output so far:**

```
start
started fetching api.com
end
data fetched
data sent

```

---

### **8. Executing `.then()` Callback**

- Resolving the Promise adds the `.then()` callback (`result => console.log(result)`) to the **Microtask Queue**.
- Microtasks are executed before tasks in the Callback Queue, but since the Call Stack is now clear, the `.then()` callback runs immediately.
- The `result` value is `"data from API ...."`, so it logs:

**Output so far:**

```
start
started fetching api.com
end
data fetched
data sent
data from API ....

```

---

### **Final Output**

```
start
started fetching api.com
end
data fetched
data sent
data from API ....

```

---

### **Key Takeaways**

1. The `Promise`'s executor function (inside `new Promise`) runs synchronously when the `Promise` is created.
2. `setTimeout` schedules a callback to the **Callback Queue**.
3. `Promise` resolution (`res(data)`) doesn't immediately execute `.then()` callbacks. Instead:
    - It places them in the **Microtask Queue**, which has higher priority than the Callback Queue.
4. After synchronous code completes, the Event Loop processes the Microtask Queue before the Callback Queue.

*/
