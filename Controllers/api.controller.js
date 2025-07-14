import users from "../users";

// Get the User by ID
const getUserbyId = (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const user = users.find((u) => u.id === userId);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

// Create a new User
const createUser = (req, res) => {
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
  res.redirect("/");
};

// Update a User by ID
const updateUser = (req, res) => {
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
};

// Delete a User by ID
const deleteUser = (req, res) => {
  const userFound = users.find((u) => u.id === parseInt(req.params.id, 10));

  if (!userFound) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({
    message: `User with ID ${req.params.id} deleted successfully`,
    users: users.filter((u) => u.id !== parseInt(req.params.id, 10)),
  });
};

export { getUserbyId, createUser, updateUser, deleteUser };
