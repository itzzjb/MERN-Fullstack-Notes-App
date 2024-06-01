// We are going to create a new model called User. This model will have the following properties:
export interface User {
  // We don't need to add the password property here because we don't want to store the password in the frontend.
  username: string;
  email: string;
}
