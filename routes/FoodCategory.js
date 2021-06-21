const router = require("express").Router();
const { FoodCategory, Food } = require("../models/schemas");

/* GEt products */
router.get("/foods/:catId", async (req, res) => {
  try {
    const foods = await Food.find({ category: req.params.catId });
    return res.send(foods);
  } catch (error) {
    return console.log(error);
  }
});

/* Get Single Posts */
router.get("/:id", async (req, res) => {
  try {
    const post = await FoodCategory.findById(req.params.id);
    return res.json(post);
  } catch (err) {
    return res.status(500).send(err);
  }
});

/* Get All Post */
router.get("/", async (req, res) => {
  try {
    const posts = await FoodCategory.find();
    return res.json(posts);
  } catch (err) {
    return res.status(500).send(err);
  }
});

/* Add New Post */
router.post("/", async (req, res) => {
  try {
    const post = new FoodCategory(req.body);
    await post.save();
    return res.json(post);
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = router;
