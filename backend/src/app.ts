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
  // Sending a response
  // We need to get the notes out of the database and return them
  // NoteModel.find().exec() will execute the find operation and return a promise
  // Find is a asynchronous operation, so we need to use await because it will take some time
  const notes = await NoteModel.find().exec();
  // We need to set the http status code to 200
  // And send the notes as a json object to the frontend
  res.status(200).json(notes);
});

// We need to export the app so that we can use it in the server.ts file
// We don't need to use curly braces because we have a single export
export default app;
