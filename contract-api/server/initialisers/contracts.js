const fs = require('fs');
const config = require('../config');
const Contract = require('../utils/contract');

module.exports = async function() {
    const contracts = {};
    const filenames = fs.readdirSync('build/contracts'); // eslint-disable-line no-sync
    for (const filename of filenames) {
        const contract = config.contracts[filename.replace('.json', '')];
        if (!contract.owner || !contract.address) {
            throw new Error(
                `Missing owner/address for contract '${filename.replace('.json', '')}' on network ${process.env.ETHEREUM_NETWORK}`,
            );
        }
        contracts[filename.replace('.json', '')] = new Contract(filename, contract.address, contract.owner);
    }
    return contracts;
};
