import React, { useState } from 'react';
import FranchiseContractForm from './FranchiseContractForm';
import ProductForm from './ProductForm';

const FranchiseContractApp = () => {
  // State to store contract terms
  const [contractTerms, setContractTerms] = useState(null);
  // State to store posted products
  const [products, setProducts] = useState([]);

  // Function to handle setting the contract terms
  const handleSetContractTerms = (
    termsOfAgreement,
    initialFee /* Add other form values */
  ) => {
    // Call the smart contract function here to set the contract terms
    // You can use a web3 library like ethers.js or web3.js to interact with the contract
    // Example: contract.setContractTerms(termsOfAgreement, initialFee, /* Other form values */);

    // Update the contract terms state
    setContractTerms({
      termsOfAgreement,
      initialFee,
      // Other form values
    });
  };

  // Function to handle posting a product
  const handlePostProduct = (name, imageUrl) => {
    // Call the smart contract function here to post the product
    // Example: contract.postProduct(name, imageUrl);

    // Update the products state
    setProducts((prevProducts) => [...prevProducts, { name, imageUrl }]);
  };

  return (
    <div>
      <h1>Franchise Contract</h1>
      {contractTerms ? (
        <div>
          <h2>Contract Terms</h2>
          <p>Terms of Agreement: {contractTerms.termsOfAgreement}</p>
          <p>Initial Fee: {contractTerms.initialFee}</p>
          {/* Display other contract terms */}
        </div>
      ) : (
        <FranchiseContractForm setContractTerms={handleSetContractTerms} />
      )}

      <h2>Product Management</h2>
      <ProductForm postProduct={handlePostProduct} />

      {products.length > 0 && (
        <div>
          <h3>Posted Products</h3>
          {products.map((product, index) => (
            <div key={index}>
              <p>Product Name: {product.name}</p>
              <p>Image URL: {product.imageUrl}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FranchiseContractApp;
