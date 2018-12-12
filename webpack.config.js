const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FRONT_END_PATH = './front/';
const FRONT_END_SRC_PATH = './front/src/';

module.exports = {
   entry: ['babel-polyfill', FRONT_END_SRC_PATH+'./entry.js'],
   output: {
      path: path.join(__dirname, FRONT_END_PATH+'static'),
      filename: 'foryou_entry_bundle.js'
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
         },
         {
        	 test: /\.(jpe?g|png|jpg|gif|svg|ico)$/i,
        	 use: [{
        		 loader: 'file-loader',
        		 options: {
        			 name: '[name].[ext]',
        			 outputPath: 'images/'
        		 }
        	 }]
         },
         {
        	 test: /\.(html)$/,
        	 use: {
        		 loader: 'html-loader',
        		 options: {
        			 attrs: ['img:src', 'link:href']
        		 }
        	 }
         }
      ]
   },
   devtool:'source-map',
   plugins:[
      new HtmlWebpackPlugin({
         template: FRONT_END_PATH+'entry.html',
         inject:false
      })
   ]
}
