const Trip = require('../models/Trip');

const getAll = () => {
	return Trip.find({}).lean();
};

const createTrip = (data) => {
	const trip = new Trip(data);
	return trip.save();
};

const getOneById = (tripId) => {
	return Trip.findOne({ _id: tripId }).populate('buddies').lean();
};

const reduceSeats = async (tripId) => {
	const trip = await Trip.findOne({ _id: tripId });

	trip.seats = trip.seats - 1;

	return trip.save();
};

const joinTrip = async (tripId, user) => {
	const trip = await Trip.findOne({ _id: tripId }).populate('buddies');

	const alreadyJoined = trip.buddies.some((x) => x.email == user.email);

	if (alreadyJoined) {
		throw new Error('You have already joined the trip');
	}

	trip.buddies.push(user._id);
	return trip.save();
};

const editTrip = async (tripId, data) => {
	const trip = await Trip.findOne({ _id: tripId });
	Object.assign(trip, data);
	return trip.save();
};

const deleteTrip = async (tripId) => {
	return Trip.deleteOne({ _id: tripId });
};

module.exports = {
	getAll,
	createTrip,
	getOneById,
	joinTrip,
	editTrip,
	deleteTrip,
	reduceSeats
};
