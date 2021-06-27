const router = require("express").Router();
const { Order, OrderItem } = require("../models/schemas");

/* Get Single Posts */
router.get("/:id", async (req, res) => {
  try {
    const post = await Food.findById(req.params.id).populate("category");
    return res.json(post);
  } catch (err) {
    return res.status(500).send(err);
  }
});

/* Get All Post */
router.get("/", async (req, res) => {
  try {
    const posts = await Order.find();
    return res.json(posts);
  } catch (err) {
    return res.status(500).send(err);
  }
});

/* Add New Order */
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
