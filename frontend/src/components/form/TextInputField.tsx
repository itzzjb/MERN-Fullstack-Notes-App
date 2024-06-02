import { Form } from "react-bootstrap";
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
// We can use these input fields when creating form anywhere in the application (Used in AddEditNoteDialog.tsx)
// We have to list the props that the component will receive
// ...props is used to pass any additional props to the input field (So we will be able to pass any props that are specific to that form)
const TextInputField = ({
  name,
  label,
  register,
  registerOptions,
  error,
  ...props
}: TextInputFieldProps) => {
  return (
    // ControlId is a property that does some accessibility stuff.
    // For example, it connects the label to the input field. So when you click on the label, the input field gets focused.
    <Form.Group className="mb-3" controlId={name + "-input"}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        {...props}
        {...register(name, registerOptions)}
        isInvalid={!!error}
      />
      <Form.Control.Feedback type="invalid">
        {error?.message}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default TextInputField;
