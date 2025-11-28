const express = require("express");
const path = require("path");
const hbs = require("hbs");
const foods = require("./routes/Food");
const clothes = require("./routes/Cloth");
const foodcategories = require("./routes/FoodCategory");
const clothcategories = require("./routes/ClothCategory");
const user = require("./routes/User");
const admin = require("./routes/Admin");
const order = require("./routes/Order");
const cors = require("cors");
const { Food } = require("./models/schemas");

/**
 * Initialize Express application.
 */
const app = express();

app.use(express.json());
app.use(cors());

// Set up view engine
app.set("view engine", "hbs");
app.set("views", "views");

// Serve static files
app.use(express.static(path.join(__dirname, "views")));

// Define routes
app.use("/foods", foods);
app.use("/clothes", clothes);
app.use("/foodcategories", foodcategories);
app.use("/clothcategories", clothcategories);
app.use("/user", user);
app.use("/admin", admin);
app.use("/order", order);

/**
 * Route for Superuser view.
 * Fetches all food items and renders the index view.
 *
 * @name GET /superuser
 * @function
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void} Renders the "index" view with foodItems.
 */
app.get("/superuser", async (req, res) => {
  const foodItems = await Food.find().populate("category");
  res.render("index", { foodItems: foodItems });
});

/**
 * Health check or root route.
 * Returns a simple status message.
 *
 * @name GET /
 * @function
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} JSON object with status.
 */
app.get("/", (req, res) => {
  res.json({
    status: "Ok!",
  });
});

const PORT = process.env.PORT || 5000;

/**
 * Start the server.
 */
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
