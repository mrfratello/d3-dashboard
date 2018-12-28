const path = require('path');

module.exports = [{
    // mode: 'production',
    mode: 'development',
    entry: {
        app: [
            './src/index.js'
        ]
    },
    output: {
        path: path.resolve(__dirname, '../build'),
        publicPath: '/build/',
        filename: 'bundle.js'
    },

    module: {
        rules: [{
            test: /\.js?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env']
              }
        }, {
            test: /\.scss$/,
            use: [
                'style-loader',
                'css-loader',
                'sass-loader'
            ]
        }],
    },

    devtool: 'inline-source-map',
    devServer: {
        disableHostCheck: true
    }
}]