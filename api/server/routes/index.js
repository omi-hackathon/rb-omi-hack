const Response = require('../utils/response');
const config = require('../config');

module.exports = function (app) {

    // TODO implement routes

    // Catch unknown API endpoints as 404
    app.all(`/${config.api.version}/*`, (req, res) => Response.NotFound().send(res));
};
