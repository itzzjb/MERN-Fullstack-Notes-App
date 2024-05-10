// Importing Modal component from react-bootstrap
import { Modal } from "react-bootstrap";

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
    </Modal>
  );
};

// We need to export the component so that it can be used in other files
export default AddNoteDialog;
