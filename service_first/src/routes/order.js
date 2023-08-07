const express = require("express");
const router = express.Router();

// controllers
const orderController = require("../controllers/order.controller");

router.post("/order", orderController.createOrder);

router.get("/order/:email", orderController.getListOrderByEmail);

module.exports = router;
