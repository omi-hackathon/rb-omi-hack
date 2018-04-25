const fs = require('fs');

const schemas = {};
const filenames = fs.readdirSync('server/schemas'); // eslint-disable-line no-sync
for (const filename of filenames) {
    if (filename === 'index.js') {
        continue;
    }
    schemas[filename.replace('.js', '')] = require(`./${filename.replace('.js', '')}`);
}

module.exports = schemas;
