import { FieldError, RegisterOptions, UseFormRegister } from "react-hook-form";

// Creating an interface for the TextInputFieldProps
interface TextInputFieldProps {
  name: string;
  label: string;
  // Registering the input field with the useFormRegister hook
  register: UseFormRegister<any>;
  // Optional registration options for the input field
  registerOptions?: RegisterOptions;
  // Optional error message to display
  error?: FieldError;
  // This allows us to pass any additional props to the input field
  [x: string]: any;
}

// Creating a functional component called TextInputField
