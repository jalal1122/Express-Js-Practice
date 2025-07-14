import express from "express";
import {
  getUserbyId,
  createUser,
  updateUser,
  deleteUser,
} from "../../Controllers/api.controller.js";

const router = express.Router();

// API endpoint to get users
router.get("/", (req, res) => {
  res.json(users);
});

// get a specific user by ID
router.get("/:id", getUserbyId);

// crreate a new user
router.post("/", createUser);

// update a user by ID
router.put("/:id", updateUser);

// delete a user by ID
router.delete("/:id", deleteUser);

export default router;
// Exporting the router to be used in the main server file
