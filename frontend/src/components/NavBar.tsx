import { User } from "../models/user";

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
  onLogoutSuccessful: () => void;

  title: string;
}
