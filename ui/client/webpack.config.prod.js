const devConfig = require('./webpack.config.dev');

// Apply any overrides for the production webpack config
module.exports = Object.assign(devConfig, {
	output: Object.assign(devConfig.output, {
		chunkFilename: '[name].chunk.js'
	})
});