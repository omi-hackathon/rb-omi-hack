module.exports = {
    set: {
        inputs: {
            x: {
                validate: value => !isNaN(value),
                transform: value => value,
            },
        },
        outputs: {},
    },
    get: {
        inputs: {},
        outputs: {
            retVal: {
                transform: value => value,
            },
        },
    },
};
