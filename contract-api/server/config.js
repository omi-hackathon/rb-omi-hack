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
                    address: '0x00dA34fE68c192E4d3FD02c38aB9773E5C75A475',
                    password: process.env.OWNER_PASSWORD,
                },
                address: '0xbc4aad160116da5cfdfc46abc804ca6661c0c16e',
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
