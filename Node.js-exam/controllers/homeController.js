const { Router } = require('express');

const router = Router();

router.get('/', async (req, res) => {
	let items;

	res.render('home/home', { title: 'Home', items });
});

router.all('*', (req, res) => {
	res.render('404', { title: 'Page Not Found' });
});

module.exports = router;
