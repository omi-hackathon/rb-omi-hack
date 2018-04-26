var Migrations = artifacts.require('Migrations');

module.exports = function(deployer) {
    // Deploy the Migrations contract as our only task
    deployer.deploy(Migrations, { gas: 4700000, from: '0x00dA34fE68c192E4d3FD02c38aB9773E5C75A475' });
};
