import { Container, Nav, Navbar } from "react-bootstrap";
import { User } from "../models/user";
import NavBarLoggedInView from "./NavBarLoggedInView";
import NavBarLoggedOutView from "./NavbarLoggedOutView";

// As usual first we need the props interface
interface NavBarProps {
  // Used to display the user's name in the navbar and to show correct buttons ( Signup. Login, logout )
  // We need to use | null because the user might not be logged in
  // We don't use optional (?) because we want to make sure that the user is either logged in or not
  loggedInUser: User | null;
  // When we click the signup button we want to show the signup form
  onSignClicked: () => void;
  // When we click the login button we want to show the login form
  onLoginClicked: () => void;
  // When we click the logout button we want to logout the user
  // We need to notify the App.tsx file so it can remove the user data from the state
  onLogoutSuccessful: () => void;
}

// Now we need to create the NavBar component
const NavBar = ({
  loggedInUser,
  onSignClicked,
  onLoginClicked,
  onLogoutSuccessful,
}: NavBarProps) => {
  return (
    // We need to create the NavBar return statement here
    // We are using the Navbar component from react-bootstrap
    // bg="primary" is used to set the background color of the navbar to a default blue color
    // variant="dark" is used to set the text color of the navbar to white
    // expand="lg" is used to set the navbar to expand on large screens from the mobile view
    // what size depends on how many buttons we have in the navbar
    // we will get a dropdown menu in the mobile view
    // sticky="top" is used to make the navbar sticky to the top of the page (always visible even when scrolled downed)
    <Navbar bg="primary" variant="dark" expand="lg" sticky="top">
      {/* We can use the Container to add some padding */}
      <Container>
        {/* Navbar.brand adds a text or image to the left side. */}
        {/* Usually you will be navigated to the home screen when you click this button */}
        <Navbar.Brand href="/">NotesHub</Navbar.Brand>
        {/* We need to add a toggle button for the mobile view */}
        <Navbar.Toggle aria-controls="main-navbar" />
        {/* We need to add a collapsible content */}
        {/* We need to ass the same id as the toggle here.*/}
        <Navbar.Collapse id="main-navbar">
          {/* We need to add the Nav component from react-bootstrap */}
          {/* We need to add some margin to the right side of the navbar items */}
          <Nav className="ml-auto">
            {/* Here we need to show our NavBarLoggedInView or NavBarLoggedOutView */}
            {/* We need to  */}
            {loggedInUser ? (
              <NavBarLoggedInView
                user={loggedInUser}
                onLogoutSuccessful={onLogoutSuccessful}
              />
            ) : (
              <NavBarLoggedOutView
                onLoginClicked={onLoginClicked}
                onSignUpClicked={onSignClicked}
              />
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

// We need to export the NavBar component
export default NavBar;
