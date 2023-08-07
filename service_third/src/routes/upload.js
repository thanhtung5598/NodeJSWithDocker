const express = require("express");
const router = express.Router();

// controllers
const uploadController = require("../controllers/upload.controller");

router.post("/upload", uploadController.uploadFile);

router.get("/upload/:filename", uploadController.downloadFile);

router.delete("/upload/:filename", uploadController.deleteFile);

module.exports = router;
