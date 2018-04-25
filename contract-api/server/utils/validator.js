const Joi = require('joi');

module.exports = {
    validate: (data, schema) =>
        Joi.validate(data, schema).catch(err => {
            if (err.isJoi) {
                const messages = err.details.map(detail => detail.message);
                throw new Object({ isValidation: true, messages });
            }
            throw err;
        }),
    schemas: {},
};
