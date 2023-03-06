const { ethers } = require("hardhat");
const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const [deployer] = await ethers.getSigners();
  const balance = await deployer.getBalance();
  const store_IPFS = await hre.ethers.getContractFactory("Store_IPFS");
  const Store_IPFS = await store_IPFS.deploy();

  await marketplace.deployed();
  console.log("Contract deployed to address:", Store_IPFS.address);


  const data = {
    address: Store_IPFS.address,
    abi: JSON.parse(Store_IPFS.interface.format('json'))
  }

  //This writes the ABI and address to the mktplace.json
  fs.writeFileSync('./src/Store_IPFS.json', JSON.stringify(data))
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
