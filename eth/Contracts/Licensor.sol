pragma solidity ^0.4.19;
pragma experimental ABIEncoderV2;

import "./ILicensor.sol";
import "./Ownable.sol";
import "./Utils.sol";

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
        uint status;
        uint licenseType;
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
        require(_isrcs.length > 0);
        uint recordingID = recordings.length;
        for (uint i = 0; i < _isrcs.length; i++) {
            //require(isrcToRecordingID[_isrc] == 0);
            Recording memory r = Recording({
                recordingID: recordingID,
                isrc: _isrcs[i]
            });
            recordings.push(r);
            isrcToRecordingID[_isrcs[i]] = recordingID;
            recordingID++;
        }
    }
    
    function IssueLicense(string _userID, uint _recordingID, uint _licenseType) public onlyOwner returns (uint) {
        require(recordings.length +1 >= _recordingID);
        require(_licenseType == uint(LicenseType.NONCOMMERCIAL) || _licenseType == uint(LicenseType.COMMERCIAL));
        uint licenseID = licenses.length;
        License memory l = License({
            licenseID: licenseID,
            userID: _userID,
            recordingID: _recordingID,
            status: uint(LicenseStatus.PURCHASED),
            licenseType: _licenseType,
            videoID: ""
        });
        licenses.push(l);
        uint[] memory u = userIDToLicenseIDs[_userID];
        if(u.length == 0){
            userIDToLicenseIDs[_userID] = new uint[](1);
        }
        userIDToLicenseIDs[_userID].push(licenseID);

        return licenseID;
    }

    function LinkToLicense(string _videoID, uint _licenseID) public onlyOwner {
        require(licenses.length + 1 >= _licenseID);
        require(licenses[_licenseID].status == uint(LicenseStatus.PURCHASED));
        uint[] memory v = videoIDtoLicenseIDs[_videoID];
        if(v.length == 0){
            videoIDtoLicenseIDs[_videoID] = new uint[](1);
        }
        videoIDtoLicenseIDs[_videoID].push(_licenseID);
    }

    function RevokeLicense(uint _licenseID) public onlyOwner {
        licenses[_licenseID].status = uint(LicenseStatus.REVOKED);
    }
    //TODO: Require License status not REVOKED (also not EXPIRED?)

    // ------------- PUBLIC READS ----------------

    function GetLicense(uint _licenseID) view public returns (uint, string, uint, uint, uint, string) {
        require(licenses.length + 1 >= _licenseID);
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

    function GetRecording(uint _recordingID) view public returns (uint, string) {
        require(recordings.length + 1 >= _recordingID);
        Recording memory r = recordings[_recordingID];
        return (
            r.recordingID,
            r.isrc
        );
    }
    
    function GetRecordingByISRC(string _isrc) view public returns (uint, string) {
        require(isrcToRecordingID[_isrc] != 0);
        Recording memory r = recordings[isrcToRecordingID[_isrc]];
        return (
            r.recordingID,
            r.isrc
        );
    }

    function GetLicensesByVideoID(string _videoID) view public returns (string)  {
        uint[] memory ls = videoIDtoLicenseIDs[_videoID];
        require(ls.length > 0);
        string memory s = "";
        for (uint i = 0; i < ls.length; i++) {
            s = Utils.strcat(Utils.strcat(s, ","), Utils.uintToString(ls[0]));
        }
        return s;
    }

    function GetLicensesByUserID(string _userID) view public returns (string) {
        uint[] memory ls = userIDToLicenseIDs[_userID];
        require(ls.length > 0);
        string memory s = "";
        for (uint i = 0; i < ls.length; i++) {
            s = Utils.strcat(Utils.strcat(s, ","), Utils.uintToString(ls[0]));
        }
        return s;
    }
}
