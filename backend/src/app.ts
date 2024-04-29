// We need to import the environment variables at the very start of the file
// Says to setup and configure .env file
import "dotenv/config";

// Importing express module
// This is same as import "express/config" but we also get a shorthand called express
// NextFunction, Request, Response are types from express that are used to define the types of arguments used in the error handler
import express, { NextFunction, Request, Response } from "express";

// Importing the notes module
import NoteModel from "./models/notes";

// Creating an instance of express
// This app will act as our server
const app = express();

// Note: Arrow functions are functions without a name

// This is an endpoint HTTP get request
// We need to use async because we are using await inside the function
app.get("/", async (req, res, next) => {
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
    // next is a function that will call the next middleware
    // Middleware is a function that will be called before the endpoint
    // Following will pass the error to the error handler
    next(error);
  }
});

// This will be the error handler
// It will be called whenever an error occurs
// We need to use app.use to set up the error handler
// This has a specific set of arguments, otherwise express will not know that this is an error handler
// In above get functions we didn't want to specify the type of arguments. Type script will automatically infer the types.
// But here we need to specify the types of the arguments

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
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
});

// We need to export the app so that we can use it in the server.ts file
// We don't need to use curly braces because we have a single export
export default app;
