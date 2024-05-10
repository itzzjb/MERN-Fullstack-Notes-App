// Importing Modal component from react-bootstrap
import { Modal } from "react-bootstrap";

const AddNoteDialog = () => {
  // show = show:true (We don't need to pass the show prop because it is true by default)
  // Adding show prop to the Modal component make the modal visible
  return (
    <Modal show>
      {/* We need to add a close button. This will add the "x" in the top right corner of the header of the modal */}
      <Modal.Header closeButton>
        <Modal.Title>Add Note</Modal.Title>
      </Modal.Header>
    </Modal>
  );
};

// We need to export the component so that it can be used in other files
export default AddNoteDialog;
