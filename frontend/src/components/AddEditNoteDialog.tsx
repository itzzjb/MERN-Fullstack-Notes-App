// Importing Form , Button and Modal component from react-bootstrap
import { Button, Form, Modal } from "react-bootstrap";
import { Note as NoteModel } from "../models/notes";
import { useForm } from "react-hook-form";
import { NoteInput } from "../network/notesApi";
// Importing all the functions from the notesApi.ts file
import * as NotesApi from "../network/notesApi";

// We need to add an interface because we need to pass some data here
interface AddEditNoteDialogProps {
  // We are passing noteToEdit as a prop to the AddNoteDialog component
  // This is an optional prop because we are going to use the same component to add and edit the note
  // It won't be defined when we are adding a new note
  noteToEdit?: NoteModel;

  // We need to close the modal when the user clicks on the close button
  // When we click outside of the dialog or if we click the close button, the dialog should close
  // We are using a call back function
  // onDismiss is a function that doesn't take any arguments and returns void
  onDismiss: () => void;
  // We need another callback to get to know whether the note is saved in the database or note.
  // We are going to pass this callback function to the AddNoteDialog component
  // This callback function will be called when the note is saved in the database
  onNoteSaved: (note: NoteModel) => void;
}

// The callback function will be passed as a prop to the AddNoteDialog component
// And we pass in the type of the function as AddNoteDialogProps
// We are also going to pass onNoteSaved callback function to AddNoteDialog component too.
// We renamed AddNoteDialog to AddEditNoteDialog because we are going to use the same component to edit the note too (add and update)
const AddEditNoteDialog = ({
  noteToEdit,
  onDismiss,
  onNoteSaved,
}: AddEditNoteDialogProps) => {
  // Now we can use react-hook-forms here.
  // There is a special hook we can use called useForm
  // This hook returns a bunch of data and functions and objects that we can use to create a form

  // First we need to destructure the useForm hook
  // We are using the NoteInput interface to define the shape of the note object that defined in the notesApi.ts file
  // We are further destructuring formState here to get the errors field and isSubmitting callback function
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NoteInput>({
    defaultValues: {
      // If we are trying to edit a note, we need to set the default values of the form fields
      // Otherwise, we need to set the default values to empty strings
      // So when we are viewing the dialog to add a new note, the input fields will be empty
      // And when we are viewing the dialog to edit a note, the input fields will be filled with the note data
      title: noteToEdit?.title || "",
      text: noteToEdit?.text || "",
    },
  });

  // Now, we create the function that actually handles the form submission and calling our API endpoint
  // This is a async function because we are going to make a async request to the backend
  // This function takes a single argument which is the inputted data from the form
  async function onSubmit(input: NoteInput) {
    // Here we are using a try catch block to handle the error that comes from the backend
    try {
      // First we need to refine a variable to store the response
      let noteResponse: NoteModel;

      // We need to check if we are editing a note or adding a new note
      // When noteToEdit is defined (true), we are editing a note otherwise we are adding a new note
      if (noteToEdit) {
        // We are using the updateNote function from the notesApi.ts file to update the note
        // We are passing the noteToEdit._id as the first argument and the input as the second argument
        noteResponse = await NotesApi.updateNote(noteToEdit._id, input);
      } else {
        // We are using the createNote function from the notesApi.ts file to create a new note
        // We are passing the input as the argument
        noteResponse = await NotesApi.createNote(input);
      }
      // Sending the noteResponse to the onNoteSaved callback function
      onNoteSaved(noteResponse);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  // show = show:true (We don't need to pass the show prop because it is true by default)
  // Adding show prop to the Modal component make the modal visible
  return (
    // onHide callback function is called when the modal is closed
    // This includes clicking outside of the modal or clicking the close button etc.
    // Here because onDismiss is a function that doesn't take any arguments
    // We don't need to use () => onDismiss(), we can just pass onDismiss directly
    <Modal show onHide={onDismiss}>
      {/* We need to add a close button. This will add the "x" in the top right corner of the header of the modal */}
      <Modal.Header closeButton>
        <Modal.Title>
          {/* We need to change the name of the dialog depending whether we are trying to add or edit a note */}
          {/* Ternary operation can be used to implement this behavior */}
          {noteToEdit ? "Edit Note" : "Add Note"}
        </Modal.Title>
      </Modal.Header>

      {/* Adding the Form react-bootstrap component */}
      {/* We need to have the form inside Modal.Body */}
      <Modal.Body>
        {/* We need to set the id in order to connect this with the submit Button using form property */}
        {/* We need to add a onSubmit function that will be called when the form is submitted */}
        {/* And here we want to pass the handleSubmit from react-hook-forms */}
        {/* We are passing the onSubmit function to the Form component. This is the function that we created above */}
        {/* handleSubmit will connect our form to the react-hook-forms and after some background tasks it will call our own onSubmit function */}
        <Form id="addEditNoteForm" onSubmit={handleSubmit(onSubmit)}>
          {/* First, we need a Form.Group for the Label */}
          {/* mb-3 is a bootstrap library class that adds margin bottom of 3px */}
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            {/* We use the Form.Control as the input field for the title.  */}
            {/* This is a self closing tag, and we only pass properties to this tag */}
            {/* We need to define the type of the input field as text and we can place a placeholder too */}
            {/* We need to connect each form input field with the register function from react-hook-forms */}
            {/* ... means what ever comes after this will be destructed to single components */}
            <Form.Control
              type="text"
              placeholder="Enter title"
              // We need to use a isInvalid property to show the error message only when the input field is invalid
              // If errors.title is not null or undefined, then isInvalid will be true
              // If errors.title is defined, then isInvalid will be false
              // The feedback will be displayed only when isInvalid is true
              isInvalid={!!errors.title}
              // The input field title will be connected to the NoteInput.title field
              // We can also set validation rules here
              {...register("title", { required: "Title is required" })}
            />
            {/* We need a way to show the above error message to the user. We can do this by adding a Form.Control.Feedback component */}
            {/* They are displayed as small text under the input fields. */}
            {/* Invalid will displayed in red and valid will be displayed in green */}
            <Form.Control.Feedback type="invalid">
              {/* We are getting the errors from the errors property in useForm of react-hook-forms */}
              {/* We are using the title key to get the title error */}
              {/* Because of ? (safe call operator) we will only use this message value if the title is not-defined or null*/}
              {/* The message that displayed will be the text we defined up "Title is required" */}
              {errors.title?.message}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Then, another Form.Group for the Text */}
          <Form.Group className="mb-3">
            <Form.Label>Text</Form.Label>
            {/* We use as="textarea" to get a large text area to input our text */}
            {/* We need to add rows={5} to define a size for this text area input field */}
            {/* We need to connect each form input field with the register function from react-hook-forms */}
            {/* ... means what ever comes after this will be destructed to single components */}
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Enter text"
              // The input field text will be connected to the NoteInput.text field
              // We don't need to set any validation rules here because text is optional
              {...register("text")}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      {/* We can have the save button in the footer of the Modal */}
      <Modal.Footer>
        {/* We need to set the type of the button to "submit" */}
        {/* By using type as "submit" we don't need to add an onclick event listeners. */}
        {/* HTML tells the browser automatically that this button is used to submit the form */}
        {/* But for that this button should be inside the Form tags, otherwise it's disconnected*/}
        {/* We can use another property called form and set an id to the form and pass it to connect the Form to the Button */}
        <Button
          type="submit"
          form="addEditNoteForm"
          // We need to disable the button when the form is submitting
          // isSubmitting is a property that we get from the react-hook-forms
          // This will remain true until the form us being submitted
          // Once you click the submit button the button would be disabled until the form is submitted
          disabled={isSubmitting}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

// We need to export the component so that it can be used in other files
export default AddEditNoteDialog;
