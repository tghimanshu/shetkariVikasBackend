const router = require("express").Router();
const { Food } = require("../models/schemas");

/**
 * Get a single Food item by ID.
 * Populates the category field.
 *
 * @name GET /foods/:id
 * @function
 * @param {Object} req - The request object.
 * @param {Object} req.params - The route parameters.
 * @param {string} req.params.id - The ID of the food item to retrieve.
 * @param {Object} res - The response object.
 * @returns {Object} Returns the food item object if found.
 * @returns {Object} Returns the error object if an error occurs.
 */
router.get("/:id", async (req, res) => {
  try {
    const post = await Food.findById(req.params.id).populate("category");
    return res.json(post);
  } catch (err) {
    return res.status(500).send(err);
  }
});

/**
 * Get all Food items.
 * Populates the category field for each item.
 *
 * @name GET /foods/
 * @function
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Array<Object>} Returns an array of all food item objects.
 * @returns {Object} Returns the error object if an error occurs.
 */
router.get("/", async (req, res) => {
  try {
    const posts = await Food.find().populate("category");
    return res.json(posts);
  } catch (err) {
    return res.status(500).send(err);
  }
});

/**
 * Add a new Food item.
 *
 * @name POST /foods/
 * @function
 * @param {Object} req - The request object.
 * @param {Object} req.body - The food item data.
 * @param {string} req.body.title - The title of the food item.
 * @param {string} req.body.description - The description of the food item.
 * @param {number} req.body.price - The price of the food item.
 * @param {Array<string>} req.body.images - Array of image URLs/paths.
 * @param {string} req.body.category - The category ID.
 * @param {Object} res - The response object.
 * @returns {Object} Returns the created food item object.
 * @returns {Object} Returns the error object if an error occurs.
 */
router.post("/", async (req, res) => {
  try {
    const post = new Food(req.body);
    await post.save();
    return res.json(post);
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = router;
