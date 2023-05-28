const SimpleStorage = artifacts.require("CredentialVerificationV3");

module.exports = function (deployer) {
  deployer.deploy(SimpleStorage);
};
