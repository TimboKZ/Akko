const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

const _package = require('./package.json');

const minify = !!process.env.MINIFY;
const minified = string => minify ? string : '';

let plugins = [
    new ExtractTextPlugin(`akko${minified('.min')}.css`),
];
if (minify) {
    plugins.push(new UglifyJSPlugin({
        test: /\.min\.js$/i,
        output: {
            comments: /^!/,
        },
    }));
}
plugins.push(new webpack.BannerPlugin({
    banner: `Akko v${_package.version} | (c) Timur Kuzhagaliyev | github.com/TimboKZ/Akko`,
    entryOnly: true,
}));

module.exports = {
    entry: [path.resolve(__dirname, 'sass', 'main.sass'), 'whatwg-fetch', path.resolve(__dirname, 'index.js')],
    externals: {
        three: 'THREE',
        bluebird: 'Promise',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: `akko${minified('.min')}.js`,
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
                loader: ExtractTextPlugin.extract([`css-loader${minified('?+minimize')}`, 'sass-loader']),
            },
        ],
    },
    plugins,
};
