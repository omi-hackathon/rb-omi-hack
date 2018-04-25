const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const logger = require('winston');
const helmet = require('helmet');
const path = require('path');
const compression = require('compression');
const config = require('./config');

const port = 4000;
const app = express();

// Set app config
app.set('api', config.api);

// Security
app.use(helmet());

// Log HTTP requests
app.use(morgan('common'));

// Compress all response bodies
app.use(compression());

// Parse request bodies
app.use(bodyParser.json({ type: 'application/json' }));

// Add headers
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Authorization, Accept');
	next();
});

// Inject routes
logger.info('[SERVER] Initializing routes');
require('./routes')(app);

// Fallback everything else to the React application
app.use(express.static(path.join(__dirname, '../client/dist')));
app.get('*', function (req, res) {
	res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// Listen for requests
logger.info('[SERVER] Starting...');
const server = app.listen(port, function () {
	logger.info(`Magic happens on port ${server.address().port}`.green);
});
