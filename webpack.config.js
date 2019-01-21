const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const STATIC_PATH = './';
const FRONT_END_PATH = './front/';
const FRONT_END_SRC_PATH = './front/src/';
const FRONT_WORKER_JS_SRC_PATH = './front/src/common/notifications/';

module.exports = {
    entry: {
      door: ['babel-polyfill', FRONT_END_SRC_PATH+'./door.js'],
      home: ['babel-polyfill', FRONT_END_SRC_PATH+'./home.js']
    },
   output: {
      path: path.join(__dirname, STATIC_PATH+'static'),
      filename: 'foryou_[name]_bundle.js'
   },
   devServer: {
      inline: true,
      port: 8080,
      proxy: {
        '/': 'http://localhost:2020'
      }
   },
   module: {
      rules: [
         {
            test: /\.jsx?$/,
            exclude: [/node_modules/],
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
        	 test: /\.(jpe?g|png|jpg|gif|svg|ico|jpg)$/i,
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
         template: FRONT_END_PATH+'door.html',
         inject:false,
         filename:'door.html'
      }),
      new HtmlWebpackPlugin({
        template: FRONT_END_PATH+'home.html',
        inject:false,
        filename:'home.html'
     }),
     new CopyWebpackPlugin([
       {
         from: FRONT_END_SRC_PATH+'styles/images/*',
         to: path.join(__dirname, 'static/'+'/front/src/styles/images/[name].[ext]')
       },{
         from: FRONT_WORKER_JS_SRC_PATH+'worker.js',
         to: path.join(__dirname, 'static/'+'worker.js')
       }], {})
   ]
}
