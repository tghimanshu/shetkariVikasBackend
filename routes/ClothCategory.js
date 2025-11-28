const router = require("express").Router();
const { ClothCategory } = require("../models/schemas");

/**
 * Get a single Cloth Category by ID.
 *
 * @name GET /clothcategories/:id
 * @function
 * @param {Object} req - The request object.
 * @param {Object} req.params - The route parameters.
 * @param {string} req.params.id - The ID of the cloth category to retrieve.
 * @param {Object} res - The response object.
 * @returns {Object} Returns the cloth category object if found.
 * @returns {Object} Returns the error object if an error occurs.
 */
router.get("/:id", async (req, res) => {
  try {
    const post = await ClothCategory.findById(req.params.id);
    return res.json(post);
  } catch (err) {
    return res.status(500).send(err);
  }
});

/**
 * Get all Cloth Categories.
 *
 * @name GET /clothcategories/
 * @function
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Array<Object>} Returns an array of all cloth category objects.
 * @returns {Object} Returns the error object if an error occurs.
 */
router.get("/", async (req, res) => {
  try {
    const posts = await ClothCategory.find();
    return res.json(posts);
  } catch (err) {
    return res.status(500).send(err);
  }
});

/**
 * Add a new Cloth Category.
 *
 * @name POST /clothcategories/
 * @function
 * @param {Object} req - The request object.
 * @param {Object} req.body - The cloth category data.
 * @param {string} req.body.title - The title of the category.
 * @param {string} req.body.description - The description of the category.
 * @param {string} req.body.image - The image URL/path for the category.
 * @param {Object} res - The response object.
 * @returns {Object} Returns the created cloth category object.
 * @returns {Object} Returns the error object if an error occurs.
 */
router.post("/", async (req, res) => {
  try {
    const post = new ClothCategory(req.body);
    await post.save();
    return res.json(post);
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = router;
