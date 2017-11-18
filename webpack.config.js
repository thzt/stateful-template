const path = require('path');

module.exports = {
    devtool: 'source-map',
    context: path.resolve(__dirname, ''),
    entry: {
        index: path.resolve(__dirname, 'index.jsx')
    },
    output: {
        devtoolModuleFilenameTemplate: '[absolute-resource-path]',
        path: path.resolve(__dirname, 'dist/'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                use: 'babel-loader'
            }
        ]
    }
};