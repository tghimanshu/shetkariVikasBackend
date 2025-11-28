const router = require("express").Router();
const { User, hash_password, userValidate } = require("../models/schemas");
const bcrypt = require("bcrypt");

/**
 * Login as User.
 * Verifies email and password, and returns a JWT token.
 *
 * @name POST /user/login
 * @function
 * @param {Object} req - The request object.
 * @param {Object} req.body - The request body.
 * @param {string} req.body.email - The user's email.
 * @param {string} req.body.password - The user's password.
 * @param {Object} res - The response object.
 * @returns {Object} Returns object containing the JWT token.
 * @returns {string} Returns error message if authentication fails.
 */
router.post("/login", async (req, res) => {
  try {
    const admin = await User.findOne({
      email: req.body.email,
    });
    if (!admin) return res.status(400).send("Invalid Username Or Password!");

    const pass = await bcrypt.compare(req.body.password, admin.password);

    if (!pass) return res.status(400).send("Invalid Username Or Password!");

    const token = admin.generateAuthToken();

    res.header("x-auth-token", token).send({ token: token });
  } catch (err) {
    return res.status(500).send(err);
  }
});

/**
 * Get a single User by ID.
 *
 * @name GET /user/:id
 * @function
 * @param {Object} req - The request object.
 * @param {Object} req.params - The route parameters.
 * @param {string} req.params.id - The ID of the user to retrieve.
 * @param {Object} res - The response object.
 * @returns {Object} Returns the user object if found.
 * @returns {Object} Returns the error object if an error occurs.
 */
router.get("/:id", async (req, res) => {
  try {
    const admin = await User.findById(req.params.id);
    return res.json(admin);
  } catch (err) {
    return res.status(500).send(err);
  }
});

/**
 * Get all Users.
 *
 * @name GET /user/
 * @function
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Array<Object>} Returns an array of all user objects.
 * @returns {Object} Returns the error object if an error occurs.
 */
router.get("/", async (req, res) => {
  try {
    const admins = await User.find();
    return res.json(admins);
  } catch (err) {
    return res.status(500).send(err);
  }
});

/**
 * Register a new User.
 * Hashes the password, saves the user, and generates a token.
 *
 * @name POST /user/
 * @function
 * @param {Object} req - The request object.
 * @param {Object} req.body - The user registration data.
 * @param {string} req.body.password - The password to hash and save.
 * @param {Object} res - The response object.
 * @returns {Object} Returns object containing the JWT token.
 * @returns {Object} Returns the error object if an error occurs.
 */
router.post("/", async (req, res) => {
  try {
    // const validate = studentValidate(req.body);
    // if (validate.error) return res.status(400).send(validate.error.message);
    console.log(req, req.body.password);

    req.body.password = await hash_password(req.body.password);

    const admin = new User(req.body);
    const result = await admin.save();
    const token = admin.generateAuthToken();
    res.send({ token: token });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

module.exports = router;
