const rp = require('request-promise'); // TODO move to axios

module.exports = function (app) {
    app.use('/api/*', async (req, res) => {
        if (req.method === 'OPTIONS') {
            return res.sendStatus(200);
        }
        try {
            let fwdResponse = await rp({
                uri: `http://localhost:${process.env.API_PORT}${req.originalUrl.substr(4)}`,
                qs: req.query,
                body: req.body,
                headers: req.headers,
                method: req.method,
                json: true,
                // Include headers
                transform: (body, response) => ({'headers': response.headers, 'data': body})
            });

            // TODO: Find cleaner way to perform proxy forwarding
            if (fwdResponse.headers['content-type'].indexOf('application/json') !== -1) {
                return res.status(200).json(fwdResponse.data);
            } else {
                res.writeHead(200, fwdResponse.headers);
                res.write(fwdResponse.data);
                res.end();
            }
        } catch (err) {
            console.error('Error in UI Proxy!',err);
            return res.status(err.statusCode || 500).json(err.message);
        }
    });
}
