const mongoose = require('mongoose');

const schema = new mongoose.Schema({
	startPoint: {
		type: String,
		required: [true, 'Start point is required.'],
		minlength: 4
	},
	endPoint: {
		type: String,
		required: [true, 'End point is required.'],
		minlength: 4
	},
	date: {
		type: String,
		required: [true, 'Date is required.']
	},
	time: {
		type: String,
		required: [true, 'Time is required.']
	},
	carImage: {
		type: String,
		required: [true, 'Car image is required.'],
		match: [/^https?:\/\//, 'Invalid image URL!']
	},
	carBrand: {
		type: String,
		required: [true, 'Car brand is required.'],
		minLength: 4
	},
	seats: {
		type: Number,
		required: [true, 'Seats are required.'],
		min: 0,
		max: 4
	},
	price: {
		type: Number,
		required: [true, 'Price is required.'],
		min: 1,
		max: 50
	},
	description: {
		type: String,
		required: [true, 'Description is required.'],
		minLength: 10
	},
	creator: {
		type: mongoose.Types.ObjectId,
		ref: 'User'
	},
	buddies: [
		{
			type: mongoose.Types.ObjectId,
			ref: 'User'
		}
	]
});

const Trip = mongoose.model('Trip', schema);

module.exports = Trip;
