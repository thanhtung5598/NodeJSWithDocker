const express = require("express");
const router = express.Router();

// controllers
const bookController = require("../controllers/book.controller");

router.get("/book", bookController.getAllBook);

router.post("/book", bookController.createBook);

router.put("/book/:id", bookController.updateBook);

router.delete("/book/:id", bookController.deleteBook);

module.exports = router;
