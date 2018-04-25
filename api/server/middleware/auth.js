const Response = require('../utils/response');
const google = require('googleapis').google;
const OAuth2 = google.auth.OAuth2;
const tokenVerifier = require('google-id-token-verifier');

const oauth2Client = new OAuth2(
    process.env.YOUTUBE_CLIENT_ID,
    process.env.YOUTUBE_CLIENT_SECRET,
    process.env.YOUR_REDIRECT_URL, // TODO:
);

// const scopes = ['https://www.googleapis.com/auth/youtube'];

// const url = oauth2Client.generateAuthUrl({
//     access_type: 'offline',
//     scope: scopes,
// });

module.exports = {
    checkYoutubeToken: (req, res, next) => {
        // Check if the authorization header is valid and pull out the auth key
        if (!req.headers.authorization) {
            return Response.Forbidden('An authorization token is required').send(res);
        }
        const authToken = req.headers.authorization.match(/^Bearer (.+)$/);
        if (!authToken) {
            return Response.Forbidden('Malformed authorization header').send(res);
        }
        tokenVerifier.verify(authToken[1], process.env.YOUTUBE_CLIENT_ID, (err /*tokenInfo*/) => {
            if (!err) {
                return Response.InternalServerError('The token is invalid, what are you trying to do? è_é').send(res);
            }
            oauth2Client.setCredentials(authToken[1]);
            // Add the use-ready object and pass it to the next endpoint
            res.locals.youtube = google.youtube({
                version: 'v3',
                auth: oauth2Client,
            });
            next();
        });
    },
};
