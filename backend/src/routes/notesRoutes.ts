// We will have all the routes for requests related to notes in this file

// We need to import the express module
import express from "express";

// We need to import the all functions from the controllers
// We are giving a name to the import so that we can use it in the routes
import * as NotesController from "../controllers/notesControllers";

// We can't instantiate a new express app here because we already have one in the app.ts file
// Otherwise we would have to create a new express app here
// Instead, we need to create an express router
const router = express.Router();

// We can have the same endpoint for different HTTP methods

// This is an endpoint HTTP get request
// This route will be called when the user tries to access the /api/notes of the website
// The getNotes function is called from the NotesController
router.get("/", NotesController.getNotes);

// This is an endpoint HTTP get request
// This route will be called when the user tries to access the /api/notes/:noteId of the website
// The getNote function is called from the NotesController
router.get("/:noteId", NotesController.getNote);

// This is an endpoint HTTP post request
// This route will be called when the user tries to create a new note
// The createNote function is called from the NotesController
router.post("/", NotesController.createNote);

// This is an endpoint HTTP patch request
// This route will be called when the user tries to update a note
// The updateNote function is called from the NotesController
router.patch("/:noteId", NotesController.updateNote);

// This is an endpoint HTTP delete request
// This route will be called when the user tries to delete a note
// The deleteNote function is called from the NotesController
router.delete("/:noteId", NotesController.deleteNote);

// We need to export the router so that we can use it in the app.ts file
export default router;
