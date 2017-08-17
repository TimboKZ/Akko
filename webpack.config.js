const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: [path.resolve(__dirname, 'sass', 'main.sass'), 'whatwg-fetch', path.resolve(__dirname, 'index.js')],
    externals: {
        three: 'THREE',
        bluebird: 'Promise',
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
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env'],
                        plugins: [['transform-react-jsx', {
                            pragma: 'h',
                        }]],
                    },
                },
            },
            {
                test: /\.(sass|scss)$/,
                loader: ExtractTextPlugin.extract(['css-loader?+minimize', 'sass-loader']),
            },
        ],
    },
    plugins: [
        new ExtractTextPlugin('akko.min.css'),
    ],
};
