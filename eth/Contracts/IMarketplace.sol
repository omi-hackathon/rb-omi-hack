pragma solidity ^0.4.19;

contract IMarketplace {
    // constructor

    // Licensor
    function RegisterLicensor(string _omiEndpointURL, string _name) public;
    function RegisterRecording(uint _internalID, bytes12 _isrc, uint _licensorID) public returns (uint);

    // public writes
    function IssueLicense(uint userId, uint recordingID) public returns (uint);
    function LinkToLicense(uint licenseID) public returns (bool);
    function RevokeLicense(uint licenseID) public returns (bool);

    // public reads
    function GetLicense(uint licenseID) public returns (uint, uint, uint, uint8);
    function GetRecording(uint recordingID) public returns (uint, bytes12, uint, uint8);
    function GetRecordingByISRC(string isrc) public returns (uint, bytes12, uint, uint8);
}