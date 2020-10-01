const express = require('express');
       router = express.Router();

/**
 * @route   POST api/users
 * @desc    Register a User
 * @access  Public
 */
router.post('/', (req, res) => {
    res.send('Register Route');
});

module.exports = router;