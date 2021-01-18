/**
 * @author Collins Charles (abadaikecollins@gmail.com)
 * @action Handles routes to '/api/auth'
 */

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const authController = require('../controllers/authController');
const { check } = require('express-validator');

router.get('/', auth, authController.getLoggedInUser);
router.post('/', [check('email', 'Please include a valid email').isEmail(), check('password', 'Password is required').exists()], authController.loginUser);

module.exports = router;
