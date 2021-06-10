const router = require("express").Router();
const { FoodCategory } = require("../models/schemas");

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
