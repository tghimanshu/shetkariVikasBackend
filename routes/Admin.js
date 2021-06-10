const router = require("express").Router();
const { Admin, hash_password, adminValidate } = require("../models/schemas");
const bcrypt = require("bcrypt");

/* Login as Admin */
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

/* Get Single Posts */
router.get("/:id", async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    return res.json(admin);
  } catch (err) {
    return res.status(500).send(err);
  }
});

/* Get All Post */
router.get("/", async (req, res) => {
  try {
    const admins = await Admin.find();
    return res.json(admins);
  } catch (err) {
    return res.status(500).send(err);
  }
});

/* Add New Post */
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
