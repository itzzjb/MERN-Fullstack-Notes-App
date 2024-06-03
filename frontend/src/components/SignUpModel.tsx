// This is created similar to Note.tsx file.

import { useForm } from "react-hook-form";
import { User } from "../models/user";
import { SignUpCredentials } from "../network/notesApi";
// Importing all from NotesApi
import * as NotesApi from "../network/notesApi";

// First we need to create the interface for the SignUpModelProps
interface SignUpModelProps {
  // We need to add onDismiss and onSignUpSuccessful callback functions to the SignUpModelProps interface
  onDismiss: () => void;
  onSignUpSuccessful: (user: User) => void;
}

// Next, we need to create the SignUpModel component.
const SignUpModal
 = ({onDismiss, onSignUpSuccessful}: SignUpModelProps) => {

    // We need to use the useForm hook to create the form
    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<User>();

    // We need to create the function that actually handles the form submission and calling our API endpoint
    async function onSubmit (credentials: SignUpCredentials){
       try {
            // We need to call the signUp method from the NotesApi
            const user = await NotesApi.signUp(credentials);
            // We need to call the onSignUpSuccessful callback function and pass the user object to the function
            onSignUpSuccessful(user);

            // 06:16:42

        
       } catch (error) {
            alert(error);
            console.log(error);
       }
    };

    return (  
    );
}
 
export default SignUpModal
;
