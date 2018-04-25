const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const logger = require('winston');
const helmet = require('helmet');
const Response = require('../utils/response');
const config = require('../config');

module.exports = function () {
    return new Promise(resolve => {
        const app = express();

        // Security
        app.use(helmet());

        // Log HTTP requests
        app.use(morgan('common'));

        // Disable cache control
        app.set('etag', false);

        // Parse request bodies
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json({ type: '*/*' }));
        app.use(cookieParser());

        // CROSS ORIGIN RESOURCE SHARING
        app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', config.cors_origin);
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Authorization, Accept');
            if (req.method === 'OPTIONS') {
                return res.sendStatus(200);
            }
            next();
        });

        logger.info('[SERVER] Initializing routes');
        require('../routes/index')(app);

        // Catch 404
        app.use((req, res) => Response.NotFound().send(res));
        // Catch errors
        app.use((err, req, res) => {
            logger.error('[InternalServerError]:\n', err);
            // Only send back error message in development
            return Response.InternalServerError(process.env.NODE_ENV === 'development' ? err : {}).send(res);
        });

        app.listen(process.env.PORT);
        logger.info(`[SERVER] Listening on port ${process.env.PORT}`);

        return resolve(app);
    });
};
