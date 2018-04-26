const Licensor = artifacts.require('Licensor');
const Utils = artifacts.require('Utils');

module.exports = function(deployer) {
    deployer.deploy(Utils, { gas: 6000000, from: '0x00dA34fE68c192E4d3FD02c38aB9773E5C75A475' });
    deployer.link(Utils, Licensor);
    deployer.deploy(Licensor, 'https://omi01.docs.apiary.io/', 'RedBull', {
        gas: 6000000,
        from: '0x00dA34fE68c192E4d3FD02c38aB9773E5C75A475',
    });
};
