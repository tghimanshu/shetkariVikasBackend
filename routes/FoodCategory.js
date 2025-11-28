const router = require("express").Router();
const { FoodCategory, Food } = require("../models/schemas");

/**
 * Get all foods belonging to a specific category.
 *
 * @name GET /foodcategories/foods/:catId
 * @function
 * @param {Object} req - The request object.
 * @param {Object} req.params - The route parameters.
 * @param {string} req.params.catId - The ID of the food category.
 * @param {Object} res - The response object.
 * @returns {Array<Object>} Returns an array of food items in the specified category.
 * @returns {void} Logs error to console if an error occurs.
 */
router.get("/foods/:catId", async (req, res) => {
  try {
    const foods = await Food.find({ category: req.params.catId });
    return res.send(foods);
  } catch (error) {
    return console.log(error);
  }
});

/**
 * Get a single Food Category by ID.
 *
 * @name GET /foodcategories/:id
 * @function
 * @param {Object} req - The request object.
 * @param {Object} req.params - The route parameters.
 * @param {string} req.params.id - The ID of the food category to retrieve.
 * @param {Object} res - The response object.
 * @returns {Object} Returns the food category object if found.
 * @returns {Object} Returns the error object if an error occurs.
 */
router.get("/:id", async (req, res) => {
  try {
    const post = await FoodCategory.findById(req.params.id);
    return res.json(post);
  } catch (err) {
    return res.status(500).send(err);
  }
});

/**
 * Get all Food Categories.
 *
 * @name GET /foodcategories/
 * @function
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Array<Object>} Returns an array of all food category objects.
 * @returns {Object} Returns the error object if an error occurs.
 */
router.get("/", async (req, res) => {
  try {
    const posts = await FoodCategory.find();
    return res.json(posts);
  } catch (err) {
    return res.status(500).send(err);
  }
});

/**
 * Add a new Food Category.
 *
 * @name POST /foodcategories/
 * @function
 * @param {Object} req - The request object.
 * @param {Object} req.body - The food category data.
 * @param {string} req.body.title - The title of the category.
 * @param {string} req.body.description - The description of the category.
 * @param {string} req.body.image - The image URL/path for the category.
 * @param {Object} res - The response object.
 * @returns {Object} Returns the created food category object.
 * @returns {Object} Returns the error object if an error occurs.
 */
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
