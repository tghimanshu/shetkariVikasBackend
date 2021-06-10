const router = require("express").Router();
const { Cloth } = require("../models/schemas");

/* Get Single Posts */
router.get("/:id", async (req, res) => {
  try {
    const post = await Cloth.findById(req.params.id).populate("category");
    return res.json(post);
  } catch (err) {
    return res.status(500).send(err);
  }
});

/* Get All Post */
router.get("/", async (req, res) => {
  try {
    const posts = await Cloth.find().populate("category");
    return res.json(posts);
  } catch (err) {
    return res.status(500).send(err);
  }
});

/* Add New Post */
router.post("/", async (req, res) => {
  try {
    const post = new Cloth(req.body);
    await post.save();
    return res.json(post);
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = router;
