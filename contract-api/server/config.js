const logger = require('winston');

const configs = {
    globals: {
        etag: false,
    },
    local: {
        api: {
            version: 'v1',
        },
        contracts: {
            Licensor: {
                owner: {
                    address: process.env.OWNER_ADDRESS,
                    password: process.env.OWNER_PASSWORD,
                },
                address: process.env.CONTRACT_ADDRESS,
            },
        },
        cors_origin: '*',
    },
    development: {
        api: {
            version: 'v1',
        },
        contracts: {
            Licensor: {
                owner: {
                    address: process.env.OWNER_ADDRESS,
                    password: process.env.OWNER_PASSWORD,
                },
                address: process.env.CONTRACT_ADDRESS,
            },
        },
        cors_origin: '*',
    },
    production: {},
};

logger.info(`Configuration loaded for environment: ${process.env.NODE_ENV || 'development'}`);

// Extend global configuration with environmental one
module.exports = Object.assign(configs.globals, configs[process.env.NODE_ENV || 'development']);
