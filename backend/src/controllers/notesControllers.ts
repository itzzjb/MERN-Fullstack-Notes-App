// We have all the functions that are related to the routs of the notes in the notesControllers.ts file here.

// RequestHandler types need to be imported from express
import { RequestHandler } from "express";
// We need to import the NoteModel from the models folder
import NoteModel from "../models/notes";
// We need to import mongoose to check if the id is valid or not
import mongoose from "mongoose";
// createHttpError is a default import so we don't need to use curly braces
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
    // We need to check whether the noteId is a valid id or not (It is a valid mongodb id)
    // mongodb ids are 24 characters long
    // We can use mongoose to check if the id is valid or not
    if (!mongoose.isValidObjectId(noteId)) {
      // 400 is the status code for bad request
      throw createHttpError(400, "Invalid note id");
    }

    // We need to get the note out of the database and return it
    // NoteModel.findById(id).exec() will execute the findById operation and return a promise
    // FindById is a asynchronous operation, so we need to use await because it will take some time
    const note = await NoteModel.findById(noteId).exec();

    // If a note didn't exist with the given id, we need to throw an error
    if (!note) {
      // 404 is the status code for resource not found
      throw createHttpError(404, "Note not found");
    }

    // We need to set the http status code to 200
    // It means ok or success
    // And send the note as a json object to the frontend
    // Here we don't need to use curly braces because we note is an object, and json knows how to convert objects into json
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

// We can create an interface to declare the type of the fields in a request body
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
// Note that if we define the type in the RequestHandler, we need to define all the type manually.
// Previously, we didn't need to define the types because they were inferred
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
    // We need to also save the note in a variable (newNote) because we also need to send it to the frontend
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

// Because we are defining types for the RequestHandler, we need to define the types for the Params, ResBody, ReqBody and ReqQuery manually
// Previously, we didn't need to define the type of nodeId because it was inferred.
// So, we can create an interface to declare the type of the fields in the request parameters
// We need to pass the noteId as Params
interface UpdateNoteParams {
  // noteId should be same as the parameter name in the route (notesRoutes.ts)
  // We don'e need to add ? because without noteId, we wouldn't be able to access this endpoint in the first place
  noteId: string;
}

// We need to create an interface to declare the type of the fields in the request body
interface UpdateNoteBody {
  title?: string;
  text?: string;
}

// We can have an endpoint to update a note
// The 4 arguments of the RequestHandler are in the types of Params, ResBody, ReqBody and ReqQuery
// Here we also need to pass the id as Params with the ReqBody
export const updateNote: RequestHandler<
  UpdateNoteParams,
  unknown,
  UpdateNoteBody,
  unknown
> = async (req, res, next) => {
  const noteId = req.params.noteId;
  const newTitle = req.body.title;
  const newText = req.body.text;
  try {
    // We need to check whether the noteId is a valid id or not (It is a valid mongodb id)
    if (!mongoose.isValidObjectId(noteId)) {
      // 400 is the status code for bad request
      throw createHttpError(400, "Invalid note id");
    }

    // We need to check whether the title is defined or not
    if (!newTitle) {
      // 404 is the status code for bad request
      throw createHttpError(400, "Note must have a title");
    }

    // We need to find the note with the given id
    // NoteModel.findById(id).exec() will execute the findById operation and return a promise
    // FindById is a asynchronous operation, so we need to use await because it will take some time
    const note = await NoteModel.findById(noteId).exec();

    // If a note didn't exist with the given id, we need to throw an error
    if (!note) {
      // 404 is the status code for resource not found
      throw createHttpError(404, "Note not found");
    }

    // We need to update the title and text of the note
    note.title = newTitle;
    note.text = newText;

    // We need to save the note in the database
    // We don't need .exec() here
    // We need to also save the note in a variable (updatedNote) because we also need to send it to the frontend
    const updatedNote = await note.save();

    // We need to set the http status code to 200
    // It means ok or success
    // And send the note as a json object to the frontend
    // Here we don't need to use curly braces because we note is an object, and json knows how to convert objects into json
    res.status(200).json(updatedNote);
  } catch (error) {
    next(error);
  }
};

// We can have an endpoint to delete a note
export const deleteNote: RequestHandler = async (req, res, next) => {
  // We don't need to create an interface for the request parameters because we are not passing types to the RequestHandler
  // Because we are not passing ReqBody, there is no need to pass types to the RequestHandler
  // We can use req.params to get the parameters
  const noteId = req.params.noteId;
  try {
    // We need to check whether the noteId is a valid id or not (It is a valid mongodb id)
    if (!mongoose.isValidObjectId(noteId)) {
      // 400 is the status code for bad request
      throw createHttpError(400, "Invalid note id");
    }

    // We need to find the note with the given id
    // NoteModel.findById(id).exec() will execute the findById operation and return a promise
    // FindById is a asynchronous operation, so we need to use await because it will take some time
    const note = await NoteModel.findById(noteId).exec();

    // If a note didn't exist with the given id, we need to throw an error
    if (!note) {
      // 404 is the status code for resource not found
      throw createHttpError(404, "Note not found");
    }

    // We need to remove the note from the database
    // We don't need .exec() here
    // We don't need to save the note in a variable because we don't need to send it to the frontend
    // deleteOne() is a mongoose function to delete a document from the database
    await note.deleteOne();

    // We need to set the http status code to 204
    // It means no content
    // Note that only using status(204) won't send a response, json() is needed to send a response
    // Here because we are not sending any data in the body, we can use sendStatus instead of status().json()
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
