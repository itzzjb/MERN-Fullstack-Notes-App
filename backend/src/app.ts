// We need to import the environment variables at the very start of the file
// Says to setup and configure .env file
import "dotenv/config";

// Importing express module
// This is same as import "express/config" but we also get a shorthand called express
// NextFunction, Request, Response are types from express that are used to define the types of arguments used in the error handler
import express, { NextFunction, Request, Response } from "express";

// We can import the routes from the routes folder
import notesRoutes from "./routes/notesRoutes";

// Creating an instance of express
// This app will act as our server
const app = express();

// Now we can create a middleware to parse the incoming requests
// Any request that comes with the /api/notes will be forwarded to the notesRoutes
app.use("/api/notes", notesRoutes);

// We can also create another middleware to create our own error message when the user tries to access a route that doesn't exist
// This also need to be below out normal routes because this is just a callback function
// Because we need to forward an error from here to the error handler, we need to define this on top of the error handler
// We don't need to define the types of the arguments because express will automatically infer the types
// We only need to define them when we are creating an error handler
app.use((req, res, next) => {
  // We are creating a new error and passing it to the next function
  next(Error("Route not found"));
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
