const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
    'guard clap subject rubber world clog napkin creek spend wild sort force',
    'https://ropsten.infura.io/zRdfIa0m7HjGecU5VBSi'
    // 'https://rinkeby.infura.io/zRdfIa0m7HjGecU5VBSi'
);

const web3 = new Web3(provider);

const deploy = async() => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account ', accounts[0])
    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: '0x' + bytecode, arguments: ['HELLO'] })
        .send({ gas: '4000000', from: accounts[0] })
    console.log('Contract deployed', result.options.address);
};

deploy();