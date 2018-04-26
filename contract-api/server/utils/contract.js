const Joi = require('joi');
const constants = require('../utils/constants');
const logger = require('winston');
const web3 = require('web3');
const schemas = require('../schemas/index');

class Contract {
    // @param filename      the contract filename in the /contracts folder
    // @param address       the address of the deployed contract
    // @param owner         { address, password } credentials for the contract owner account
    constructor(filename, address, owner) {
        this.source = require(`../../../eth/build/contracts/${filename}`);
        this.address = address;
        this.owner = owner;

        // ensure schema descripton of function inputs and outputs matches up with contract ABI
        for (const fn of this.source.abi) {
            if (fn.type !== 'function') {
                continue;
            }

            // ensure function exists in schema
            if (!schemas[this.source.contractName].hasOwnProperty(fn.name)) {
                throw new Error(`Missing schema for function '${fn.name}' on contract '${this.source.contractName}'`);
            }

            // ensure input arguments exist on schema
            if (
                !schemas[this.source.contractName][fn.name].hasOwnProperty('inputs') ||
                !schemas[this.source.contractName][fn.name].inputs
            ) {
                throw new Error(
                    `Missing input arguments schema for function '${fn.name}' on contract '${
                        this.source.contractName
                    }'`,
                );
            }

            // ensure output arguments exist on schema
            if (
                !schemas[this.source.contractName][fn.name].hasOwnProperty('outputs') ||
                !schemas[this.source.contractName][fn.name].outputs
            ) {
                throw new Error(
                    `Missing output arguments schema for function '${fn.name}' on contract '${
                        this.source.contractName
                    }'`,
                );
            }

            // ensure function input count matches up
            if (Object.keys(schemas[this.source.contractName][fn.name].inputs).length !== fn.inputs.length) {
                throw new Error(
                    `Input argument count mismatch between schema and ABI for function '${fn.name}' on contract '${
                        this.source.contractName
                    }'`,
                );
            }

            // ensure function output count matches up
            if (
                Object.keys(schemas[this.source.contractName][fn.name]).outputs &&
                schemas[this.source.contractName][fn.name].outputs.length !== fn.inputs.length
            ) {
                throw new Error(
                    `Output argument count mismatch between schema and ABI for function '${fn.name}' on contract '${
                        this.source.contractName
                    }'`,
                );
            }

            // ensure function input names match up
            const schemaInputs = Object.keys(schemas[this.source.contractName][fn.name].inputs);
            for (const input of fn.inputs.map(input => input.name)) {
                if (schemaInputs.indexOf(input) === -1) {
                    throw new Error(
                        `Missing input argument ${input} on schema for function '${fn.name}' on contract '${
                            this.source.contractName
                        }'`,
                    );
                }
            }

            // ensure function output names match up
            const schemaOutputs = Object.keys(schemas[this.source.contractName][fn.name].outputs);
            for (const output of fn.outputs.map((output, i) => output.name || i.toString())) {
                if (schemaOutputs.indexOf(output) === -1) {
                    throw new Error(
                        `Missing output argument ${output || '(unnamed)'} on schema for function '${
                            fn.name
                        }' on contract '${this.source.contractName}'`,
                    );
                }
            }
        }
    }

    async validateCall(functionName, args) {
        let fn = this.source.abi.filter(item => item.type === 'function' && item.name === functionName);

        // function must exist on this contract
        if (fn.length === 0) {
            throw new Error(`Function '${functionName}' does not exist on contract '${this.source.contractName}'`);
        }
        fn = fn[0];

        // must have same number of args as function expects
        if (fn.inputs.length !== Object.keys(args).length) {
            throw new Error(
                `Unexpected number of arguments supplied to function '${functionName}' on contract '${
                    this.source.contractName
                }'`,
            );
        }

        for (const input of fn.inputs) {
            // ensure all expected function arguments are supplied
            if (Object.keys(args).indexOf(input.name) === -1) {
                throw new Error(
                    `Argument ${input.name} not supplied to function '${functionName}' on contract '${
                        this.source.contractName
                    }'`,
                );
            }

            // argument must have valid value
            await Joi.validate(
                args[input.name],
                schemas[this.source.contractName][functionName].inputs[input.name].validate,
            );
        }
    }

    transformInputArgs(functionName, args) {
        if (!args) {
            args = [];
        }
        const transformed = [];
        for (const key in args) {
            transformed.push(schemas[this.source.contractName][functionName].inputs[key].transform(args[key]));
        }
        return transformed;
    }

    async read(functionName, args) {
        try {
            args = this.transformInputArgs(functionName, args);
            // read from the runtime net
            const web3MainNet = new web3(new web3.providers.HttpProvider(constants.networks[process.env.ETHEREUM_NETWORK].endpoint));
            const contract = new web3MainNet.eth.Contract(this.source.abi, this.address);
            console.log(`[READ] Calling ${functionName} on contract ${this.source.contractName}`);
            const result = await contract.methods[functionName](...args).call({
                from: this.owner.address,
            });
            console.log('Call succeeded. Result:', result);

            // transform result according to schema
            // single return value:
            if (Object.keys(schemas[this.source.contractName][functionName].outputs).length === 1) {
                return Object.values(schemas[this.source.contractName][functionName].outputs)[0].transform(result);
            }
            // multi return value:
            for (const arg in result) {
                result[arg] = schemas[this.source.contractName][functionName].outputs[arg].transform(result[arg]);
            }
            
            return result;
        } catch (err) {
            console.log('Error reading from contract!', err);
        }
    }

    async write(functionName, args) {
        args = this.transformInputArgs(functionName, args);

        // write to the main net
        const web3MainNet = new web3(
            new web3.providers.HttpProvider(constants.networks[process.env.ETHEREUM_NETWORK].endpoint),
        );
        const contract = new web3MainNet.eth.Contract(this.source.abi, this.address);
        
        console.log(`[WRITE] Calling ${functionName} on contract ${this.source.contractName}`);
        await web3MainNet.eth.personal.unlockAccount(this.owner.address, this.owner.password, null);
        console.log('Account unlocked...');
        const gasAmount = await contract.methods[functionName](...args).estimateGas({ from: this.owner.address });
        console.log('Estimated gas: ', gasAmount, '... actually sending:', {
            gas: Math.ceil(gasAmount * 2),
            gasPrice: 100000000000
        });

        const receipt = await contract.methods[functionName](...args).send({
            from: this.owner.address,
            gas: Math.ceil(gasAmount * 2) || 7000000,
            gasPrice: 1000000000000
        });

        console.log(`[WRITE] Transaction receipt:`, receipt);

        console.log(
            `Call succeeded, gas used in tx: ${receipt.gasUsed} (approx. $${Math.round(
                receipt.gasUsed * 20e-9 * 440 * 100,
            ) / 100})`,
        );

        return { receipt };
    }
}

module.exports = Contract;
