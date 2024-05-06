// We need to import useState from react to use the state
import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  // Here we wan't something to save the current state of the application
  // We need to notify react to reach out to UI to display the new values
  // We can create a state variable to store the current state of the application
  // clickCount is the state variable and setClickCount is the function to update the state
  const [clickCount, setClickCount] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Januda Bethmin Is Here</p>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
