const express = require('express');
       router = express.Router();

/**
 * @route   GET api/contact
 * @desc    Get all user contacts
 * @access  Private
 */
router.get('/', (req, res) => {
    res.send('Get all user Contact');
});

/**
 * @route   POST api/contact
 * @desc    Add new contact
 * @access  Private
 */
router.post('/', (req, res) => {
    res.send('Add Contact');
});

/**
 * @route   PUT api/contact/:id
 * @desc    Update contact
 * @access  Private
 */
router.put('/:id', (req, res) => {
    res.send('Update contact');
});

/**
 * @route   DELETE api/contact/:id
 * @desc    Delete contact
 * @access  Private
 */
router.delete('/:id', (req, res) => {
    res.send('Delete contact');
});

module.exports = router;