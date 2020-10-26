const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const contactController = require('../controllers/contactController');
const { check } = require('express-validator');

router.get('/', auth, contactController.getAllContacts);
router.post('/', [auth, [check('name', 'Name is required').not().isEmpty()]], contactController.addContact);
router.put('/:id', auth, contactController.updateContact);
router.delete('/:id', auth, );

module.exports = router;
