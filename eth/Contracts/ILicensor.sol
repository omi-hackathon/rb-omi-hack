pragma solidity ^0.4.19;

contract ILicensor {
    // ------------- PUBLIC WRITES ----------------
    function RegisterRecording(string _isrc) public returns (uint);
    function RegisterRecordings(string[] _isrc) public returns (uint);
    function IssueLicense(string _userId, uint _recordingID) public returns (uint);
    function LinkToLicense(string _videoID, uint _licenseID) public returns (bool);
    function RevokeLicense(uint _licenseID) public returns (bool);

    // ------------- PUBLIC READS ----------------
    function GetLicense(uint _licenseID) constant public returns (uint, uint, uint, uint8);
    function GetRecording(uint _recordingID) constant public returns (uint recordingID, string isrc);
    function GetRecordingByISRC(string _isrc) constant public returns (uint recordingID, string isrc);
    function GetLicenseByVideoId(string _videoID) constant public returns (uint licenseID, string userId, uint recordingID,
     uint8 status, uint8 licenseType, string videoID);
    function GetLicenseByUserId(string _userId) constant public returns (uint licenseID, string userId, uint recordingID,
     uint8 status, uint8 licenseType, string videoID);
}
