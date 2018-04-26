pragma solidity ^0.4.19;

import "./ILicensor.sol";
import "./Ownable.sol";

contract Licensor is ILicensor, Ownable {

    string omiEndpoint;
    string licensorName;


    struct Recording {
        uint recordingID;
        string isrc;
        uint licensorID;
        string internalID;

        uint[] licenses;
        uint licensesCount;
    }
        
    struct License {
        uint licenseID;
        uint userId; //string?
        uint recordingID;
        uint8 status;
        uint8 licenseType;
    }

    enum LicenseStatus { PURCHASED, LINKED, REVOKED, EXPIRED }
    enum LicenseType { NONCOMMERCIAL, COMMERCIAL }

    mapping (string => uint) isrcToRecordings;
    mapping (uint => Recording) Recordings;
    //userID to Licenses
    License[] Licenses;
    Licensor[] Licensors;

    function Licensor(string _omiEndpointURL, string _licensorName) public {
            omiEndpoint = _omiEndpointURL;
            licensorName = _licensorName;
    }

    function RegisterRecording(uint _internalID, string _isrc, uint _licensorID) public returns (uint recordingID) {
        uint recordingID = Recordings.length;
        Recording.push(
            {
                recordingID: recordingID,
                isrc: _isrc,
                licensorID: _licensorID,
                internalID: _internalID
            }
        );

        // TODO: emit event

        isrcToRecordings[_isrc] = recordingID;
    }

    function GetRecording(uint _recordingID) public returns (uint, string, uint, uint8){
        Recording memory rec = Recordings[_recordingID];
        return (
            rec.recordingID,
            rec.isrc,
            rec.licensorID,
            rec.internalID
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

    function IssueLicense(uint _userId, uint _recordingID, uint8 _licenseType) public returns (uint licenseID){
       uint licenseID = s.length;
       licenses.push (
           {
            licenseID: licenseID,
            userId: _userId,
            recordingID: _recordingID,
            status: LicenseStatus.PURCHASED
           }
        );
        // TODO: emit event

        Recordings[_recordingID].s.push(licenseID);
        Recording.licensesCount++;
    }

}