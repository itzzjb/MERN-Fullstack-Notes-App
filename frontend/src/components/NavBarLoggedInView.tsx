// Creating a functional component that will display the navbar when the user is logged in

import { User } from "../models/user";
// Importing all from NotesApi
import * as NotesApi from "../network/notesApi";

// We need an interface for the props
interface NavBarLoggedInViewProps {
  // This doesn't need to be nullable because we are sure that the user is logged in
  user: User;
  // When we click the logout button we want to logout the user
  // We need to notify the App.tsx file so it can remove the user data from the state
  onLogoutSuccessful: () => void;
}

// Creating the component
const NavBarLoggedInView = (
  user,
  onLogoutSuccessful: NavBarLoggedInViewProps
) => {
  // Now we need a function to logging out that we can declare directly in the component
  // We can declare it here because we are not going to use it anywhere else
  async function logout() {
    // Using a try catch request for error handling
    try {
      // Calling the logout method from the NotesApi
      await NotesApi.logOut();
      // Calling the onLogoutSuccessful callback function
      onLogoutSuccessful();
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  // Here we put the content of the Navbar
  return (
    // We can't put two elements to the return statement. They need one parent element.
    // We can put this into a div but we can only need to render them in the navbar
    // So we can simply use fragments.
    // Fragments allows us to use two or more element where only one is expected
    <></>
  );
};

export default NavBarLoggedInView;
