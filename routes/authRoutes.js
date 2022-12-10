const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');

router.post('/signup', authController.signup);
router.post('/signup/verify', authController.sverify);
router.post('/login', authController.login);

router.get('/',authController.home);

module.exports = router;