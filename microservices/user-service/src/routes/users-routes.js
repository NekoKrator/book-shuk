const express = require('express')
const UserController = require('../controllers/users-controller')
const usersController = require('../controllers/users-controller')

const router = express.Router()

router.get('/:username', UserController.getUserProfile.bind(usersController))

module.exports = router
