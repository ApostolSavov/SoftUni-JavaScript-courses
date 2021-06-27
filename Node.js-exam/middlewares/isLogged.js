const jwt = require('jsonwebtoken');
const { COOKIE_NAME, TOKEN_SECRET } = require('../config');

module.exports = () => (req, res, next) => {
	const token = req.cookies[COOKIE_NAME];
	try {
		const verified = jwt.verify(token, TOKEN_SECRET);
		req.user = verified;
		res.locals = verified;
		res.locals.isLogged = true;
	} catch (error) {
		res.clearCookie(COOKIE_NAME);
	}

	next();
};
