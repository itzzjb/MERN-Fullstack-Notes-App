// Importing Form , Button and Modal component from react-bootstrap
import { Button, Form, Modal } from "react-bootstrap";

// We need to add an interface because we need to pass some data here
interface AddNoteDialogProps {
  // We need to close the modal when the user clicks on the close button
  // When we click outside of the dialog or if we click the close button, the dialog should close
  // We are using a call back function
  // onDismiss is a function that doesn't take any arguments and returns void
  onDismiss: () => void;
}

// The callback function will be passed as a prop to the AddNoteDialog component
// And we pass in the type of the function as AddNoteDialogProps
const AddNoteDialog = ({ onDismiss }: AddNoteDialogProps) => {
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
        <Modal.Title>Add Note</Modal.Title>
      </Modal.Header>

      {/* Adding the Form react-bootstrap component */}
      {/* We need to have the form inside Modal.Body */}
      <Modal.Body>
        {/* We need to set the id in order to connect this with the submit Button using form property */}
        <Form id="addNoteForm">
          {/* First, we need a Form.Group for the Label */}
          {/* mb-3 is a bootstrap library class that adds margin bottom of 3px */}
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            {/* We use the Form.Control as the input field for the title.  */}
            {/* This is a self closing tag, and we only pass properties to this tag */}
            {/* We need to define the type of the input field as text and we can place a placeholder too */}
            <Form.Control type="text" placeholder="Enter title" />
          </Form.Group>

          {/* Then, another Form.Group for the Text */}
          <Form.Group className="mb-3">
            <Form.Label>Text</Form.Label>
            {/* We use as="textarea" to get a large text area to input our text */}
            {/* We need to add rows={5} to define a size for this text area input field */}
            <Form.Control as="textarea" rows={5} placeholder="Enter text" />
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
        <Button type="submit" form="addNoteForm">
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

// We need to export the component so that it can be used in other files
export default AddNoteDialog;
