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
            Migrations: {
                owner: '',
                address: '',
            },
        },
        cors_origin: '*',
    },
    development: {
        api: {
            version: 'v1',
        },
        cors_origin: '*',
    },
    production: {},
};

logger.info(`Configuration loaded for environment: ${process.env.NODE_ENV || 'development'}`);

// Extend global configuration with environmental one
module.exports = Object.assign(configs.globals, configs[process.env.NODE_ENV || 'development']);
