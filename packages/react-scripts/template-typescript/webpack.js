const LicenseCheckerWebpackPlugin = require('license-checker-webpack-plugin');

// Allows to manipulate the webpack config in aaa-react-scripts-ts
// without the need to eject the project. Use this as your last resort.
// * ./node_modules/aaa-react-scripts-ts/config/webpack.config.dev.js
// * ./node_modules/aaa-react-scripts-ts/config/webpack.config.prod.js
module.exports = function getConfig(config, isProduction) {
    // Example:
    // don't parse the localForage package.
    // https://github.com/localForage/localForage#browserify-and-webpack
    // config.module.noParse = /node_modules\/localforage\/dist\/localforage.js/;

    const licenseChecker = new LicenseCheckerWebpackPlugin({
        outputFilename: 'ThirdPartyNotices.txt',
    });
    config.plugins.push(licenseChecker);

    return config;
};
