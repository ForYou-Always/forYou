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
   plugins:[
      new HtmlWebpackPlugin({
         template: FRONT_END_PATH+'dashboard.html'
      })
   ]
}




//{
//	  // ASSET LOADER
//	  test: /\.(woff|woff2|ttf|eot)$/,
//	  loader: 'file-loader'
//	},
//	{
//	  //IMAGE LOADER
//	  test: /\.(jpe?g|png|gif|svg)$/i,
//	  loader:'file-loader'
//	},
//	{
//	  // HTML LOADER
//	  test: /\.html$/,
//	  loader: 'html-loader'
//	},