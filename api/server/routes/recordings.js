const express = require('express');
const axios = require('axios');
const OMI_DATA = require('../data/recordings');

module.exports = function() {
    const router = express.Router();

    router.route('/').get(async (req, res) => {
        let isrcs = await axios.get(`http://localhost:${process.env.CONTRACT_API_PORT}/v1/contracts/Licensor/GetISRCs`);
        isrcs = isrcs.split(',');
        const recordings = OMI_DATA.filter(item => isrcs.indexOf(item.isrc) > -1);
        return res.json(recordings);
    });

    return router;
};
