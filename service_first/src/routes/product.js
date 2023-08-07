const express = require("express");
const router = express.Router();

// controllers
const productController = require("../controllers/product.controller");

router.get("/products", productController.getAllProducts);

router.post("/products", productController.createProduct);

router.delete("/products/:productId", productController.removeProduct);

module.exports = router;
