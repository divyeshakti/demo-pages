const path = require('path');

module.exports = function override(config) {
    config.output = {
        ...config.output,
        path: path.resolve(__dirname, '../demo'), // Set the output path
    };
    return config;
};