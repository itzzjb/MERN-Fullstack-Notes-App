// We have all the functions that are related to the routs of the notes in the notesControllers.ts file here.

// RequestHandler types need to be imported from express
import { RequestHandler } from "express";
// We need to import the NoteModel from the models folder
import NoteModel from "../models/notes";

// We need export the functions so they can be used in the routes
// We don't use export default because we have multiple exports

// We need to use async because we are using await inside the function
// We need to tell what kind of function getNotes is because otherwise typescript can't automatically infer the types of the arguments
export const getNotes: RequestHandler = async (req, res, next) => {
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
};
