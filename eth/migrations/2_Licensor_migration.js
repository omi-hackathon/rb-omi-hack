const Licensor = artifacts.require('Licensor');
const Utils = artifacts.require('Utils');

module.exports = function(deployer) {
    deployer.deploy(Utils, { gas: 6000000, from: process.env.OWNER_ADDRESS });
    deployer.link(Utils, Licensor);
    deployer.deploy(Licensor, 'https://omi01.docs.apiary.io/', 'RedBull', {
        gas: 6000000,
        from: process.env.OWNER_ADDRESS,
    });
};
