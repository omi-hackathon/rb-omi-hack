require('dotenv').load();

const logger = require('winston');
const initServer = require('./initialisers/server');

logger.info('[APP] Starting server initialization...');

// Start the server
module.exports = new Promise(async (resolve, reject) => {
    try {
        const app = await initServer();
        logger.info('[APP] initialized SUCCESSFULLY');
        resolve(app);
    } catch(err) {
        logger.error('[APP] initialization failed', err);
        reject(err);
    }
});
