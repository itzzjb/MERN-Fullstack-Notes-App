# MERN NOTES APP

- **M**: MongoDB
- **E**: Express JS
- **R**: React JS
- **N**: Node Js

**TypeScript**: This is superset of JavaScript that you will be able to declare the type of variables. Similar to Java, Kotlin and Swift.

> [!TIP]
> TypeScript can be used anywhere you use normal JavaScript.

**Bootstrap** : This is a package that you can use with React to get UI responsive components easily.

> [!NOTE]
> When we are using React we are creating a single-page application. We don't reload the whole page but the content that must be change on any event (like navigating to another page) will be changed using JavaScript. We are getting data from the backend in JSON format via HTTP requests.

**Client-side Rendering** : We don't receive full page from the the server, we only receive the shell.

**NextJs** : Framework on top of React that enables you to have more control over what data you load on client-side and what pages you load server-side (where the data is already in the page when coming from the server).

> [!NOTE]
> NodeJs allows JavaScript code to run in a server environment. Normally, JavaScript is meant as a language for web browsers. Because of NodeJs we can write our backend using JavaScript too.

**npm**: Node Package Manager (build tool like maven and gradle)

> [!IMPORTANT]
> Front-end shouldn't contain critical details (users can inspect the code). It should only be a user interface to communicate with the back-end. Back-end is like a black-box for users. They can't see what's happening. It runs in a different machine, not in the browser. The front-end only can communicate with the back-end using Requests and Responses. (HTTP)

## Is this a REST API ?

REST API is also a backend-server, but it fulfills certain constraints. They are usually the servers that used by many different clients. So, they follow many rules and one of them is they don't contain any state.

But this server will later contains states, because the user will be able to login, and for each login there will be a session in the database, and lets the server know that this user is logged in. This is a violation of the restful constraints.

This is not a public public REST API, this is just our own backend server. This can only be used by a single client at a time.

> [!TIP]
> We can build a public REST API using the same concepts and code used here by adding more functionalities.

## Declarative UI Explained

`app.tsx`

```tsx
// We need to import useState from react to use the state
import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Button } from "react-bootstrap";

function App() {
  // Here we want something to save the current state of the application
  // We need to notify react to reach out to UI to display the new values
  // We can create a state variable to store the current state of the application
  // clickCount is the state variable and setClickCount is the function to update the state
  // Because we initialized the state with 0, clickCount is 0
  const [clickCount, setClickCount] = useState(0);

  // The return statement returns the actual UI element
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Januda Bethmin Is Here</p>
        {/* Button is a react-bootstrap component */}
        {/* We can pass the clickCount variable to the Button component */}
        {/* We can set a onClick event listener to the button and call the setClickCount function to update the state */}
        {/* The clickCount will be incremented once the button is clicked*/}
        <Button onClick={() => setClickCount(clickCount + 1)}>
          Clicked {clickCount} times
        </Button>
      </header>
    </div>
  );
}

export default App;
```

## Fetching Data in React

Before fetching the notes from the database we need to create a model for notes. (just as the backend)

We can create `models` directory inside the `src` directory and create a `notes.ts` file.
