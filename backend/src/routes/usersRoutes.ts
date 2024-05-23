// This is similar to notesRouter.ts file.

import express from "express";
import * as UserController from "../controllers/usersControllers";

// Create a router instance.
const router = express.Router();

// Create a POST route for the signup endpoint.
router.post("/signup", UserController.signup);

// Create a POST route for the login endpoint.
// router.post("/login", UserController.login);

// We need to export the router.
export default router;
