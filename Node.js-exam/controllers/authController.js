const { Router } = require('express');
const { body, validationResult } = require('express-validator');

const authService = require('../services/authService');
const { COOKIE_NAME } = require('../config');
const { isGuest, isAuth } = require('../middlewares/guards');

const router = Router();

router.get('/profile/:id', async (req, res) => {
	let user = await authService.getUserProfile(req.params.id);
	let trips = [];

	if (user.tripsHistory.length > 0) {
		trips = user.tripsHistory;
	}

	res.render('profile', { title: 'Profile', user, trips });
});

router.get('/login', isGuest(), (req, res) => {
	res.render('login', { title: 'Login' });
});

router.get('/register', isGuest(), (req, res) => {
	res.render('register', { title: 'Register' });
});

router.post(
	'/login',
	isGuest(),
	body('email')
		.trim()
		.isLength({ min: 3 })
		.withMessage('Username must be at least 3 characters long!')
		.custom((value, { req }) => {
			if (!value.match(/^[A-Za-z0-9_]+@[A-Za-z]+\.[A-Za-z]+$/)) {
				throw new Error('Invalid email address format!');
			}
			return true;
		}),
	body('password')
		.trim()
		.isLength({ min: 4 })
		.withMessage('Password must be at least 4 characters long!')
		.isAlphanumeric()
		.withMessage(
			'Password must consist of only english letters and digits!'
		),
	async (req, res) => {
		const { email, password } = req.body;

		try {
			const errors = validationResult(req)
				.array()
				.map((err) => err.msg);

			if (errors.length > 0) {
				throw new Error(errors.join('\n'));
			}

			const token = await authService.login(email, password);
			res.cookie(COOKIE_NAME, token);
			res.redirect('/');
		} catch (error) {
			res.render('login', {
				title: 'Login',
				errors: error.message.split('\n'),
				oldData: { email }
			});
		}
	}
);

router.post(
	'/register',
	isGuest(),
	body('email')
		.trim()
		.isLength({ min: 3 })
		.withMessage('Username must be at least 3 characters long!')
		.custom((value, { req }) => {
			if (!value.match(/^[A-Za-z0-9_]+@[A-Za-z]+\.[A-Za-z]+$/)) {
				throw new Error('Invalid email address format!');
			}
			return true;
		}),
	body('password')
		.trim()
		.isLength({ min: 4 })
		.withMessage('Password must be at least 4 characters long!')
		.isAlphanumeric()
		.withMessage('Password must consist only english letters and digits!'),
	body('password')
		.trim()
		.custom((value, { req }) => {
			if (value && value !== req.body.rePass) {
				throw new Error("Passwords don't match!");
			}
			return true;
		}),
	async (req, res) => {
		const { email, password, gender } = req.body;

		try {
			const errors = validationResult(req)
				.array()
				.map((err) => err.msg);

			if (errors.length > 0) {
				throw new Error(errors.join('\n'));
			}

			await authService.register(email, password, gender);

			const token = await authService.login(email, password);

			res.cookie(COOKIE_NAME, token);
			res.redirect('/');
		} catch (error) {
			res.render('register', {
				title: 'Register',
				errors: error.message.split('\n'),
				oldData: { email }
			});
		}
	}
);

router.get('/logout', isAuth(), (req, res) => {
	res.clearCookie(COOKIE_NAME);
	res.redirect('/');
});

module.exports = router;
