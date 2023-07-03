import React, { useState } from 'react';

const FranchiseContractForm = ({ setContractTerms }) => {
  const [termsOfAgreement, setTermsOfAgreement] = useState('');
  const [initialFee, setInitialFee] = useState('');
  // Add other form fields here

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the setContractTerms function from props and pass the form values
    setContractTerms(termsOfAgreement, initialFee /* Add other form values */);

    // Reset the form fields
    setTermsOfAgreement('');
    setInitialFee('');
    // Reset other form fields
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="terms">Terms of Agreement:</label>
        <input
          type="text"
          id="terms"
          value={termsOfAgreement}
          onChange={(e) => setTermsOfAgreement(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="fee">Initial Fee:</label>
        <input
          type="number"
          id="fee"
          value={initialFee}
          onChange={(e) => setInitialFee(e.target.value)}
        />
      </div>
      {/* Add other form fields */}
      <button type="submit">Set Contract Terms</button>
    </form>
  );
};

export default FranchiseContractForm;
