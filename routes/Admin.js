const router = require("express").Router();
const { Admin, hash_password, adminValidate } = require("../models/schemas");
const bcrypt = require("bcrypt");

/**
 * Login as Admin.
 * Verifies email and password, checks if admin exists, and returns an auth token.
 *
 * @name POST /admin/login
 * @function
 * @param {Object} req - The request object.
 * @param {Object} req.body - The body of the request.
 * @param {string} req.body.email - The email of the admin to login.
 * @param {string} req.body.password - The password of the admin.
 * @param {Object} res - The response object.
 * @returns {string} Returns the JWT auth token if login is successful.
 * @returns {string} Returns an error message if authentication fails.
 */
router.post("/login", async (req, res) => {
  const admin = await Admin.findOne({
    email: req.body.email,
  });
  if (!admin) return res.status(400).send("Invalid Username Or Password!");

  const pass = await bcrypt.compare(req.body.password, admin.password);

  if (!pass) return res.status(400).send("Invalid Username Or Password!");

  const token = admin.generateAuthToken();

  res.header("x-auth-token", token).send(token);
});

/**
 * Get a single Admin by ID.
 *
 * @name GET /admin/:id
 * @function
 * @param {Object} req - The request object.
 * @param {Object} req.params - The route parameters.
 * @param {string} req.params.id - The ID of the admin to retrieve.
 * @param {Object} res - The response object.
 * @returns {Object} Returns the admin object if found.
 * @returns {Object} Returns the error object if an error occurs.
 */
router.get("/:id", async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    return res.json(admin);
  } catch (err) {
    return res.status(500).send(err);
  }
});

/**
 * Get all Admins.
 *
 * @name GET /admin/
 * @function
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Array<Object>} Returns an array of all admin objects.
 * @returns {Object} Returns the error object if an error occurs.
 */
router.get("/", async (req, res) => {
  try {
    const admins = await Admin.find();
    return res.json(admins);
  } catch (err) {
    return res.status(500).send(err);
  }
});

/**
 * Create a new Admin.
 * Validates the request body, hashes the password, and saves the new admin.
 *
 * @name POST /admin/
 * @function
 * @param {Object} req - The request object.
 * @param {Object} req.body - The admin data to create.
 * @param {string} req.body.username - The username of the new admin.
 * @param {string} req.body.name - The name of the new admin.
 * @param {string} req.body.email - The email of the new admin.
 * @param {number} req.body.contact - The contact number of the new admin.
 * @param {string} req.body.password - The password of the new admin.
 * @param {Object} res - The response object.
 * @returns {Object} Returns the created admin object.
 * @returns {string} Returns an error message if validation fails or an error occurs.
 */
router.post("/", async (req, res) => {
  try {
    const validate = adminValidate(req.body);
    if (validate.error) return res.status(400).send(validate.error.message);

    req.body.password = await hash_password(req.body.password);

    const admin = new Admin(req.body);
    const result = await admin.save();
    res.send(result);
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = router;
