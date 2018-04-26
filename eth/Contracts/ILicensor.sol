pragma solidity ^0.4.19;
pragma experimental ABIEncoderV2;

contract ILicensor {
    function RegisterRecordings(string[] _isrcs) public returns (uint);
    function IssueLicense(string _userID, uint _recordingID, uint8 _licenseType) public returns (uint);
    function LinkToLicense(string _videoID, uint _licenseID) public;
    function RevokeLicense(uint _licenseID) public;
    function GetLicense(uint _licenseID) view public returns (uint, string, uint, uint8, uint8, string);
    function GetRecording(uint _recordingID) view public returns (uint, string);
    function GetRecordingByISRC(string _isrc) view public returns (uint, string);
    function GetLicensesByVideoID(string _videoID) view public returns (string);
    function GetLicensesByUserID(string _userID) view public returns (string);
}
