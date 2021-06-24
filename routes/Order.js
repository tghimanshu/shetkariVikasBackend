const router = require("express").Router();
const { Order, OrderItem } = require("../models/schemas");

/* Get Single Posts */
router.get("/:id", async (req, res) => {
  try {
    const post = await Food.findById(req.params.id).populate("category");
    return res.json(post);
  } catch (err) {
    return res.status(500).send(err);
  }
});

/* Get All Post */
router.get("/", async (req, res) => {
  try {
    const posts = await Food.find().populate("category");
    return res.json(posts);
  } catch (err) {
    return res.status(500).send(err);
  }
});

/* Add New Post */
router.post("/", async (req, res) => {
  try {
    const post = new OrderItem();
    await post.save();
    return res.json(post);
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = router;
