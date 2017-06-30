var path = require('path');
var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
var Extrat = require('extract-text-webpack-plugin');

var extratLess = new Extrat('css/[name].css');
var extratCss = new Extrat('css/[name]-css.css');

var ROOT = __dirname;
var SRC = path.join(ROOT,'src');
var DIST = path.join(__dirname,'dist');
var TEMPLATES = path.join(__dirname,'template');
var config = {
    entry:['webpack/hot/dev-server',path.join(SRC,'app')],
    output:{
        path:DIST,
        filename:'release.js'
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    {loader:'style-loader'},
                    {
                        loader:'css-loader',
                        options:{
                            modules:true
                        }
                    }

                ]
            },
            {
                test:/\.less$/,
                use:[
                    {loader:'style-loader'},
                    {loader:'css-loader',options:{modules:false}},
                    {loader:'less-loader'}
                ]
            },
            {
                test:/\.jsx?/,
                use: [{
                    loader: "babel-loader",
                    options: { presets: ["es2015","react"] }
                }]
            },
            {
                test:/\.(png|jpg|jpeg|gif|woff|svg|eot|ttf)/,
                use:[{
                    loader:'url-loader?limit=250000'
                }]

            }


        ]
    },
    plugins:[
        new htmlWebpackPlugin({
            template:path.join(TEMPLATES,'index.html')
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
};

module.exports = config;
