const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')

router.get('/users/me', userController.getProfile)

module.exports = router
