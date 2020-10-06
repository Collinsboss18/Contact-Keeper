const express = require('express'),
  User = require('../models/User'),
  Contact = require('../models/Contact'),
  auth = require('../middleware/auth');
router = express.Router();
const { check, validationResult } = require('express-validator');

/**
 * @route   GET api/contacts
 * @desc    Get all user contacts
 * @access  Private
 */
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 });
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error...' });
  }
});

/**
 * @route   POST api/contacts
 * @desc    Add new contact
 * @access  Private
 */
router.post('/', [auth, [check('name', 'Name is required').not().isEmpty()]], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { name, email, phone, type } = req.body;

  try {
    const newContact = new Contact({ name, email, phone, type, user: req.user.id });
    const contact = await newContact.save();
    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error...');
  }
});

/**
 * @route   PUT api/contacts/:id
 * @desc    Update contact
 * @access  Private
 */
router.put('/:id', (req, res) => {
  try {
    Contact.findByIdAndUpdate(req.params.id, req.body, function (err, updated) {
      if (!err) return res.json(updated);
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error...');
  }
});

/**
 * @route   DELETE api/contacts/:id
 * @desc    Delete contact
 * @access  Private
 */
router.delete('/:id', (req, res) => {
  try {
    Contact.findByIdAndRemove(req.params.id, function (err) {
      if (!err) return res.status(200).json({ success: 'Contact Deleted' });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error...');
  }
});

module.exports = router;
