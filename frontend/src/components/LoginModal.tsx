// This will be created much similar to the SignUpModal.tsx file

import { useForm } from "react-hook-form";
import { User } from "../models/user";
import { LoginCredentials } from "../network/notesApi";
// Importing all from NotesApi
import * as NotesApi from "../network/notesApi";
import TextInputField from "./form/TextInputField";
import { Button, Form, Modal } from "react-bootstrap";
import styleUtils from "../styles/utils.module.css";

// We need to create the LoginModalProps interface
interface LoginModalProps {
  // We need to add the onDismiss and onLoginSuccessful callback functions to the LoginModalProps interface
  onDismiss: () => void;
  onLoginSuccessful: (user: User) => void;
}

// Next, we need to create the LoginModal component.
const LoginModal = ({ onDismiss, onLoginSuccessful }: LoginModalProps) => {
  // We need to use the useForm hook to create the form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginCredentials>();

  // We need to create the function that actually handles the form submission and calling our API endpoint
  async function onSubmit(credentials: LoginCredentials) {
    try {
      // We need to call the logIn method from the NotesApi
      const user = await NotesApi.logIn(credentials);
      // We need to call the onLoginSuccessful callback function and pass the user object to the function
      onLoginSuccessful(user);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }

  return (
    // We need to create the Login modal return statement here
    // This is mostly the same thing we have done in the AddEditNoteDialog.tsx file
    <Modal show={true} onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {/* We are using the TextInputField we created in TextInputField.tsx */}

          {/* Username field */}
          <TextInputField
            name="username"
            label="Username"
            type="text"
            placeholder="Username"
            register={register}
            registerOptions={{
              required: "Username is required",
            }}
            error={errors.username}
          />

          {/* Password field */}
          <TextInputField
            name="password"
            label="Password"
            type="password"
            placeholder="Password"
            register={register}
            registerOptions={{
              required: "Password is required",
            }}
            error={errors.password}
          />

          {/* We need to create the submit button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className={styleUtils.width100}
          >
            Login
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
