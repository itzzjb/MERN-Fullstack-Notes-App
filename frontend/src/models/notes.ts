// We need to create a interface that represents the note object.
// This interface will be used to type the notes array in the App component.
// We need to export the interface so we can use it in other files.

// All the fields should be defined as same names as we receive from the backend.
// There is no data types for json , so all of them can be defined as strings.
export interface Note {
  // In mongodb the id is _id, so we need to use that name here.
  _id: string;
  title: string;
  // We are adding ? to make the text field optional
  text?: string;
  createdAt: string;
  updatedAt: string;
}
