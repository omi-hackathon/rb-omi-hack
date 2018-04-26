const express = require('express');
const Response = require('../utils/response');

module.exports = function(options, contracts) {
    const router = express.Router(options);

    // writes
    router.route('/:functionName').post(async (req, res) => {
        if (Object.keys(contracts).indexOf(req.params.contractName) === -1) {
            return Response.BadRequest(`Unknown contract: ${req.params.contractName}`).send(res);
        }
        
        try {
            await contracts[req.params.contractName].validateCall(req.params.functionName, req.body);
        } catch (err) {
            return Response.BadRequest(err).send(res);
        }
        const result = await contracts[req.params.contractName].write(req.params.functionName, req.body);
        return Response.OK(result).send(res);
    });

    // reads
    router.route('/:functionName').get(async (req, res) => {
        if (Object.keys(contracts).indexOf(req.params.contractName) === -1) {
            return Response.BadRequest(`Unknown contract: ${req.params.contractName}`).send(res);
        }

        try {
            await contracts[req.params.contractName].validateCall(req.params.functionName, req.query);
        } catch (err) {
            return Response.BadRequest(err).send(res);
        }
        const result = await contracts[req.params.contractName].read(req.params.functionName, req.query);
        return Response.OK(result).send(res);
    });

    return router;
};
