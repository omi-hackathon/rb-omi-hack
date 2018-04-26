pragma solidity ^0.4.19;

contract ILicensor {
    // constructor

    // Licensor
    function RegisterRecording(string _isrc) public returns (uint);
    function RegisterRecordings(string[] _isrc) public returns (uint);

    // RegisterRecordings Array

    // public writes
    function IssueLicense(string _userId, uint _recordingID) public returns (uint);
    function LinkToLicense(string _videoID, uint _licenseID) public returns (bool);
    function RevokeLicense(uint _licenseID) public returns (bool);

    // public reads
    function GetLicense(uint _licenseID) constant public returns (string, uint, uint, uint8);
    function GetRecording(uint _recordingID) constant public returns (uint, string, uint, uint8);
    function GetRecordingByISRC(string _isrc) constant public returns (uint, string, uint, uint8);
    function GetRecordingByVideoId(string _videoID) constant public returns (uint, string, uint, uint8);
    function GetRecordingByUserId(string _userId) constant public returns (uint, string, uint, uint8);
}
