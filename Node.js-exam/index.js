const express = require('express');

const generalConfig = require('./config');
const databaseConfig = require('./config/database');
const expressConfig = require('./config/express');
const routesConfig = require('./config/routes');

async function start() {
	const app = express();

	await databaseConfig(app);

	expressConfig(app);

	routesConfig(app);

	app.listen(generalConfig.PORT, () => {
		console.log(
			`Application started at http://localhost:${generalConfig.PORT}`
		);
	});
}

start();
