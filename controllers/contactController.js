const User = require('../models/User');
const Contact = require('../models/Contact');
const { validationResult } = require('express-validator');

exports.getAllContacts = async (req, res) => {
	try {
		const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 });
		res.json(contacts);
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ msg: 'Server Error...' });
	}
};

exports.addContact = async (req, res) => {
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
};

exports.updateContact = async (req, res) => {
	try {
		await Contact.findByIdAndUpdate(req.params.id, req.body, function (err, updated) {
			if (!err) return res.json(updated);
		});
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error...');
	}
};

exports.deleteContact = async (req, res) => {
	try {
		await Contact.findByIdAndRemove(req.params.id, function (err) {
			if (!err) return res.status(200).json({ success: 'Contact Deleted' });
		});
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error...');
	}
};
