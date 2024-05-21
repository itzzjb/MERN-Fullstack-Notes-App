// Here we can do something similar to the notes.ts file.
// We can create a schema for the user collection and export it as a model.

import { InferSchemaType, model, Schema } from "mongoose";

const userSchema = new Schema({
  username: { type: String, required: true },
  // We need to add select: false to the password field and the email field
  // This means when we retrieve the user from the database, the password and email fields will not be included
  // If we wan't them we need to explicitly ask for them
  email: { type: String, required: true, select: false },
  password: { type: String, required: true, select: false },
});

// We need to create a type for the user schema for typescript
type User = InferSchemaType<typeof userSchema>;

// Now we need to export the model
export default model<User>("User", userSchema);
