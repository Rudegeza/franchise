const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('FranchiseContract', () => {
  let manufacturer;
  let franchisee;
  let contractInstance;

  beforeEach(async () => {
    [manufacturer, franchisee] = await ethers.getSigners();

    const FranchiseContract = await ethers.getContractFactory(
      'FranchiseContract'
    );
    contractInstance = await FranchiseContract.deploy(
      manufacturer.address,
      franchisee.address
    );
    await contractInstance.deployed();
  });

  it('should set contract terms correctly', async () => {
    const termsOfAgreement = 'Sample terms';
    const initialFee = 100;
    const territory = 'Sample territory';
    const trainingAndSupport = 'Sample training and support';
    const royalties = 10;
    const operationalRequirements = 'Sample operational requirements';
    const intellectualProperty = 'Sample intellectual property';
    const confidentiality = 'Sample confidentiality';
    const terminationAndDefault = 'Sample termination and default';

    await contractInstance.setContractTerms(
      termsOfAgreement,
      initialFee,
      territory,
      trainingAndSupport,
      royalties,
      operationalRequirements,
      intellectualProperty,
      confidentiality,
      terminationAndDefault
    );

    const contractTerms = await contractInstance.getContractTerms();
    expect(contractTerms[0]).to.equal(termsOfAgreement);
    expect(contractTerms[1]).to.equal(initialFee);
    expect(contractTerms[2]).to.equal(territory);
    expect(contractTerms[3]).to.equal(trainingAndSupport);
    expect(contractTerms[4]).to.equal(royalties);
    expect(contractTerms[5]).to.equal(operationalRequirements);
    expect(contractTerms[6]).to.equal(intellectualProperty);
    expect(contractTerms[7]).to.equal(confidentiality);
    expect(contractTerms[8]).to.equal(terminationAndDefault);
  });

  it('should allow the manufacturer and franchisee to post products', async () => {
    const productName = 'Sample Product';
    const productImage = 'sample-image-url';

    await contractInstance.postProduct(productName, productImage);
    await contractInstance
      .connect(franchisee)
      .postProduct(productName, productImage);

    const productsByManufacturer =
      await contractInstance.getProductsByManufacturer(manufacturer.address);
    const productsByFranchisee = await contractInstance.getProductsByFranchisee(
      franchisee.address
    );

    expect(productsByManufacturer.length).to.equal(1);
    expect(productsByManufacturer[0].name).to.equal(productName);
    expect(productsByManufacturer[0].imageUrl).to.equal(productImage);

    expect(productsByFranchisee.length).to.equal(1);
    expect(productsByFranchisee[0].name).to.equal(productName);
    expect(productsByFranchisee[0].imageUrl).to.equal(productImage);
  });
});
