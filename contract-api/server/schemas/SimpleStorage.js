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
            0: {
                transform: value => value,
            },
            1: {
                transform: value => value,
            },
        },
    },
};
