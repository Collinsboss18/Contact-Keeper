const express = require('express');
       router = express.Router();

/**
 * @route   GET api/auth
 * @desc    Get logged in User
 * @access  Private
 */
router.get('/', (req, res) => {
    res.send('Get logged in user');
});


/**
 * @route   POST api/auth
 * @desc    Register a User
 * @access  Public
 */
router.post('/', (req, res) => {
    res.send('Login user');
});

module.exports = router;