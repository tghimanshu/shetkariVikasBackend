const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const config = require("config");
const bcrypt = require("bcrypt");

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

AdminSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, role: "admin" },
    config.get("jwt_token")
  );
  return token;
};

UserSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, role: "user", user: this },
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

const Order = mongoose.model("Order", orderSchema);

const OrderItem = mongoose.model("OrderItem", orderItemSchema);

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
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.number().min(00000000).max(999999999999).required(),
    password: Joi.string().required(),
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
  Order,
  OrderItem,
  adminValidate,
  userValidate,
};
