import express from "express";
import users from "../../users.js"; // Importing users data

const router = express.Router();

// API endpoint to get users
router.get("/", (req, res) => {
  res.json(users);
});

// get a specific user by ID
router.get("/:id", (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const user = users.find((u) => u.id === userId);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// crreate a new user
router.post("/", (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email,
    status: "active",
  };

  if (!newUser.name || !newUser.email) {
    return res.status(400).json({ message: "Name and email are required" });
  }

  users.push(newUser);
  // json(users);
  res.redirect("/")
});

// update a user by ID
router.put("/:id", (req, res) => {
  const userId = parseInt(req.params.id, 10);

  const userFound = users.find((u) => u.id === userId);
  if (!userFound) {
    return res.status(404).json({ message: "User not found" });
  }

  users.forEach((user) => {
    if (user.id === userId) {
      user.name = req.body.name || userFound.name;
      user.email = req.body.email || userFound.email;
      user.status = userFound.status;
      res.json(user);
    }
  });
});

// delete a user by ID
router.delete("/:id", (req, res) => {
  const userFound = users.find((u) => u.id === parseInt(req.params.id, 10));

  if (!userFound) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({
    message: `User with ID ${req.params.id} deleted successfully`,
    users: users.filter((u) => u.id !== parseInt(req.params.id, 10)),
  });
});

export default router;
// Exporting the router to be used in the main server file
