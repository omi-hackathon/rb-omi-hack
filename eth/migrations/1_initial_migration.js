const Migrations = artifacts.require('Migrations');

module.exports = function(deployer) {
    // Deploy the Migrations contract as our only task
    deployer.deploy(Migrations, { gas: 6000000, from: process.env.OWNER_ADDRESS });
};
