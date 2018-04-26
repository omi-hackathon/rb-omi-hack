const Response = require('../utils/response');
const config = require('../config');
const recordings = require('../data/recordings');
const checkYoutubeToken = require('../middleware/auth').checkYoutubeToken;

module.exports = function(app) {
    // Add headers
    app.use((req, res, next) => {
        // TODO: It should probably allow connection from local only, as it is the UI doing the requests
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, authorization');
        next();
        console.log(req.originalUrl);
    });

    app.get(`/${config.api.version}/api/recordings`, (req, res) => {
        res.json(recordings);
    });

    // Basic middleware to check that the provided youtube token is indeed valid
    app.use(`/${config.api.version}/api/*`, checkYoutubeToken);

    app.get(`/${config.api.version}/api/licenses`, (req, res) => {
        res.json([
            {
                comment: 'dummy license, Mike please forgive me :praying-emoji:',
                licenseID: '123licenseID456',
                link: null,
            },
            {
                comment: 'dummy license2, Mike please forgive me :praying-emoji:',
                licenseID: '456licenseID789',
                link: 'https://www.youtube.com/watch?v=WI4-HUn8dFc',
            },
        ]);
    });

    app.post(`/${config.api.version}/api/license/purchase`, (req, res) => {
        console.log(req.body);
        setTimeout(() => {
            res.sendStatus(200);
        }, 3000);
    });

    app.post(`/${config.api.version}/api/license/:id/link`, (req, res) => {
        console.log(req.query);
        console.log(req.body);
        setTimeout(() => {
            res.sendStatus(200);
        }, 3000);
    });

    // Catch unknown API endpoints as 404
    app.all(`/${config.api.version}/*`, (req, res) => Response.NotFound().send(res));
};
