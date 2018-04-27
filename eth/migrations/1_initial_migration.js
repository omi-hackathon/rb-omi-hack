const Migrations = artifacts.require('Migrations');

module.exports = function(deployer) {
    // Deploy the Migrations contract as our only task
    console.log('OWNER_ADDRESS=', process.env.OWNER_ADDRESS);
    deployer.deploy(Migrations, { gas: 6000000, from: process.env.OWNER_ADDRESS });
};
