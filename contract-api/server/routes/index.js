const Response = require('../utils/response');
const config = require('../config');

module.exports = function(app, contracts) {
    // Initialize all routes
    app.use(`/${config.api.version}/contracts/:contractName`, require('./contracts')({ mergeParams: true }, contracts));

    // Catch unknown API endpoints as 404
    app.all(`/${config.api.version}/*`, (req, res) => Response.NotFound().send(res));
};
