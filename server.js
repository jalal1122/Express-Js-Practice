import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import logger from "./middleware/logger.js"; // Importing the logger middleware
import router from "./routes/api/api.js"; // Importing the API routes
import users from "./users.js"; // Importing the users data
import { engine } from "express-handlebars"; // Importing Handlebars engine
import { title } from "process";

// initialize express app
const app = express();

// Use the logger middleware
app.use(logger);

// Set Up EJS as the template engine
app.set("view engine", "ejs");

// Set the views directory for EJS templates
app.set(
  "views",
  path.join(path.dirname(fileURLToPath(import.meta.url)), "views")
);

// Set up Handlebars as the template engine
// app.engine("handlebars", engine({ defaultLayout: "main" }));
// Set the view engine to Handlebars
// app.set("view engine", "handlebars");

// Middleware to parse JSON bodies
app.use(express.json());
// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) =>
  res.render("index", {
    title: "Users App",
    users: users, // Pass the users data to the template
  })
);

// Set the port to listen on 3000 or the port specified in the environment variable
const PORT = process.env.PORT || 3000;

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// app.get("/", (req, res) => {
//   //   res.send("Hello, World!");
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// using the API routes
app.use("/api/users", router);

// Listening on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
