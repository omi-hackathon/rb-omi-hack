pragma solidity ^0.4.21;

contract IMarketplace {
    // constructor

    // structs
    struct Licensor {
        uint licensorID;
        string omiEndpoint;
        string name;
    }

    struct Recording {
        uint recordingID;
        bytes12 isrc;
        uint licensorID;
        string internalID;

        uint[] licenses;
    }
        
    struct License {
        uint licenseID;
        uint userId;
        uint recordingID;
        uint8 status;
    }

    enum LicenseStatus { PURCHASED, LINKED, REVOKED }

    mapping (string => uint) isrcToRecordings;
    mapping (uint => Recording) Recordings;
    mapping (uint => License) Licenses;

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