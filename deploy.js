const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Contract deployed with the account:", deployer.address);
  //the address that deployed the contract

  console.log("Account Balance:", (await deployer.getBalance()).toString());

  const Token = await ethers.getContractFactory("WavePortal");
  const token = await Token.deploy();

  console.log("WavePortal address:", token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
