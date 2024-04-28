// We need to import the environment variables at the very start of the file
// Says to setup and configure .env file
import "dotenv/config";

// Importing express module
// This is same as import "express/config" but we also get a shorthand called express
import express from "express";

// Importing the notes module
import NoteModel from "./models/notes";

// Creating an instance of express
// This app will act as our server
const app = express();

// Note: Arrow functions are functions without a name

// This is an endpoint HTTP get request
// We need to use async because we are using await inside the function
app.get("/", async (req, res) => {
  // We need to use a try catch block to catch any errors that might occur
  // By using try catch blocks, we can catch the errors and send a responses to the frontend
  // Our server will not crash if something goes wrong
  try {
    // Simulating an error by throwing an error
    // throw Error("Bazinga!");

    // Sending a response
    // We need to get the notes out of the database and return them
    // NoteModel.find().exec() will execute the find operation and return a promise
    // Find is a asynchronous operation, so we need to use await because it will take some time
    const notes = await NoteModel.find().exec();
    // We need to set the http status code to 200
    // It means ok or success
    // And send the notes as a json object to the frontend
    // Here we don't need to use curly braces because we notes is an object, and json knows how to convert objects into json
    res.status(200).json(notes);
  } catch (error) {
    // Log the error to the console
    console.error(error);
    // We use let because we will change the value of errorMessage later
    let errorMessage = "Internal Server Error";
    // We need to check if the code is actually throwing an error. (They can also throw null, strings, numbers, etc)
    if (error instanceof Error) {
      // Every instance of error has a message property
      // We can use this to set the error message
      errorMessage = error.message;
    }
    // We need to set the http status code to 500
    // It means internal server error
    // We need to add curly braces because we need to send in json format
    res.status(500).json({ error: errorMessage });
  }
});

// We need to export the app so that we can use it in the server.ts file
// We don't need to use curly braces because we have a single export
export default app;
