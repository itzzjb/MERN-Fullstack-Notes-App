import { Note, Note as NoteModel } from "../models/notes";
import { User } from "../models/user";

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

// We need to create a function to getLoggedInUser
// This function will return a promise that will resolve to a user object
// All async functions return a promise
export async function getLoggedInUser(): Promise<User> {
  // We can use the get logged in user endpoint to get the logged in user
  // We only need to set the /api/user because we are using a proxy in the package.json file
  // We are using the above fetchData function to make the request so the error handling will be done there
  const response = await fetchData("/api/users", {
    method: "GET",
  });
  // Now we need to return the data from the response
  return response.json();
}

// We are going to create a interface to define SignUpCredentials
// We are going to export this interface so we can use it in other files
export interface SignUpCredentials {
  username: string;
  email: string;
  password: string;
}

// We need to create a function to sign up a user
// We are going to export this function so we can use it in other files
// This function requires a credentials object in the type of SignUpCredentials as an argument and it will return a promise that will resolve to a user object
export async function signUp(credentials: SignUpCredentials): Promise<User> {
  // We are using the sign up endpoint to sign up a user
  // We are using the above fetchData function to make the request so the error handling will be done there
  const response = await fetchData("/api/users/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  // Now we need to return the data from the response
  return response.json();
}

// We need an interface to define LoginCredentials
// We are going to export this interface so we can use it in other files
export interface LoginCredentials {
  username: string;
  password: string;
}

// We need to create a function to log in a user
// We are going to export this function so we can use it in other files
// This function requires a credentials object in the type of LoginCredentials as an argument and it will return a promise that will resolve to a user object
export async function logIn(credentials: LoginCredentials): Promise<User> {
  // We are using the log in endpoint to log in a user
  // We are using the above fetchData function to make the request so the error handling will be done there
  const response = await fetchData("/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  // Now we need to return the data from the response
  return response.json();
}

// We need to create a function to log out a user
// We are going to export this function so we can use it in other files
export async function logOut() {
  // We are using the log out endpoint to log out a user
  // We are using the above fetchData function to make the request so the error handling will be done there
  await fetchData("/api/users/logout", {
    method: "POST",
  });
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
  // We don't need to get a response back from the server when we delete a note
  await fetchData(`/api/notes/${id}`, {
    method: "DELETE",
  });
}

// We need to create a function to update a note
// We are going to export this function so we can use it in other files
// This function requires an id of the note as an argument that of the note to be updated
// And it requires the updated note object in the type of NoteInput as an argument
export async function updateNote(
  noteId: string,
  note: NoteInput
): Promise<NoteModel> {
  // We are using the put endpoint to update a note
  // We are using the above fetchData function to make the request so the error handling will be done there
  const response = await fetchData(`/api/notes/${noteId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });
  // Now we need to return the data from the response
  // This contains the updated note
  // Because we send the updated note object in the body of the request from the backend when a note is updated
  return response.json();
}
