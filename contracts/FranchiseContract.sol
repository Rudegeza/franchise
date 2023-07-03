// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract FranchiseContract {
    address public manufacturer;
    address public franchisee;

    // Contract terms agreed upon by the manufacturer and franchisee
    string public termsOfAgreement;
    uint public initialFee;
    string public territory;
    string public trainingAndSupport;
    uint public royalties;
    string public operationalRequirements;
    string public intellectualProperty;
    string public confidentiality;
    string public terminationAndDefault;

    // Products posted by the manufacturer and franchisee
    struct Product {
        string name;
        string imageUrl;
    }

    mapping(address => Product[]) public productsByManufacturer;
    mapping(address => Product[]) public productsByFranchisee;

    constructor(address _manufacturer, address _franchisee) {
        manufacturer = _manufacturer;
        franchisee = _franchisee;
    }

    function setContractTerms(
        string memory _termsOfAgreement,
        uint _initialFee,
        string memory _territory,
        string memory _trainingAndSupport,
        uint _royalties,
        string memory _operationalRequirements,
        string memory _intellectualProperty,
        string memory _confidentiality,
        string memory _terminationAndDefault
    ) public {
        require(
            msg.sender == manufacturer,
            "Only manufacturer can set contract terms"
        );

        termsOfAgreement = _termsOfAgreement;
        initialFee = _initialFee;
        territory = _territory;
        trainingAndSupport = _trainingAndSupport;
        royalties = _royalties;
        operationalRequirements = _operationalRequirements;
        intellectualProperty = _intellectualProperty;
        confidentiality = _confidentiality;
        terminationAndDefault = _terminationAndDefault;
    }

    function getContractTerms()
        public
        view
        returns (
            string memory _termsOfAgreement,
            uint _initialFee,
            string memory _territory,
            string memory _trainingAndSupport,
            uint _royalties,
            string memory _operationalRequirements,
            string memory _intellectualProperty,
            string memory _confidentiality,
            string memory _terminationAndDefault
        )
    {
        _termsOfAgreement = termsOfAgreement;
        _initialFee = initialFee;
        _territory = territory;
        _trainingAndSupport = trainingAndSupport;
        _royalties = royalties;
        _operationalRequirements = operationalRequirements;
        _intellectualProperty = intellectualProperty;
        _confidentiality = confidentiality;
        _terminationAndDefault = terminationAndDefault;
    }

    function postProduct(string memory _name, string memory _imageUrl) public {
        require(
            msg.sender == manufacturer || msg.sender == franchisee,
            "Only manufacturer or franchisee can post products"
        );

        Product memory newProduct = Product(_name, _imageUrl);

        if (msg.sender == manufacturer) {
            productsByManufacturer[msg.sender].push(newProduct);
        } else {
            productsByFranchisee[msg.sender].push(newProduct);
        }
    }

    function getProductsByManufacturer(
        address _manufacturer
    ) public view returns (Product[] memory) {
        return productsByManufacturer[_manufacturer];
    }

    function getProductsByFranchisee(
        address _franchisee
    ) public view returns (Product[] memory) {
        return productsByFranchisee[_franchisee];
    }
}
