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

const app = express();

app.use(express.json());
app.use(cors());

app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "views")));
app.use("/foods", foods);
app.use("/clothes", clothes);
app.use("/foodcategories", foodcategories);
app.use("/clothcategories", clothcategories);
app.use("/user", user);
app.use("/admin", admin);
app.use("/order", order);

app.get("/superuser", async (req, res) => {
  const foodItems = await Food.find().populate("category");
  res.render("index", { foodItems: foodItems });
});

app.get("/", (req, res) => {
  res.json({
    status: "Ok!",
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
