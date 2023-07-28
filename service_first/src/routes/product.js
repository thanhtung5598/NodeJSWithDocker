const express = require("express");
const router = express.Router();

// controllers
const productController = require("../controllers/product.controller");

router.get("/", productController.getAllProducts);

router.post("/", productController.createProduct);

module.exports = router;
