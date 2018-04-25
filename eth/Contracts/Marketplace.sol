pragma solidity ^0.4.19;

import "./IMarketplace.sol";
import "./Ownable.sol";

contract Marketplace is IMarketplace, Ownable {
    
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
        uint licensesCount;
    }
        
    struct License {
        uint licenseID;
        uint userId;
        uint recordingID;
        uint8 status;
    }

    enum LicenseStatus { PURCHASED, LINKED, REVOKED, EXPIRED }

    mapping (string => uint) isrcToRecordings;
    mapping (uint => Recording) Recordings;
    License[] Licences;
    Licensor[] Licencors;

    function RegisterLicensor(string _omiEndpointURL, string _name) public {
        Licencors.push(
            {
                licensorID: Licenses.length,
                omiEndpoint: _omiEndpointURL,
                name: _name
            }
        );
        // TODO: emit event
    }

    function RegisterRecording(uint _internalID, bytes12 _isrc, uint _licensorID) public returns (uint recordingID) {
        Recording.push(
            {

            }
        );

        recordingID = Recordings.length;
        
        // TODO: emit event

        isrcToRecordings[_isrc] = recordingID;
    }

    function GetRecording(uint _recordingID) public returns (uint, bytes12, uint, uint8){
        Recording memory rec = Recordings[_recordingID];
        return (
            rec.recordingID,
            rec.isrc,
            rec.licensorID,
            rec.internalID
        );
    }
     
   function GetRecordingByISRC(string _isrc) public returns (uint, bytes12, uint, uint8){
       return (
            isrcToRecordings[_isrc].recordingID,
            isrcToRecordings[_isrc].isrc,
            isrcToRecordings[_isrc].licensorID,
            isrcToRecordings[_isrc].internalID
        );
   }

    function IssueLicense(uint _userId, uint _recordingID) public returns (uint){
       uint licenseID = Licences.length;
       licenses.push (
           {
            licenseID: licenseID,
            userId: _userId,
            recordingID: _recordingID,
            status: LicenseStatus.PURCHASED
           }
        );
        // TODO: emit event

        Recordings[_recordingID].Licences.push(licenseID);
        Recording.licensesCount++;
    }



    
    
    





}