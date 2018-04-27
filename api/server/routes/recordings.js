const express = require('express');
const axios = require('axios').create({
    baseURL: `http://localhost:${process.env.CONTRACT_API_PORT}/v1/contracts/Licensor/`
});
const OMI_DATA = require('../data/recordings');

module.exports = function() {
    const router = express.Router();

    router.route('/').get(async (req, res) => {
        const response = (await axios.get('/GetISRCs')).data.result;
        const isrcs = response.split(',');
        const recordings = OMI_DATA.filter(item => isrcs.indexOf(item.isrc) > -1);
        return res.json(recordings);
    });

    return router;
};
