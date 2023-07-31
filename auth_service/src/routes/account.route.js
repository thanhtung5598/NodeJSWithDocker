const express = require("express");
const router = express.Router();
const accountController = require("../controllers/account.controller");
const accountValidator = require('../validators/account.validator')

router.post("/accounts/sign_in", accountValidator.validateLogin(), accountController.signIn);
router.post("/accounts/sign_up", accountValidator.validateRegister(), accountController.signUp);

module.exports = router;
