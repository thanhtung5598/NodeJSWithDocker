const express = require("express");
const router = express.Router();

// controllers
const uploadController = require("../controllers/upload.controller");

router.post("/", uploadController.uploadFile);

router.get("/:filename", uploadController.downloadFile);

router.delete("/:filename", uploadController.deleteFile);

module.exports = router;
