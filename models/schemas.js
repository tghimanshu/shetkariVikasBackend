const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const config = require("config");
const bcrypt = require("bcrypt");

/**
 * Connects to the MongoDB database.
 * The connection string is hardcoded for this example.
 * Logs a success message on connection or an error message on failure.
 */
mongoose
  .connect(
    "mongodb+srv://admin:admin@shetkarigramvikas.mhsy3.mongodb.net/test",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }
  )
  .then(() => console.log("connected to mongodb"))
  .catch((err) => console.log(err.message));

// * SCHEMAS

/**
 * Mongoose Schema for Food items.
 * @typedef {Object} FoodSchema
 * @property {string} title - The title of the food item.
 * @property {string} description - The description of the food item.
 * @property {number} price - The price of the food item.
 * @property {Array} images - An array of image URLs/paths for the food item.
 * @property {mongoose.Schema.Types.ObjectId} category - The category ID the food belongs to.
 */
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

/**
 * Mongoose Schema for Clothes items.
 * @typedef {Object} ClothesSchema
 * @property {string} title - The title of the cloth item.
 * @property {string} description - The description of the cloth item.
 * @property {number} price - The price of the cloth item.
 * @property {Array} images - An array of image URLs/paths for the cloth item.
 * @property {mongoose.Schema.Types.ObjectId} category - The category ID the cloth belongs to.
 */
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

/**
 * Mongoose Schema for Food Categories.
 * @typedef {Object} FoodCategorySchema
 * @property {string} title - The title of the food category.
 * @property {string} description - The description of the food category.
 * @property {string} image - The image URL/path for the category.
 */
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

/**
 * Mongoose Schema for Cloth Categories.
 * @typedef {Object} ClothCategorySchema
 * @property {string} title - The title of the cloth category.
 * @property {string} description - The description of the cloth category.
 * @property {string} image - The image URL/path for the category.
 */
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

/**
 * Mongoose Schema for Users.
 * @typedef {Object} UserSchema
 * @property {string} name - The name of the user.
 * @property {string} email - The email of the user.
 * @property {string} password - The hashed password of the user.
 * @property {string} phone - The phone number of the user.
 * @property {string} [street] - The street address of the user.
 * @property {string} [apartment] - The apartment number of the user.
 * @property {string} [zip] - The zip code of the user.
 * @property {string} [city] - The city of the user.
 * @property {string} [country] - The country of the user.
 */
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    default: "",
  },
  apartment: {
    type: String,
    default: "",
  },
  zip: {
    type: String,
    default: "",
  },
  city: {
    type: String,
    default: "",
  },
  country: {
    type: String,
    default: "",
  },
});

/**
 * Mongoose Schema for Admins.
 * @typedef {Object} AdminSchema
 * @property {string} username - The username of the admin.
 * @property {string} name - The name of the admin.
 * @property {string} email - The email of the admin.
 * @property {number} contact - The contact number of the admin.
 * @property {string} password - The hashed password of the admin.
 */
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

/**
 * Mongoose Schema for Orders.
 * @typedef {Object} OrderSchema
 * @property {Array} orderItems - Array of objects containing product ID and quantity.
 * @property {string} address1 - Primary address for the order.
 * @property {string} [address2] - Secondary address for the order.
 * @property {string} zip - Zip code for the order.
 * @property {string} phone - Phone number for the order.
 * @property {string} status - Status of the order (default: "Pending").
 * @property {number} [totalPrice] - Total price of the order.
 * @property {mongoose.Schema.Types.ObjectId} [user] - The ID of the user who placed the order.
 * @property {Date} dateOrdered - The date the order was placed.
 */
const orderSchema = mongoose.Schema({
  orderItems: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Food",
      },
      quantity: Number,
    },
  ],
  address1: {
    type: String,
    required: true,
  },
  address2: {
    type: String,
  },
  zip: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "Pending",
  },
  totalPrice: {
    type: Number,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  dateOrdered: {
    type: Date,
    default: Date.now,
  },
});

/**
 * Mongoose Schema for Order Items.
 * @typedef {Object} OrderItemSchema
 * @property {number} quantity - Quantity of the product.
 * @property {mongoose.Schema.Types.ObjectId} product - The product ID.
 */
const orderItemSchema = mongoose.Schema({
  quantity: {
    type: Number,
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Food",
  },
});

// * GENERATING TOKENS

/**
 * Generates a JSON Web Token (JWT) for an Admin.
 * @function
 * @memberof AdminSchema
 * @returns {string} The signed JWT containing the admin's ID and role.
 */
AdminSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, role: "admin" },
    config.get("jwt_token")
  );
  return token;
};

/**
 * Generates a JSON Web Token (JWT) for a User.
 * @function
 * @memberof UserSchema
 * @returns {string} The signed JWT containing the user's ID, role, and user object.
 */
UserSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, role: "user", user: this },
    config.get("jwt_token")
  );
  return token;
};

// * MODELS

/**
 * Mongoose Model for Food.
 * @type {mongoose.Model}
 */
const Food = mongoose.model("Food", FoodSchema);

/**
 * Mongoose Model for Cloth.
 * @type {mongoose.Model}
 */
const Cloth = mongoose.model("Cloth", ClothesSchema);

/**
 * Mongoose Model for FoodCategory.
 * @type {mongoose.Model}
 */
const FoodCategory = mongoose.model("FoodCategory", FoodCategorySchema);

/**
 * Mongoose Model for ClothCategory.
 * @type {mongoose.Model}
 */
const ClothCategory = mongoose.model("ClothCategory", ClothCategorySchema);

/**
 * Mongoose Model for User.
 * @type {mongoose.Model}
 */
const User = mongoose.model("User", UserSchema);

/**
 * Mongoose Model for Admin.
 * @type {mongoose.Model}
 */
const Admin = mongoose.model("Admin", AdminSchema);

/**
 * Mongoose Model for Order.
 * @type {mongoose.Model}
 */
const Order = mongoose.model("Order", orderSchema);

/**
 * Mongoose Model for OrderItem.
 * @type {mongoose.Model}
 */
const OrderItem = mongoose.model("OrderItem", orderItemSchema);

// * VALIDATION

/**
 * Validates admin data using Joi.
 * @function
 * @param {Object} data - The data object to validate.
 * @returns {Joi.ObjectSchema} The Joi validation schema.
 */
const adminValidate = (data) => {
  return Joi.object({
    username: Joi.string().required(),
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    contact: Joi.number().min(00000000).max(999999999999).required(),
    password: Joi.string().required(),
  });
};

/**
 * Validates user data using Joi.
 * @function
 * @param {Object} data - The data object to validate.
 * @returns {Joi.ObjectSchema} The Joi validation schema.
 */
const userValidate = (data) => {
  return Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.number().min(00000000).max(999999999999).required(),
    password: Joi.string().required(),
  });
};

// * HASHING PASSWORD

/**
 * Hashes a password using bcrypt.
 * @async
 * @function
 * @param {string} pass - The plain text password to hash.
 * @returns {Promise<string>} A promise that resolves to the hashed password.
 */
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
  Order,
  OrderItem,
  adminValidate,
  userValidate,
};
