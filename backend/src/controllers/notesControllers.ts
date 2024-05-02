// We have all the functions that are related to the routs of the notes in the notesControllers.ts file here.

// RequestHandler types need to be imported from express
import { RequestHandler } from "express";
// We need to import the NoteModel from the models folder
import NoteModel from "../models/notes";
import createHttpError from "http-errors";

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
    // throw Error("Simulated Error!");

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

// We need to have an endpoint to get a single note
export const getNote: RequestHandler = async (req, res, next) => {
  // We need to get the id from the request parameters
  // We can use req.params to get the parameters
  // We can get the id from the parameters into a separate variable
  const noteId = req.params.noteId;
  try {
    // We need to get the note out of the database and return it
    // NoteModel.findById(id).exec() will execute the findById operation and return a promise
    // FindById is a asynchronous operation, so we need to use await because it will take some time
    const note = await NoteModel.findById(noteId).exec();
    // We need to set the http status code to 200
    // It means ok or success
    // And send the note as a json object to the frontend
    // Here we don't need to use curly braces because we note is an object, and json knows how to convert objects into json
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

// We can create a interface to declare the type of the fields in a request body
// Interfaces are very similar to types
// The difference is that interfaces can be extended and types can't
interface CreateNoteBody {
  // ? means that the field is optional
  // We are giving optional also to the title because we are not sure if the user will send the title or not
  title?: string;
  text?: string;
}

// We can a another endpoint to create a new note
// The 4 arguments of the RequestHandler are in the types of Params, ResBody, ReqBody and ReqQuery
// We only need to change the ReqBody because we are only giving a type to the request body
// Others are given as unknown because we are not changing them
export const createNote: RequestHandler<
  unknown,
  unknown,
  CreateNoteBody,
  unknown
> = async (req, res, next) => {
  // We can put the following two lines outside the try catch block because they don't throw any errors
  // We need to get the title and content from the request body
  // We can use req.body to get the body of the request
  // We can get the title and content from the body to separate variables
  const title = req.body.title;
  const text = req.body.text;
  try {
    // We need to check whether the title is defined or not
    // !title means that title is not defined
    if (!title) {
      // We need to throw the error so catch block can catch it
      // 404 is the status code for bad request
      // This is used in situations where the user sends a request that is not valid like missing an required argument
      throw createHttpError(400, "Note must have a title");
    }

    // We can use the NoteModel.create() function to create the notes in the database
    // We need to also save the note in a variable because we also need to send it to the frontend
    // We don't need .exec() here
    const newNote = await NoteModel.create({
      // Creating a new note with the title and text that we got from the request body
      title: title,
      text: text,
    });
    // We need to set the http status code to 201
    // It means created
    // And send the note as a json object to the frontend
    // Here we don't need to use curly braces because we notes is an object, and json knows how to convert objects into json
    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};
