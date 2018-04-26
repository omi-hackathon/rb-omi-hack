require('dotenv').load();

const logger = require('winston');
const initContracts = require('./initialisers/contracts');
const initServer = require('./initialisers/server');

logger.info('[APP] Starting server initialization...');

// Start the server
module.exports = new Promise(async (resolve, reject) => {
    try {
        const contracts = await initContracts();
        const app = await initServer(contracts);
        logger.info('[APP] initialized SUCCESSFULLY');
        resolve(app, contracts);
    } catch (err) {
        logger.error('[APP] initialization failed', err);
        reject(err);
    }
});
