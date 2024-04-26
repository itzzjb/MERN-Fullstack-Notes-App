// Here we need to import cleanEnv for envalid package
// We need to import port and str validators from envalid package
// If we have a single import we don't need to use curly braces
// If we have multiple imports we need to use curly braces
import { cleanEnv, port, str } from "envalid";
// import { port, str } from "envalid/dist/validators";

// We need to export the sanitized version of the environment variables from this
// We exporting the return value of cleanEnv function
// If we have a single export we don't need to use curly braces
// If we have multiple exports we need to use curly braces
export default cleanEnv (process.env, {
    // Says that the value should be a string
    MONGO_CONNECTION_STRING: str(),
    // Says that the value should be a port number
    PORT: port(),
});
