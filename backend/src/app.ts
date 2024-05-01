// We need to import the environment variables at the very start of the file
// Says to setup and configure .env file
import "dotenv/config";

// Importing express module
// This is same as import "express/config" but we also get a shorthand called express
// NextFunction, Request, Response are types from express that are used to define the types of arguments used in the error handler
import express, { NextFunction, Request, Response } from "express";

// We can import the routes from the routes folder
import notesRoutes from "./routes/notesRoutes";

// We need to import morgan in order to setup it's middleware
import morgan from "morgan";

// We need to import createHttpError function and isHttpError function from http-errors package
// createHttpError is a default import so we don't need to use curly braces
// isHttpError is not a default import so we need to use curly braces
import createHttpError, { isHttpError } from "http-errors";

// Creating an instance of express
// This app will act as our server
const app = express();

// We need to setup the morgan middleware to log the requests to the console
// "dev" is a predefined format that morgan uses to log the requests
// We can also use other formats like combined, common, short, tiny, etc
app.use(morgan("dev"));

// We need to create a middleware to set up json to used in the express app
// This should be above other middlewares (exactly here)
// Now we can receive json data from the server and send json data to the server
app.use(express.json());

// Now we can create a middleware to parse the incoming requests
// Any request that comes with the /api/notes will be forwarded to the notesRoutes
app.use("/api/notes", notesRoutes);

// We can also create another middleware to create our own error message when the user tries to access a route that doesn't exist
// This also need to be below out normal routes because this is just a callback function
// Because we need to forward an error from here to the error handler, we need to define this on top of the error handler
// We don't need to define the types of the arguments because express will automatically infer the types
// We only need to define them when we are creating an error handler
app.use((req, res, next) => {
  // We are creating a new http error using http-errors package and passing it to the next function
  // We need to pass both status code and the error message to the createHttpError function
  // 404 is the status code for resource not found
  next(createHttpError(404, "Endpoint not found"));
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
  // We use let because we will change the value of errorMessage and status code later
  let errorMessage = "Internal Server Error";
  let statusCode = 500;
  // We need to check if the code is actually throwing an http-error. (They can also throw null, strings, numbers etc.)
  if (isHttpError(error)) {
    // Every instance of http-error has message and a status code property
    // We can use this to set the error message and status code
    statusCode = error.status;
    errorMessage = error.message;
  }
  // We need to set the http status code to 500
  // It means internal server error
  // We need to add curly braces because we need to send in json format
  res.status(statusCode).json({ error: errorMessage });
});

// We need to export the app so that we can use it in the server.ts file
// We don't need to use curly braces because we have a single export
export default app;
