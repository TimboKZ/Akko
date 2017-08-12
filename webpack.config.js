const path = require('path');

module.exports = {
    entry: ['whatwg-fetch', path.resolve(__dirname, 'index.js')],
    externals: {
        three: 'THREE',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'akko.js',
        library: 'Akko',
        libraryTarget: 'var',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env'],
                    },
                },
            },
        ],
    },
};
