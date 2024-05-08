// We need to import the styles from the Note.module.css file
import styles from "../styles/Note.module.css";

// We need to import the Card component from react-bootstrap
import { Card } from "react-bootstrap";

// We need to import the Note interface from the notes.ts file
// We are using an alias called NoteModel here because the Note type and the Note function have the same name
import { Note as NoteModel } from "../models/notes";

// To declare what types of data Note should receive, we need to create an interface.
// Remember that this is only required in typescript because we depend on the types not like javascript.
// We can create a type for the props here. It's short for properties.
// The props are the values that we pass to the component as arguments.
interface NoteProps {
  note: NoteModel;
  // className will get a class with styles from a css file
  // We used ? to make the className optional
  className?: string;
}

// We can create a function to return the UI element for each note
// Let's create a arrow function here
// We need to pass the props as an argument to the function
// If there were more arguments, we would pass them as comma separated values ({note, ... }: NoteProps)
// We need to pass the className as an argument to the function too.
// Note: When arguments that we pass to a function changes react knows that it needs to re-render the component in the UI with the new values
// If we made a change to the note object, react will automatically update the UI
const Note = ({ note, className }: NoteProps) => {
  // Here we can declare the ui for the note
  // We can get a code to a card template from react bootstrap website too

  // Let's return the ui for the note
  // Card is a bootstrap component
  return (
    // We can use the className prop to add a classes
    // This is called className instead of class because class is a reserved keyword in javascript
    // We can use the styles object to get the class from the css file
    <Card className={`${styles.noteCard} ${className}`}>
      {/* We use .cardBody class in order to add style to the Card Body that will  */}
      <Card.Body className={styles.cardBody}>
        {/* Getting the title from the note object we passed here to give a gradient effect and hide the overflown text */}
        <Card.Title>{note.title}</Card.Title>
        <Card.Text className={styles.cardText}>{note.text}</Card.Text>
      </Card.Body>
    </Card>
  );
};

// We need to export the function so we can use it in other files
export default Note;
