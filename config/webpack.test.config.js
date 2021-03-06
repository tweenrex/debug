var path = require('path')
var webpack = require('webpack')

module.exports = {
    entry: path.resolve(__dirname, '../tests/main.js'),
    output: {
        path: path.resolve(__dirname, '../tests'),
        publicPath: '/tests',
        filename: 'build.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['vue-style-loader', 'css-loader']
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {

                    }
                    // other vue-loader options go here
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },
    resolve: {
        alias: {
            vue$: 'vue/dist/vue.esm.js'
        },
        extensions: ['*', '.js', '.vue', '.json']
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true,
        overlay: true,
        contentBase: path.join(__dirname, '../tests/assets')
    },
    performance: {
        hints: false
    },
    devtool: '#eval-source-map'
}
