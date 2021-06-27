const dbName = 'shared-trips';

module.exports = {
	PORT: 3000,
	DB_CONNECTION_STRING: `mongodb://localhost:27017/${dbName}`,
	TOKEN_SECRET: 'TOKEN_SECRET',
	COOKIE_NAME: 'SESSION_TOKEN'
};
