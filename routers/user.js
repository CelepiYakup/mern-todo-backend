const express = require('express');
const userController = require('../controllers/userController');


//controller functions
const { signupUser,loginUser } = require('../controllers/userController')

const router = express.Router()

//login router
router.post('/login', loginUser)

// signup router
router.post('/signup',  signupUser)

module.exports = router