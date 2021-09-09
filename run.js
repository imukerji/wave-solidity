async function main() {
  const [owner, randoPerson] = await ethers.getSigners();
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy();
  await waveContract.deployed();
  console.log("Contract deployed to:", waveContract.address);
  console.log(owner.address, "says hi");

  let waveCount;
  waveCount = await waveContract.getTotalWaves();
  //calls our function - at this point it will be 0 since the state variable didn't change yet

  let waveTxn = await waveContract.wave();
  await waveTxn.wait();
  //chages the state variable - this will run the function and change it from 0 to 1

  waveCount = await waveContract.getTotalWaves();
  //we call the function here again and now it will tell us that its at 1

  waveTxn = await waveContract.connect(randoPerson).wave();
  await waveTxn.wait();

  waveCount = await waveContract.getTotalWaves();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

//contract address: 0x5C4e8B04479203CdD25F68a82204A07929f19786
