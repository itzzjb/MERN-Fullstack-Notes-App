// This is will be similar to the notesController.ts file.

import { RequestHandler } from "express";
import createHttpError from "http-errors";

// We need to import the UserModel from the user.ts file
import UserModel from "../models/user";

// We need to import bcrypt to hash the password
import bcrypt from "bcrypt";

// We need to import jwt to generate the token

// We need to create an interface for the signupbody.
interface SignUpBody {
  // We need to set all of this values optional because we are not sure if the users will send this data
  username?: string;
  email?: string;
  password?: string;
}

// We need to create a function that will handle the signup route
export const signup: RequestHandler<
  unknown,
  unknown,
  SignUpBody,
  unknown
> = async (req, res, next) => {
  // We need to get the data out of the request body
  const username = req.body.username;
  const email = req.body.email;
  // We need to hash the password, we can't store the password in plain text
  // So, we can use the variable name as passwordRaw, so we won't accidentally use the raw password
  const passwordRaw = req.body.password;

  try {
    // First we want to check if any of the fields are missing
    if (!username || !email || !passwordRaw) {
      // We need to create HttpError here
      // 400 is the status code for bad request
      throw createHttpError(400, "Parameters missing");
    }

    // We need to throw an error if the user already exists
    const existingUsername = await UserModel.findOne({
      // We need to find the user from the username
      username: username,
    }).exec(); // We need .exec() to execute the query

    if (existingUsername) {
      // 409 means conflict
      throw createHttpError(
        409,
        "Username already taken. Please choose another one or log in instead."
      );
    }

    // Same as username, we need to throw an error if the email already exists
    const existingEmail = await UserModel.findOne({
      // We need to find the user from the email
      email: email,
    }).exec(); // We need .exec() to execute the query

    if (existingEmail) {
      // 409 means conflict
      throw createHttpError(
        409,
        "A user with this email already exists. Please log in instead."
      );
    }

    // We don't want to store the raw password in the database.
    // Even if the database is secure, we don't want to take any chances.
    // We need to hash the password
    // This will turn the raw password into a unreadable string
    // We are going to use bcrypt to hash the password
    // First argument is the password and the second argument is the number of rounds
    // Number of rounds is the number of times the password is hashed
    // The more rounds the more secure the password is
    const passwordHashed = await bcrypt.hash(passwordRaw, 10);

    // We need to create a new user
    const newUser = await UserModel.create({
      // We need to create a new user with the username, email and password hashed
      username: username,
      email: email,
      password: passwordHashed,
    });

    // Before returning the response, we need to establish a session
    // For simple JS this is enough, but for typescript we need to define the type.
    req.session.userId = newUser._id;

    // We need to send the response
    res.status(201).json(newUser);

    // We need to create a new user
  } catch (error) {
    // Calling the error handler middleware
    next(error);
  }
};