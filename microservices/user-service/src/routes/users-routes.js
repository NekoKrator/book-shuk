const express = require('express')
const UserController = require('../controllers/users-controller')

const router = express.Router()

router.get('/:username', UserController.getUserProfile)
router.get('/', UserController.getAllUsers)

module.exports = router
