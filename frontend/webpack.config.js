var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, '../src/main/resources/static/public');
var APP_DIR = path.resolve(__dirname, 'src/client/app');

var config = {
    entry: APP_DIR + '/components/main/main.jsx',
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js'
    },
    module : {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015']
                }
            },
            {
                test: /\.scss$/,
                loaders: [
                    "style",
                    "css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]",
                    "resolve-url",
                    "sass?sourceMap"
                ],
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loaders: ['url-loader?limit=100000&name='+APP_DIR+'/img/[name].[ext]'],
            }
        ]
    }
};

module.exports = config;