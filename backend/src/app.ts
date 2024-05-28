// We need to import the environment variables at the very start of the file
// Says to setup and configure .env file
import "dotenv/config";

// Importing express module
// This is same as import "express/config" but we also get a shorthand called express
// NextFunction, Request, Response are types from express that are used to define the types of arguments used in the error handler
import express, { NextFunction, Request, Response } from "express";

// We can import the notesRoutes from the routes folder
import notesRoutes from "./routes/notesRoutes";

// We can import the userRoutes from the routes folder
import usersRoutes from "./routes/usersRoutes";

// We need to import morgan in order to setup it's middleware
import morgan from "morgan";

// We need to import createHttpError function and isHttpError function from http-errors package
// createHttpError is a default import so we don't need to use curly braces
// isHttpError is not a default import so we need to use curly braces
import createHttpError, { isHttpError } from "http-errors";

// Importing the express-session package
import session from "express-session";

// Importing from the validateEnv.ts file
import env from "./util/validateEnv";

// Importing mongoStore from the connect-mongo package
import MongoStore from "connect-mongo";

// Calling the validateEnv function to validate the environment variables

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

// Then we need to configure the express session package here.
// Express-Sessions is another middleware that we have to register here.
// This need to be declare exactly after the express import and before the routes import
app.use(
  session({
    // First we have to set the secret key. It is used to sign the cookie that the user receives
    // (Each session has a entry in the database and a cookie with the secret key stored in the user's browser)
    // This should be a random string and should be stored in the environment variables
    secret: env.SESSION_SECRET,
    // We need to set the resave option to false
    resave: false,
    // We need to set the saveUninitialized option to false
    saveUninitialized: false,
    cookie: {
      // Giving a lifetime of 1 day to the cookie
      maxAge: 1000 * 60 * 60, // 1 day
    },
    // As long as a user is using our website, the cookie will be refreshed automatically
    // If the user is not using our website for a day, the cookie will be removed
    rolling: true,
    // Lastly we need to set where the session data will be stored
    // If we don't use this, the session data will be stored in memory. This is not recommended for production
    // So we need to use a database to store the session data
    // We can use mongoStore to store the session data in the database
    store: MongoStore.create({
      // We need to set the mongoUrl to the connection string of the database
      mongoUrl: env.MONGO_CONNECTION_STRING,
      // We need to set the collection name to sessions
      collectionName: "sessions",
    }),
  })
);

// Now we can create a middleware to parse the incoming requests
// Any request that comes with the /api/notes will be forwarded to the notesRoutes
app.use("/api/notes", notesRoutes);

// Same as above but for the userRoutes
app.use("/api/users", usersRoutes);

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
