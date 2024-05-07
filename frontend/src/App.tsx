// We need to import useState, useEffect from react to use the state
import React, { useEffect, useState } from "react";
import "./App.css";
import { Note } from "./models/notes";

function App() {
  // Here we want something to save the current state of the application
  // We need to notify react to reach out to UI to display the new values
  // We can create a state variable to store the current state of the application

  // notes is the state variable and setNotes is the function to update the state
  // Remember that the if the state variable's name is notes, the function to update the state should be setNotes (likewise for other variables)
  // Because we are importing the notes from the notes.ts file as an array , we are using a empty array as the initial value
  // We also need to define the type of the state variable as an array of Note objects (<Note[]>)
  const [notes, setNotes] = useState<Note[]>([]);

  // We only want to fetch the notes once when the component is mounted
  // It should happen automatically without us needing to click a button (do anything)
  // We can use the useEffect hook to do this
  // The function inside useEffect will be called when the component is mounted
  useEffect(() => {
    // We are using fetch to make a request to the backend
    // We need to create a async function to use the await keyword
    // So we can create a function inside useEffect and call it
    async function fetchNotes() {
      // fetch call can send an error id something goes wrong
      // We can use try catch to handle the error
      try {
        // We can use the get all notes endpoint to get all the notes
        // We only need to set the /api/notes because we are using a proxy in the package.json file
        const response = await fetch("/api/notes", {
          method: "GET",
        });
        // Now we need to get the data from the response
        // This will pass the json body of the response to the notes variable
        const notes = await response.json();
        // Now we need to set the notes state variable to the data
        // When the status of the state variable (notes) changes by (setNotes), react will automatically update the UI
        setNotes(notes);
      } catch (error) {
        // For now wee can log the error to the console and send an alert (popup) to the user
        console.error(error);
        alert(error);
      }
    }
    // We need to call the fetchNotes function to make the request
    fetchNotes();
    // We need to add the empty array as the second argument to make sure the function is only called once
    // Otherwise the function will be called every time the component is rendered
    // We can also add other dependencies to the function
    // For example, we can add the notes array as a dependency to make sure the function is only called when the notes array changes
  }, []);

  // The return statement returns the actual UI element
  return (
    <div className="App">
      {/* Displaying the values that we received from the backend using fetch  */}
      {JSON.stringify(notes)}
    </div>
  );
}

export default App;
