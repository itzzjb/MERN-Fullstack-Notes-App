// We need to import the environment variables at the very start of the file
// Says to setup and configure .env file
import "dotenv/config";

// Importing express module
// This is same as import "express/config" but we also get a shorthand called express
import express from "express";

// Creating an instance of express
// This app will act as our server
const app = express();

// Note: Arrow functions are functions without a name

// This is an endpoint HTTP get request
app.get("/", (req, res) => {
  // Sending a response
  res.send("Hello World");
});

// We need to export the app so that we can use it in the server.ts file
// We don't need to use curly braces because we have a single export
export default app;
