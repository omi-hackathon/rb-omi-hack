pragma solidity ^0.4.19;
pragma experimental ABIEncoderV2;

import "./ILicensor.sol";
import "./Ownable.sol";

contract Licensor is ILicensor, Ownable {

    string omiEndpoint;
    string licensorName;


    struct Recording {
        uint recordingID;
        string isrc;
    }
        
    enum LicenseStatus { PURCHASED, LINKED, REVOKED, EXPIRED }
    enum LicenseType { NONCOMMERCIAL, COMMERCIAL }

    struct License {
        uint licenseID;
        string userID;
        uint recordingID;
        uint8 status;
        uint8 licenseType;
        string videoID;
    }

    // isrc to recordingID
    mapping (string => uint) isrcToRecordingID;
    
    // array of Recordings indexed by their ID
    Recording[] recordings; 

    // array of Licenses indexed by their ID
    License[] licenses;

    // userID to LicensesIDs
    mapping (string => uint[]) userIDToLicenseIDs;

    // videoID to LicenseIDs
    mapping (string => uint[]) videoIDtoLicenseIDs;

    constructor(string _omiEndpointURL, string _licensorName) public {
        omiEndpoint = _omiEndpointURL;
        licensorName = _licensorName;
    }

    // ------------- PUBLIC WRITES ----------------

    function RegisterRecordings(string[] _isrcs) public onlyOwner returns (uint) {
        uint recordingID = recordings.length;
        for (uint i = 0; i < _isrcs.length; i++) {
            Recording memory r = Recording({
                recordingID: recordingID,
                isrc: _isrcs[i]
            });
            recordings.push(r);
            isrcToRecordingID[_isrcs[i]] = recordingID;
            recordingID++;
        }
    }
    
    function IssueLicense(string _userID, uint _recordingID, uint8 _licenseType) public onlyOwner returns (uint) {
        uint licenseID = licenses.length;
        License memory l = License({
            licenseID: licenseID,
            userID: _userID,
            recordingID: _recordingID,
            status: uint8(LicenseStatus.PURCHASED),
            licenseType: _licenseType,
            videoId: ""
        });
        licenses.push(l);
        userIDToLicenseIDs[_userID].push(licenseID);
        
        return licenseID;
    }

    function LinkToLicense(string _videoID, uint _licenseID) public onlyOwner {
        videoIDtoLicenseIDs[_videoID].push(_licenseID);
    }

    function RevokeLicense(uint _licenseID) public onlyOwner {
        licenses[_licenseID].status = uint8(LicenseStatus.REVOKED);
    }

    // ------------- PUBLIC READS ----------------

    function GetLicense(uint _licenseID) constant public returns (uint, string, uint, uint8, uint8, string) {
        License memory l = licenses[_licenseID];
        return (
            l.licenseID,
            l.userID,
            l.recordingID,
            l.status,
            l.licenseType,
            l.videoID
        );
    }

    function GetRecording(uint _recordingID) constant public returns (uint, string) {
        Recording memory r = recordings[_recordingID];
        return (
            r.recordingID,
            r.isrc
        );
    }
     
    function GetRecordingByISRC(string _isrc) constant public returns (uint, string) {
        Recording memory r = recordings[isrcToRecordingID[_isrc]];
        return (
            r.recordingID,
            r.isrc
        );
    }

    function GetLicenseByVideoID(string _videoID) constant public returns (uint, string, uint, uint8, uint8, string)  {
        License memory l = licenses[videoIDtoLicenseIDs[_videoID]];
        return (
            l.licenseID,
            l.userID,
            l.recordingID,
            l.status,
            l.licenseType,
            l.videoID
        );
    }

    function GetLicenseByUserID(string _userID) constant public returns (uint, string, uint, uint8, uint8, string)  {
        License memory l = licenses[userIDToLicenseIDs[_userID]];
        return (
            l.licenseID,
            l.userID,
            l.recordingID,
            l.status,
            l.licenseType,
            l.videoID    
        );
    }
}
