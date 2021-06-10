const mongoose = require("mongoose");
const Joi = require("joi");
const config = require("config");
const bcrypt = require("bcrypt");

mongoose
  .connect("mongodb://localhost/shetkariVikas", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("connected to mongodb"))
  .catch((err) => console.log(err.message));

// * SCHEMAS

const FoodSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  images: {
    type: Array,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FoodCategory",
    required: true,
  },
});

const ClothesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  images: {
    type: Array,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ClothCategory",
    required: true,
  },
});

const FoodCategorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const ClothCategorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const AdminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// * GENERATING TOKENS

AdminSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, role: "admin" },
    config.get("jwt_token")
  );
  return token;
};

UserSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, role: "user" },
    config.get("jwt_token")
  );
  return token;
};

// * MODELS

const Food = mongoose.model("Food", FoodSchema);

const Cloth = mongoose.model("Cloth", ClothesSchema);

const FoodCategory = mongoose.model("FoodCategory", FoodCategorySchema);

const ClothCategory = mongoose.model("ClothCategory", ClothCategorySchema);

const User = mongoose.model("User", UserSchema);

const Admin = mongoose.model("Admin", AdminSchema);

// * VALIDATION

const adminValidate = (data) => {
  return Joi.object({
    username: Joi.string().required(),
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    contact: Joi.number().min(00000000).max(999999999999).required(),
    password: Joi.string().required(),
  });
};

const userValidate = (data) => {
  return Joi.object({
    username: Joi.string().required(),
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    contact: Joi.number().min(00000000).max(999999999999).required(),
    password: Joi.string().required(),
    address: Joi.string(),
  });
};

// * HASHING PASSWORD

async function hash_password(pass) {
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(pass, salt);
  return hashed;
}

// * EXPORTS

module.exports = {
  hash_password,
  Food,
  Cloth,
  FoodCategory,
  ClothCategory,
  Admin,
  User,
  adminValidate,
  userValidate,
};
