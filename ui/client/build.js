// eslint-disable no-console

const webpack = require('webpack');
const webpackConfig = require('./webpack.config.prod.js');
const colors = require('colors');

console.log('Generating minified bundle for production via Webpack. This will take a moment...'.blue);

webpack(webpackConfig).run((err, stats) => {
    if (err) {
        console.log(err.bold.red);
        return 1;
    }

    const jsonStats = stats.toJson();

    if (jsonStats.hasErrors) {
        return jsonStats.errors.map(error => console.log(error.red));
    }

    if (jsonStats.hasWarnings) {
        console.log('Webpack generated the following warnings: '.bold.yellow);
        jsonStats.warnings.map(warning => console.log(warning.yellow));
    }

    console.log(`Webpack stats: ${stats}`);
    console.log('Your app has been compiled in production mode and writen to /dist. It\'s ready to roll!'.green);
    return 0;
});