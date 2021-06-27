const mongoose = require('mongoose');

const schema = new mongoose.Schema({
	email: {
		type: String,
		required: [true, 'Email is required!']
	},
	gender: {
		type: String,
		enum: ['male', 'female'],
		required: [true, 'Gender is required!']
	},
	password: {
		type: String,
		required: [true, 'Password is required!']
	},
	tripsHistory: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Trip'
		}
	]
});

const User = mongoose.model('User', schema);

module.exports = User;
