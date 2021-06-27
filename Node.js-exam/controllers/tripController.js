const { Router } = require('express');
const { body, validationResult } = require('express-validator');

const { isAuth, isCreator } = require('../middlewares/guards');
const tripService = require('../services/tripService');

const authService = require('../services/authService');

const router = Router();

router.get('/all', async (req, res) => {
	const trips = await tripService.getAll();

	res.render('shared-trips', { title: 'Shared trips', trips });
});

router.get('/create', isAuth(), (req, res) => {
	res.render('trip/trip-create', { title: 'Create trip' });
});

router.post('/create', async (req, res) => {
	const data = {
		startPoint: req.body.startPoint,
		endPoint: req.body.endPoint,
		date: req.body.date,
		time: req.body.time,
		carImage: req.body.carImage,
		carBrand: req.body.carBrand,
		seats: Number(req.body.seats),
		price: Number(req.body.price),
		description: req.body.description,
		creator: req.user._id
	};
	try {
		await tripService.createTrip(data);
		res.redirect('/');
	} catch (error) {
		const trips = await tripService.getAll();
		res.render('shared-trips', {
			title: 'Shared trips',
			errors: error.message.split('\n'),
			trips
		});
	}
});

router.get('/:id/details', isAuth(), async (req, res) => {
	const trip = await tripService.getOneById(req.params.id);
	trip.isCreator = trip.creator == req.user._id;
	trip.hasJoined = trip.buddies.some((x) => x._id == req.user._id);

	let seats = 0;
	let buddies = [];

	if (trip.buddies.length > 0) {
		buddies = trip.buddies.map((x) => x.email).join(', ');
	}

	if (trip.seats > 0) {
		seats = trip.seats;
	}

	res.render('trip/trip-details', {
		title: 'Details',
		trip,
		driver: req.user.email,
		buddies,
		seats
	});
});

router.get('/:id/join', isAuth(), async (req, res) => {
	const tripId = req.params.id;

	try {
		await tripService.joinTrip(tripId, req.user);
	} catch (error) {
		res.render(`/trip/${tripId}/details`, {
			title: 'Details',
			errors: error.message.split('\n'),
			trip: data
		});
	}

	const trip = await tripService.getOneById(req.params.id);

	await tripService.reduceSeats(req.params.id);

	await authService.updateTripsHistory(req.user._id, trip);
	await res.redirect(`/trip/${tripId}/details`);
});

router.get('/:id/edit', isAuth(), isCreator(), async (req, res) => {
	const trip = await tripService.getOneById(req.params.id);
	res.render('trip/trip-edit', { title: 'Edit', trip });
});

router.post('/:id/edit', isAuth(), isCreator(), async (req, res) => {
	const tripId = req.params.id;
	const data = {
		startPoint: req.body.startPoint,
		endPoint: req.body.endPoint,
		date: req.body.date,
		time: req.body.time,
		carImage: req.body.carImage,
		carBrand: req.body.carBrand,
		seats: Number(req.body.seats),
		price: Number(req.body.price),
		description: req.body.description,
		creator: req.user._id
	};
	try {
		await tripService.editTrip(tripId, data);
		res.redirect(`/trip/${tripId}/details`);
	} catch (error) {
		res.render('trip/trip-edit', {
			title: 'Edit',
			errors: error.message.split('\n'),
			trip: data
		});
	}
});

router.get('/:id/delete', isAuth(), isCreator(), async (req, res) => {
	await tripService.deleteTrip(req.params.id);
	res.redirect('/trip/all');
});

module.exports = router;
