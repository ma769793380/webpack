const path = require('path');

// const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');  // 动态生成html资源的引用



const MiniCssExtractPlugin = require("mini-css-extract-plugin");  // 分离css


const CleanWebpackPlugin = require('clean-webpack-plugin'); // 清除dist

module.exports = {
    entry: './src/index.js',

    // entry:{
    //     app:'./src/index.js',
    //     print: './src/print.js'
    // },

    devtool: 'inline-source-map',   // 便于开发发现bug

    devServer: {                     // 修改配置文件，告诉开发服务器(dev server)，在哪里查找文件
        contentBase: './dist'
    },

    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,


                    //         "style-loader", // creates style nodes from JS strings
                    "css-loader",// translates CSS into CommonJS
                    "sass-loader" // compiles Sass to CSS, using Node Sass by default
                ],

            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(['dist/*']),
        new HtmlWebpackPlugin({
            title: 'Output Management',
            template: './src/index.html',
            header:{
                'Content-type':'text/html',
            }
        }),




        new MiniCssExtractPlugin({
            filename: "css/[name][chunkhash].css",
        }),







    ]




};