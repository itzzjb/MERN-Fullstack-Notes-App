// Creating a hello world 
// Note: ; is optional in typescript (or javascript). But it is a good practice to use it.

// Importing express
import express from "express";
// Creating an instance of express
// This app will act as our server
const app = express();
// We need to tell express to listen to a port
const port = 4000;

// Note: Arrow functions are functions without a name

// This is an endpoint HTTP get request
app.get("/", (req, res) => {
    // Sending a response
    res.send("Hello World");
});

// This will start the server
// It will listen to the port 4000
// This is a callback function
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})


