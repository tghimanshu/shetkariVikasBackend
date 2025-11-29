const router = require("express").Router();
const { Order, OrderItem } = require("../models/schemas");

/**
 * Get a single Order by ID.
 * Note: This implementation seems to search in `Food` collection instead of `Order`.
 * It might be a bug in the original code, but documenting as is.
 *
 * @name GET /order/:id
 * @function
 * @param {Object} req - The request object.
 * @param {Object} req.params - The route parameters.
 * @param {string} req.params.id - The ID of the item to retrieve.
 * @param {Object} res - The response object.
 * @returns {Object} Returns the found object.
 * @returns {Object} Returns the error object if an error occurs.
 */
router.get("/:id", async (req, res) => {
  try {
    // BUG: This queries Food instead of Order
    const post = await Food.findById(req.params.id).populate("category");
    return res.json(post);
  } catch (err) {
    return res.status(500).send(err);
  }
});

/**
 * Get all Orders.
 *
 * @name GET /order/
 * @function
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Array<Object>} Returns an array of all order objects.
 * @returns {Object} Returns the error object if an error occurs.
 */
router.get("/", async (req, res) => {
  try {
    const posts = await Order.find();
    return res.json(posts);
  } catch (err) {
    return res.status(500).send(err);
  }
});

/**
 * Create a new Order.
 * Calculates total price based on cart items and quantities.
 *
 * @name POST /order/
 * @function
 * @param {Object} req - The request object.
 * @param {Object} req.body - The order data.
 * @param {Array<Object>} req.body.cart - Array of items in the cart.
 * @param {string} req.body.cart[].price - Price of a single item.
 * @param {number} req.body.cart[].amount - Quantity of the item.
 * @param {string} req.body.cart[]._id - Product ID of the item.
 * @param {string} req.body.address1 - Primary address.
 * @param {string} [req.body.address2] - Secondary address.
 * @param {string} req.body.zip - Zip code.
 * @param {string} req.body.phone - Phone number.
 * @param {string} req.body.user - User ID placing the order.
 * @param {Object} res - The response object.
 * @returns {Object} Returns success status and the created order data.
 * @returns {Object} Returns the error object if an error occurs.
 */
router.post("/", async (req, res) => {
  try {
    console.log("object");
    let totalPrice = 0;
    const orderItems = req.body.cart.map((item) => {
      totalPrice += item.price * item.amount;
      return {
        product: item._id,
        quantity: item.amount,
      };
    });
    console.log(orderItems);
    const order = new Order({
      orderItems: orderItems,
      address1: req.body.address1,
      address2: req.body.address2,
      zip: req.body.zip,
      phone: req.body.phone,
      totalPrice: totalPrice,
      user: req.body.user,
    });
    const data = await order.save();
    res.json({ sucess: true, data: data });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

module.exports = router;
