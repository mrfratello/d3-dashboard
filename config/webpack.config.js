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

    resolve: {
        alias: {
            Components: path.resolve(__dirname, '../src/components/'),
            Containers: path.resolve(__dirname, '../src/containers/'),
            Redux: path.resolve(__dirname, '../src/redux/')
        }
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
            test: /\.(sc|c)ss$/,
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
        }, {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        outputPath: 'images'
                    }
                }]
        }, {
            test: /\.(woff(2)?|ttf|eot|svg)$/,
            use: [{
                loader: 'file-loader',
                options: {
                outputPath: 'fonts'
                }
            }]
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