const ethers = require('ethers');
const fs = require('fs-extra');

async function main() {
    // compile the contract
    // http://127.0.0.1:7545     ==> local ganache rpc 

    const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:7545');     // connected to local blockchain

    const wallet = new ethers.Wallet('a4acd1651337299574a4f0c4863dd217b50475db0a3f3614eb4f4b98d659c476',
        provider); // private key of the account 

    // read the abi and bytecode from the compiled contract
    const abi = fs.readFileSync('./simpleStorage_sol_SimpleStorage.abi', 'utf-8');
    const binary = fs.readFileSync('./simpleStorage_sol_SimpleStorage.bin', 'utf-8');

    const contractFactory = new ethers.ContractFactory(abi, binary, wallet); // contract factory 
    console.log("Deploying please wait....");

    const contract = await contractFactory.deploy(); // deploy the contract
    console.log(contract)
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    })