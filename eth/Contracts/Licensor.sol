pragma solidity ^0.4.19;

import "./ILicensor.sol";
import "./Ownable.sol";

contract Licensor is ILicensor, Ownable {

    string omiEndpoint;
    string licensorName;

    struct Recording {
        uint recordingID;
        string isrc;
    }
        
    struct License {
        uint licenseID;
        string userID;
        uint recordingID;
        uint8 status;
        uint8 licenseType;
        string videoID;
    }

    enum LicenseStatus { PURCHASED, LINKED, REVOKED, EXPIRED }
    enum LicenseType { NONCOMMERCIAL, COMMERCIAL }

    mapping (string => uint) isrcToRecordings; //isrc to recordingID
    // recordingIDs to Recordings
    Recording[] Recordings;
    // licenseIDs to Licenses
    License[] Licenses;
    // userID to Licenses
    mapping (string => License) userIDToLicenses;
    // videoID to Licenses
    mapping (string => License) videoIDtoLicenses;

    function Licensor(string _omiEndpointURL, string _licensorName) public {
            omiEndpoint = _omiEndpointURL;
            licensorName = _licensorName;
    }

    // ------------- PUBLIC WRITES ----------------

    function RegisterRecording(string _isrc) public returns (uint recordingID) {
        uint recordingID = Recordings.length;
        Recording.push(
            {
                recordingID: recordingID,
                isrc: _isrc
            }
        );

        // TODO: emit event

        isrcToRecordings[_isrc] = recordingID;
    }

    // TODO:
    // function RegisterRecordings(string[] _isrc) public onlyOwner returns (uint){}

    function IssueLicense(uint _userID, uint _recordingID, uint8 _licenseType) public onlyOwner returns (uint licenseID){
       uint licenseID = s.length;
       licenses.push (
           {
            licenseID: licenseID,
            userID: _userID,
            recordingID: _recordingID,
            status: LicenseStatus.PURCHASED
           }
        );
        // TODO: emit event

        Recordings[_recordingID].s.push(licenseID);
        Recording.licensesCount++;
    }

    // TODO:
    // function LinkToLicense(string _videoID, uint _licenseID) public onlyOwner returns (bool){}

    // TODO:
    // function RevokeLicense(uint _licenseID) public onlyOwner returns (bool){}

    // ------------- PUBLIC READS ----------------
    
    function GetLicense(uint _licenseID) constant public returns (string, uint, uint, uint8){
        Recording memory lic = Licenses[_licenseID];
        return (
            lic.userID,
            lic.recordingID,
            lic.status,
            lic.licenseType
        );
    }

    function GetRecording(uint _recordingID) public returns (uint, string){
        Recording memory rec = Recordings[_recordingID];
        return (
            rec.recordingID,
            rec.isrc
        );
    }
     
    function GetRecordingByISRC(string _isrc) public returns (uint, string, uint, uint8){
       return (
            isrcToRecordings[_isrc].recordingID,
            isrcToRecordings[_isrc].isrc,
            isrcToRecordings[_isrc].licensorID,
            isrcToRecordings[_isrc].internalID
        );
    }

    function GetLicenseByVideoID(string _videoID) constant public returns (uint, string, uint, uint8){
        License memory lic = videoIDToLicenses[_videoID];
        return (
            lic.licenseID,
            lic.userID,
            lic.recordingID,
            lic.status,
            lic.licenseType
        );
    }

    function GetLicenseByUserID(string _userID) constant public returns (uint, string, uint, uint8){
        License memory lic = userIDToLicenses[_userID];
        return ( 
            lic.licenseID,
            lic.userID,
            lic.recordingID,
            lic.status,
            lic.licenseType       
        );
    }
    
}
