/**
 * @author Collins Charles (abadaikecollins@gmail.com)
 * @action Handles user auth
 */

const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { validationResult } = require('express-validator');

exports.getLoggedInUser = async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');
		res.json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
};

exports.loginUser = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

	const { email, password } = req.body;

	try {
		let user = await User.findOne({ email });
		if (!user) return res.status(400).json({ msg: 'Invalid Email' });
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) return res.status(400).json({ msg: 'Invalid Password' });

		const payload = { user: { id: user.id } };
		jwt.sign(
			payload,
			config.get('jwtSecret'),
			{
				expiresIn: 36000,
			},
			(err, token) => {
				if (err) throw err;
				res.json({ token });
			}
		);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
};
