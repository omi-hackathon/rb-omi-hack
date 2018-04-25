const logger = require('winston');

const configs = {
    globals: {},
    local: {
        api: {
            port: 3000,
            version: 'v1',
            url: 'http://localhost:3000/v1'
        },
        ui: {
            port: 4000,
            url: 'http://localhost:4000'
        },
        cors_origin: '*',
    },
    development: {},
    production: {},
};

logger.info(`Configuration loaded for environment: ${process.env.NODE_ENV || 'development'}`);

// Extend global configuration with environmental one
module.exports = Object.assign(configs.globals, configs[process.env.NODE_ENV || 'development']);
