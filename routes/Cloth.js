const router = require("express").Router();
const { Cloth } = require("../models/schemas");

/**
 * Get a single Cloth item by ID.
 * Populates the category field.
 *
 * @name GET /clothes/:id
 * @function
 * @param {Object} req - The request object.
 * @param {Object} req.params - The route parameters.
 * @param {string} req.params.id - The ID of the cloth item to retrieve.
 * @param {Object} res - The response object.
 * @returns {Object} Returns the cloth item object if found.
 * @returns {Object} Returns the error object if an error occurs.
 */
router.get("/:id", async (req, res) => {
  try {
    const post = await Cloth.findById(req.params.id).populate("category");
    return res.json(post);
  } catch (err) {
    return res.status(500).send(err);
  }
});

/**
 * Get all Cloth items.
 * Populates the category field for each item.
 *
 * @name GET /clothes/
 * @function
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Array<Object>} Returns an array of all cloth item objects.
 * @returns {Object} Returns the error object if an error occurs.
 */
router.get("/", async (req, res) => {
  try {
    const posts = await Cloth.find().populate("category");
    return res.json(posts);
  } catch (err) {
    return res.status(500).send(err);
  }
});

/**
 * Add a new Cloth item.
 *
 * @name POST /clothes/
 * @function
 * @param {Object} req - The request object.
 * @param {Object} req.body - The cloth item data.
 * @param {string} req.body.title - The title of the cloth item.
 * @param {string} req.body.description - The description of the cloth item.
 * @param {number} req.body.price - The price of the cloth item.
 * @param {Array<string>} req.body.images - Array of image URLs/paths.
 * @param {string} req.body.category - The category ID.
 * @param {Object} res - The response object.
 * @returns {Object} Returns the created cloth item object.
 * @returns {Object} Returns the error object if an error occurs.
 */
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
