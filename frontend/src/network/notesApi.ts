import { Note, Note as NoteModel } from "../models/notes";

// We need to create a wrapper around the fetch function to throw some errors if the response is not ok
// We don't have to export the fetchData function because we are not using it in any other file
// input is the URL of the API endpoint so it should be of type RequestInfo
// init is the options object that we can pass to the fetch function
async function fetchData(input: RequestInfo, init?: RequestInit) {
  // We are using the fetch function to make a request to the API endpoint
  // Getting the response from the API endpoint
  const response = await fetch(input, init);
  // response.ok will return true if the status code between 200 and 300
  // If it's between 400 and 500 this will return false
  if (!response.ok) {
    // Getting the error body from the response
    const errorBody = await response.json();
    // We are getting the value that we passes in for the the key "error" in the response body of the error
    const errorMessage = errorBody.error;
    // Throwing the message as an error
    // Later we can distinguish the different kinds of errors by the error code and show different errors to the user
    throw Error(errorMessage);
  }
  // Returning the response body
  return response;
}

// We need to export the fetchNotes function so we can use it in other files
// This function will return a promise that will resolve to an array of notes
// All async functions return a promise
export async function fetchNotes(): Promise<NoteModel[]> {
  // We can use the get all notes endpoint to get all the notes
  // We only need to set the /api/notes because we are using a proxy in the package.json file
  // We are using the above fetchData function to make the request so the error handling will be done there
  const response = await fetchData("/api/notes", {
    method: "GET",
  });
  // Now we need to return the data from the response
  return response.json();
}

// We can create a interface to define the shape of the note object
// We are going to export this interface so we can use it in other files
export interface NoteInput {
  title: string;
  // ? means that the text is optional
  text?: string;
}

// We need to create a function to create a new note
// We are going to export this function so we can use it in other files
// This function requires a note object in the type of NoteInput as an argument and it will return a promise that will return the created note
export async function createNote(note: NoteInput): Promise<Note> {
  // We are using the post endpoint to create a new note
  // We are using the above fetchData function to make the request so the error handling will be done there
  const response = await fetchData("/api/notes", {
    method: "POST",
    // The headers are used to specify the content type of the request
    // Tells the backend what kind of data we are sending from the frontend
    headers: {
      "Content-Type": "application/json",
    },
    // We are passing the note object as the body of the request
    // We need to stringify the note object because we only can send strings back and forth between the frontend and the backend
    body: JSON.stringify(note),
  });
  // Now we need to return the data from the response
  // This contains the newly created note
  // Because we send note object in the body of the request from the backend when a new note is created
  return response.json();
}

// We need to create a function to delete a note
// We are going to export this function so we can use it in other files
// This function requires an id of the note as an argument that of the note to be deleted
export async function deleteNote(id: string): Promise<void> {
  // We are using the delete endpoint to delete a note
  // We are using the above fetchData function to make the request so the error handling will be done there
  await fetchData(`/api/notes/${id}`, {
    method: "DELETE",
  });
}
