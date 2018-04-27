const fs = require('fs');
const path = require('path');
const config = require('../config');
const Contract = require('../utils/contract');

module.exports = async function() {
    const contracts = {};
    const filenames = fs.readdirSync(path.resolve(__dirname) + '/build/contracts'); // eslint-disable-line no-sync
    for (const filename of filenames) {
        if (!config.contracts[filename.replace('.json', '')]) {
            console.log('No contract configuration specified for: ', filename.replace('.json', ''));
            continue;
        }
        const contract = config.contracts[filename.replace('.json', '')];
        if (!contract.owner || !contract.address) {
            throw new Error(
                `Missing owner/address for contract '${filename.replace('.json', '')}' on network ${
                    process.env.ETHEREUM_NETWORK
                }`,
            );
        }
        contracts[filename.replace('.json', '')] = new Contract(filename, contract.address, contract.owner);
    }
    return contracts;
};
