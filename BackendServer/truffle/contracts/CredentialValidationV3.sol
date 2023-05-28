// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CredentialVerificationV3 {
    struct Credential {
        uint256 id;
        string credentialType;
        string degreeName;
        string university;
        string graduationDate;
        string licenseNumber;
        bool isValid;
        address issuer;
        string permanentAddress;
        string doctorName; // Added doctor's name field
        // Add other important details as needed
    }

    mapping(uint256 => Credential) public credentials;
    mapping(address => bool) public registeredAddresses;
    mapping(address => mapping(uint256 => bool)) public credentialAccess;
    uint256 public credentialCounter;
    address public admin;

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    modifier onlyRegistered() {
        require(registeredAddresses[msg.sender], "Unauthorized address");
        _;
    }

    modifier onlyIssuer(uint256 credentialId) {
        require(
            credentials[credentialId].issuer == msg.sender,
            "Only issuer can perform this action"
        );
        _;
    }

    modifier onlyAuthorizedUser(uint256 credentialId) {
        require(
            credentials[credentialId].issuer == msg.sender ||
            credentialAccess[msg.sender][credentialId],
            "Unauthorized user"
        );
        _;
    }

    event CredentialRegistered(uint256 credentialId);
    event CredentialUpdated(uint256 credentialId);
    event CredentialAccessGranted(uint256 credentialId, address user);
    event CredentialAccessRevoked(uint256 credentialId, address user);

    constructor() {
        admin = msg.sender; // Set the admin address during contract deployment
    }

    function registerAddress(address user) public onlyAdmin {
        registeredAddresses[user] = true; // Allow the admin to register an address
    }

    function unregisterAddress(address user) public onlyAdmin {
        registeredAddresses[user] = false; // Allow the admin to unregister an address
    }

    function registerCredential(
        string memory credentialType,
        string memory degreeName,
        string memory university,
        string memory graduationDate,
        string memory licenseNumber,
        string memory permanentAddress,
        string memory doctorName // Added doctor's name parameter
    ) public onlyRegistered returns (uint256) {
        credentialCounter++;
        Credential memory newCredential = Credential(
            credentialCounter,
            credentialType,
            degreeName,
            university,
            graduationDate,
            licenseNumber,
            true,
            msg.sender,
            permanentAddress,
            doctorName // Set the doctor's name
        );
        credentials[credentialCounter] = newCredential;
        emit CredentialRegistered(credentialCounter);
        return credentialCounter;
    }

    function updateCredentialValidity(uint256 credentialId, bool isValid)
        public
        onlyRegistered
    {
        credentials[credentialId].isValid = isValid;
        emit CredentialUpdated(credentialId);
    }

    function grantCredentialAccess(uint256 credentialId, address user)
        public
        onlyIssuer(credentialId)
    {
        credentialAccess[user][credentialId] = true;
        emit CredentialAccessGranted(credentialId, user);
    }

    function revokeCredentialAccess(uint256 credentialId, address user)
        public
        onlyIssuer(credentialId)
    {
        delete credentialAccess[user][credentialId];
        emit CredentialAccessRevoked(credentialId, user);
    }

    function verifyLicense(string memory licenseNumber)
        public
        view
        returns (bool)
    {
        for (uint256 i = 1; i <= credentialCounter; i++) {
            if (
                keccak256(bytes(credentials[i].licenseNumber)) ==
                keccak256(bytes(licenseNumber))
            ) {
                return credentials[i].isValid;
            }
        }
        return false;
    }

    // Function to fetch all the certificates issued by an institution
    function getAllCertificates(address institution)
        public
        view
        returns (uint256[] memory)
    {
        uint256[] memory certificateIds = new uint256[](credentialCounter);
        uint256 count = 0;
        for (uint256 i = 1; i <= credentialCounter; i++) {
            if (credentials[i].issuer == institution) {
                certificateIds[count] = i;
                count++;
            }
        }
        uint256[] memory result = new uint256[](count);
        for (uint256 i = 0; i < count; i++) {
            result[i] = certificateIds[i];
        }
        return result;
    }
}
