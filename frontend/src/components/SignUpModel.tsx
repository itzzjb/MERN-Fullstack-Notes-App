// This is created similar to Note.tsx file.

import { useForm } from "react-hook-form";
import { User } from "../models/user";
import { SignUpCredentials } from "../network/notesApi";
// Importing all from NotesApi
import * as NotesApi from "../network/notesApi";
import { Button, Modal } from "react-bootstrap";
import TextInputField from "./form/TextInputField";

// First we need to create the interface for the SignUpModelProps
interface SignUpModelProps {
  // We need to add onDismiss and onSignUpSuccessful callback functions to the SignUpModelProps interface
  onDismiss: () => void;
  onSignUpSuccessful: (user: User) => void;
}

// Next, we need to create the SignUpModel component.
const SignUpModal = ({ onDismiss, onSignUpSuccessful }: SignUpModelProps) => {
  // We need to use the useForm hook to create the form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<User>();

  // We need to create the function that actually handles the form submission and calling our API endpoint
  async function onSubmit(credentials: SignUpCredentials) {
    try {
      // We need to call the signUp method from the NotesApi
      const user = await NotesApi.signUp(credentials);
      // We need to call the onSignUpSuccessful callback function and pass the user object to the function
      onSignUpSuccessful(user);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }

  return (
    // We need to create the SignUp modal return statement here
    // This is mostly the same thing we have done in the AddEditNoteDialog.tsx file
    <Modal show={true} onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Sign Up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* We are using the TextInputField */}
          <TextInputField
            name="username"
            label="Username"
            type="text"
            placeholder="Username"
            register={register}
            registerOptions={{
              required: "Username is required",
            }}
            errors={errors.username}
          />
          <TextInputField
            name="email"
            label="Email"
            type="email"
            placeholder="Email"
            register={register}
            registerOptions={{
              required: "Email is required",
            }}
            errors={errors.email}
          />
          <TextInputField
            name="password"
            label="Password"
            type="password"
            placeholder="Password"
            register={register}
            registerOptions={{
              required: "Password is required",
            }}
            errors={errors.password}
          />
          {/* Submit button and Check the error : 06:22:38 */}
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default SignUpModal;
