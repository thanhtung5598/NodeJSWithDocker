const express = require("express");
const router = express.Router();

// controllers
const studentController = require("../controllers/student.controller");

router.get("/", studentController.getStudents);

router.post("/", studentController.createStudent);

router.delete("/:id", studentController.removeStudent);

router.put("/:id", studentController.updateStudent);

module.exports = router;
