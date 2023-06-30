const express = require("express");
const router = express.Router();

// controllers
const bookController = require("../controllers/book.controller");

router.get("/", bookController.getAllBook);

// router.post("/", bookController.createBook);

// router.put("/:id", bookController.updateBook);

// router.delete("/:id", bookController.deleteBook);

module.exports = router;
