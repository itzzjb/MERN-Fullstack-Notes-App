// Creating a functional component that will display the navbar when the user is logged out

import { Button } from "react-bootstrap";

// We need an interface for the props
interface NavBarLoggedOutViewProps {
  onSignUpClicked: () => void;
  onLoginClicked: () => void;
}

// Creating the component
const NavBarLoggedOutView = ({
  onSignUpClicked,
  onLoginClicked,
}: NavBarLoggedOutViewProps) => {
  return (
    // We are creating a fragment because we can't return two elements
    <>
      {/* We are going to add a signup button */}
      <Button variant="outline-light" onClick={onSignUpClicked}>
        Sign Up
      </Button>
      {/* We are going to add a login button */}
      <Button variant="outline-light" onClick={onLoginClicked}>
        Login
      </Button>
    </>
  );
};

export default NavBarLoggedOutView;
