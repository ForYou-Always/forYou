const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FRONT_END_PATH = './front/';
const FRONT_END_SRC_PATH = './front/src/';

module.exports = {
   entry: FRONT_END_SRC_PATH+'./root.js',
   output: {
      path: path.join(__dirname, FRONT_END_PATH+'static'),
      filename: 'foryou_bundle.js'
   },
   devServer: {
      inline: true,
      port: 8080
   },
   module: {
      rules: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
               presets: ['es2015', 'react'],
               plugins: ['transform-class-properties']
            }
         },
         {
        	 test: /\.css$/,
        	 use: [ 'style-loader', 'css-loader' ]
         }
      ]
   },
   plugins:[
      new HtmlWebpackPlugin({
         template: FRONT_END_PATH+'dashboard.html'
      })
   ]
}