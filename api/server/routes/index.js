const Response = require('../utils/response');
const config = require('../config');
const checkYoutubeToken = require('../middleware/auth').checkYoutubeToken;

module.exports = function(app) {
    // Add headers
    app.use((req, res, next) => {
        // TODO: It should probably allow connection from local only, as it is the UI doing the requests
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, authorization');
        next();
    });

    // Basic middleware to check that the provided youtube token is indeed valid
    app.use('/api/*', checkYoutubeToken);

    // TODO implement routes

    // Catch unknown API endpoints as 404
    app.all(`/${config.api.version}/*`, (req, res) => Response.NotFound().send(res));
};
