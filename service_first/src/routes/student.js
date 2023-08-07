const express = require("express");
const router = express.Router();

// controllers
const studentController = require("../controllers/student.controller");

router.get("/students", studentController.getStudents);

router.post("/students", studentController.createStudent);

router.delete("/students/:id", studentController.removeStudent);

router.put("/students/:id", studentController.updateStudent);

module.exports = router;
