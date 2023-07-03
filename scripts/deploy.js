const hre = require('hardhat');

async function main() {
  const FranchiseContract = await hre.ethers.getContractFactory(
    'FranchiseContract'
  );
  const [manufacturer, franchisee] = await hre.ethers.getSigners();

  const contractInstance = await FranchiseContract.deploy(
    manufacturer.address,
    franchisee.address
  );
  await contractInstance.deployed();

  console.log('FranchiseContract deployed to:', contractInstance.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
