const path = require('path');
const autoprefixer = require('autoprefixer');

module.exports = [{
    // mode: 'production',
    mode: 'development',
    entry: {
        app: [
            '@babel/polyfill',
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
                presets: [
                    '@babel/preset-env', 
                    '@babel/preset-react'
                ]
              }
        }, {
            test: /\.scss$/,
            use: [
                'style-loader',
                'css-loader',
                {
                    loader: 'postcss-loader',
                    options: {
                       plugins: () => [autoprefixer()]
                    }
                }, {
                    loader: 'sass-loader',
                    options: {
                      includePaths: ['./node_modules']
                    }
                }
            ]
        }],
    },

    devtool: 'inline-source-map',
    devServer: {
        disableHostCheck: true,
        proxy: {
            '/api': 'http://localhost:3000'
        }
    }
}]