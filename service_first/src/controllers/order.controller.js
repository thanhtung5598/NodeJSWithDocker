const Order = require("../modal/order.modal");
const { v4: uuidv4 } = require("uuid");

module.exports.createOrder = async (req, res) => {
  const { email, firstName, lastName, address, phone, items } = req.body;
  const newOrder = new Order();

  newOrder.id = uuidv4();
  newOrder.email = email;
  newOrder.firstName = firstName;
  newOrder.lastName = lastName;
  newOrder.address = address;
  newOrder.phone = phone;
  newOrder.items = items;

  try {
    const result = await newOrder.save();
    res
      .status(201)
      .json({ message: "Order created successfully", order: result });
  } catch (error) {
    console.error("Error creating order:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the order" });
  }
};

module.exports.getListOrderByEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const orders = await Order.find({ email });

    res.status(200).json({ orders });
  } catch (error) {
    console.error("Error fetching orders by email:", error);
    res.status(500).json({ error: "An error occurred while fetching orders by email" });
  }
};
