// This will be created much similar to the SignUpModal.tsx file

import { useForm } from "react-hook-form";
import { User } from "../models/user";
import { LoginCredentials } from "../network/notesApi";
// Importing all from NotesApi
import * as NotesApi from "../network/notesApi";

// We need to create the LoginModalProps interface
interface LoginModalProps {
  // We need to add the onDismiss and onLoginSuccessful callback functions to the LoginModalProps interface
  onDismiss: () => void;
  onLoginSuccessful: (user: User) => void;
}

// Next, we need to create the LoginModal component.
const LoginModal = ({onDismiss, onLoginSuccessful}: LoginModalProps) => {

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
    
    return (  );
}
 
export default LoginModal;