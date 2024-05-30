// This is similar to notesRouter.ts file.

import express from "express";
import * as UserController from "../controllers/usersControllers";

// Create a router instance.
const router = express.Router();

// Create a GET route for the authenticated user endpoint.
router.get("/", UserController.getAuthenticatedUser);

// Create a POST route for the signup endpoint.
router.post("/signup", UserController.signup);

// Create a POST route for the login endpoint.
router.post("/login", UserController.login);

// Create a POST route for the logout endpoint.
router.post("/logout", UserController.logout);

// We need to export the router.
export default router;
