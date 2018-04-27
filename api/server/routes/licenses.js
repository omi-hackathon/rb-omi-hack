const express = require('express');
const axios = require('axios').create({
    baseURL: `http://localhost:${process.env.CONTRACT_API_PORT}/v1/contracts/Licensor/`,
});

module.exports = function() {
    const router = express.Router();

    router.route('/').get(async (req, res) => {
        try {
            let licenseIDs = (await axios.get(`/GetLicensesByUserID?_userID=${req.query.userID}`)).data.result;
            licenseIDs = licenseIDs.split(',');
            const licenses = [];
            for (const id of licenseIDs) {
                const l = (await axios.get(`/GetLicense?_licenseID=${id}`)).data.result;
                licenses.push({
                    licenseID: l['0'],
                    userID: l['1'],
                    recordingID: l['2'],
                    status: l['3'],
                    licenseType: l['4'],
                    videoID: l['5'],
                });
            }
            return res.json(licenses);
        } catch (err) {
            console.log(err);
            return res.send(500);
        }
    });

    router.route('/purchase').post(async (req, res) => {
        try {
            const response = (await axios.get(`/GetRecordingByISRC?_isrc=${req.body.isrc}`)).data.result;
            const recordingID = response['0'];

            await axios.post('/IssueLicense', {
                _userID: req.body.userID,
                _recordingID: recordingID,
                _licenseType: req.body.licenseType,
            });
            return res.send(200);
        } catch (err) {
            console.log(err);
            return res.send(500);
        }
    });

    router.route('/:licenseID/link').post(async (req, res) => {
        try {
            console.log(req.params);
            console.log('HERE', {
                _videoID: req.body.videoID,
                _licenseID: req.params.licenseID,
            });
            await axios.post('/LinkToLicense', {
                _videoID: req.body.videoID,
                _licenseID: Number(req.params.licenseID),
            });
            return res.send(200);
        } catch (err) {
            console.log(err);
            return res.send(500);
        }
    });

    return router;
};
