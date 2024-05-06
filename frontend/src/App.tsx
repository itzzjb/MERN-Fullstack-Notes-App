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
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
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
