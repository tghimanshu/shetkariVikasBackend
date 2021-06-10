const express = require("express");
const foods = require("./routes/Food");
const clothes = require("./routes/Cloth");
const foodcategories = require("./routes/FoodCategory");
const clothcategories = require("./routes/ClothCategory");
const user = require("./routes/User");
const admin = require("./routes/Admin");

const app = express();

app.use(express.json());

app.use("/foods", foods);
app.use("/clothes", clothes);
app.use("/foodcategories", foodcategories);
app.use("/clothcategories", clothcategories);
app.use("/user", user);
app.use("/admin", admin);
app.get("/", (req, res) => {
  res.json({
    status: "Ok!",
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
