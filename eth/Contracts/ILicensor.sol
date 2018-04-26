pragma solidity ^0.4.19;

contract ILicensor {
    // constructor

    // Licensor
    function RegisterRecording(string _isrc) public returns (uint);
    function RegisterRecordings(string[] _isrc) public returns (uint);

    // RegisterRecordings Array

    // public writes
    function IssueLicense(string userId, uint recordingID) public returns (uint);
    function LinkToLicense(string videoID, uint licenseID) public returns (bool);
    function RevokeLicense(uint licenseID) public returns (bool);

    // public reads
    function GetLicense(uint licenseID) constant public returns (uint, uint, uint, uint8);
    function GetRecording(uint recordingID) constant public returns (uint, string, uint, uint8);
    function GetRecordingByISRC(string isrc) constant public returns (uint, string, uint, uint8);
    // getLicensesByIsrc
    //by videoID
    //by userId
}