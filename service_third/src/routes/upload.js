const express = require("express");
const router = express.Router();

// controllers
const uploadController = require("../controllers/upload.controller");

router.post("/", uploadController.uploadFile);

router.get("/:filename", uploadController.downloadFile);

module.exports = router;
