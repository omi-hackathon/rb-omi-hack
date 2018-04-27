const web3 = require('web3');
const web3MainNet = new web3(new web3.providers.HttpProvider('http://localhost:8545'));
web3MainNet.eth.personal.newAccount(process.env.OWNER_PASSWORD, data => console.log(data));