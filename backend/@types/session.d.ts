import mongoose from "mongoose";

// We need to give the same name as the package (express-session)
declare module "express-session" {
  // The type of express-session is called SessionData
  // So we need to extend the SessionData interface
  interface SessionData {
    // We are going to add the userId to the session with the type.
    userId: mongoose.Types.ObjectId;
  }
}

// We need to add this thought the `tsconfig.json` file
// "types": ["express-session"]
