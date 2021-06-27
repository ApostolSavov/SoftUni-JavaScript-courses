const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const { TOKEN_SECRET } = require('../config');

const getUserProfile = async (id) => {
	const user = await User.findOne({ _id: id })
		.populate('tripsHistory')
		.lean();
	return user;
};

const updateTripsHistory = async (id, trip) => {
	const user = await User.findById(id);

	user.tripsHistory.push(trip);

	return user.save();
};

const login = async (email, password) => {
	const user = await User.findOne({
		email: { $regex: new RegExp(`^${email}$`, 'i') }
	}).lean();

	if (user == null) {
		throw new Error('User not found!');
	}

	const isMatch = await bcrypt.compare(password, user.password);

	if (!isMatch) {
		throw new Error('Invalid password!');
	}

	const token = jwt.sign({ email: user.email, _id: user._id }, TOKEN_SECRET);
	return token;
};

const register = async (email, password, gender) => {
	let user = await User.findOne({
		email: { $regex: new RegExp(`^${email}$`, 'i') }
	}).lean();

	if (user != null) {
		throw new Error('Email already exists!');
	}

	const hashedPass = await bcrypt.hash(password, 10);
	user = new User({ email, password: hashedPass, gender });

	return user.save();
};

module.exports = {
	login,
	register,
	updateTripsHistory,
	getUserProfile
};
