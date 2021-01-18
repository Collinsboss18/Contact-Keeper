/**
 * @author Collins Charles (abadaikecollins@gmail.com)
 * @action
 */

const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { validationResult } = require('express-validator');

exports.registerUser = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

	const { name, email, password } = req.body;

	try {
		let user = await User.findOne({ email });
		if (user) return res.status(400).json({ msg: 'User already exists' });
		user = new User({ name, email, password });
		salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(password, salt);
		await user.save();
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
