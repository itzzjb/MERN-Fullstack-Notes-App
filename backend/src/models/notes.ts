// When we use mongoose, we need to create a model for each collection in the database.
// This models will be used to interact with the collection.

// Schema , InferSchemaType and model are imported from mongoose
import { InferSchemaType, model, Schema } from "mongoose";

// Create the schema for the notes collection
// In mongodb schemas we need to start the types in uppercase letter
const noteSchema = new Schema(
  // The fields in the schema
  {
    title: { type: String, required: true },
    text: { type: String },
  },
  {
    // These are outside of the first curly braces
    // Mongoose will automatically add the following fields
    // This will add a createdAt and updatedAt fields
    timestamps: true,
  }
);

// New type alias for the note schema using typescript
// Creates a type based on the noteSchema
type Note = InferSchemaType<typeof noteSchema>;

// We need to export the whole schema so we can use it in other files
// Creates a model of type Note (created above)
// We call our noteSchema "Note" here.
// So this later create a collection called notes in the database
// This will happen when running the server
export default model<Note>("Note", noteSchema);
