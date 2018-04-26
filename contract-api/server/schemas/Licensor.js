const Joi = require('joi');

module.exports = {
    owner: {
        inputs: {},
        outputs: {
            0: {
                transform: value => value,
                validate: Joi.any(),
            },
        },
    },
    transferOwnership: {
        inputs: {
            newOwner: {
                transform: value => value,
                validate: Joi.any(),
            },
        },
        outputs: {},
    },
    RegisterRecordings: {
        inputs: {
            _isrcs: {
                transform: value => value,
                validate: Joi.any(),
            },
        },
        outputs: {
            0: {
                transform: value => value,
                validate: Joi.any(),
            },
        },
    },
    IssueLicense: {
        inputs: {
            _userID: {
                transform: value => value,
                validate: Joi.any(),
            },
            _recordingID: {
                transform: value => value,
                validate: Joi.any(),
            },
            _licenseType: {
                transform: value => value,
                validate: Joi.any(),
            },
        },
        outputs: {
            0: {
                transform: value => value,
                validate: Joi.any(),
            },
        },
    },
    LinkToLicense: {
        inputs: {
            _videoID: {
                transform: value => value,
                validate: Joi.any(),
            },
            _licenseID: {
                transform: value => value,
                validate: Joi.any(),
            },
        },
        outputs: {},
    },
    RevokeLicense: {
        inputs: {
            _licenseID: {
                transform: value => value,
                validate: Joi.any(),
            },
        },
        outputs: {},
    },
    GetLicense: {
        inputs: {
            _licenseID: {
                transform: value => value,
                validate: Joi.any(),
            },
        },
        outputs: {
            0: {
                transform: value => value,
                validate: Joi.any(),
            },
            1: {
                transform: value => value,
                validate: Joi.any(),
            },
            2: {
                transform: value => value,
                validate: Joi.any(),
            },
            3: {
                transform: value => value,
                validate: Joi.any(),
            },
            4: {
                transform: value => value,
                validate: Joi.any(),
            },
            5: {
                transform: value => value,
                validate: Joi.any(),
            },
        },
    },
    GetRecording: {
        inputs: {
            _recordingID: {
                transform: value => value,
                validate: Joi.any(),
            },
        },
        outputs: {
            0: {
                transform: value => value,
                validate: Joi.any(),
            },
            1: {
                transform: value => value,
                validate: Joi.any(),
            },
        },
    },
    GetRecordingByISRC: {
        inputs: {
            _isrc: {
                transform: value => value,
                validate: Joi.any(),
            },
        },
        outputs: {
            0: {
                transform: value => value,
                validate: Joi.any(),
            },
            1: {
                transform: value => value,
                validate: Joi.any(),
            },
        },
    },
    GetLicensesByVideoID: {
        inputs: {
            _videoID: {
                transform: value => value,
                validate: Joi.any(),
            },
        },
        outputs: {
            0: {
                transform: value => value,
                validate: Joi.any(),
            },
        },
    },
    GetLicensesByUserID: {
        inputs: {
            _userID: {
                transform: value => value,
                validate: Joi.any(),
            },
        },
        outputs: {
            0: {
                transform: value => value,
                validate: Joi.any(),
            },
        },
    }
};
