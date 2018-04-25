require('dotenv').load();

require('colors');
const argv = require('yargs').argv
const web3 = require('web3');
const constants = require('../server/utils/constants');

if (!argv.contract) {
    console.log('Please specify the contract name!'.red);
    process.exit(1);
}

const web3MainNet = new web3(new web3.providers.HttpProvider("http://localhost:8545"));

(async function() {
    try {
        console.log('Deploying contract with OWNER:', process.env.OWNER_ADDRESS);

        await web3MainNet.eth.personal.unlockAccount(
            process.env.OWNER_ADDRESS,
            process.env.OWNER_PASSWORD,
            null,
        );

        const contract = require(`../blockchain/build/contracts/${argv.contract}.json`);
        console.log(contract)
        const receipt = await new Promise((resolve, reject) => {
            new web3MainNet.eth.Contract(contract.abi).deploy({
                data: contract.bytecode,
                arguments: [process.env.OWNER_ADDRESS]
            }).send({
                from: process.env.OWNER_ADDRESS,
                gas: 2000000
            })
            .on('error', err => reject(err))
            .on('transactionHash', txHash => console.log(`tx hash: ${txHash}`.blue))
            .on('confirmation', confirmationNumber => console.log(`confirms: ${confirmationNumber}`.green))
            .on('receipt', receipt => resolve(receipt));
        });

        console.log('Done. Receipt:'.green, receipt);
        console.warn('NOTE: ensure a sufficient number of confirms have been met before using this contract!'.yellow);
    } catch (err) {
        console.error('Error deploying contract!'.red, err);
        process.exit(1);
    }
})()