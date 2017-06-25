var path = require('path');
var SRC_DIR = path.join(__dirname, '/react-client/src');
var DIST_DIR = path.join(__dirname, '/react-client/dist');
var HtmlWebpackPlugin = require('html-webpack-plugin');
//plugin in loaders an array, call new html
module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: SRC_DIR,
        loader: 'babel-loader',      
        query: {
          presets: ['react', 'es2015', 'stage-0']
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({  // Also generate a test.html 
      template: 'react-client/src/index.html'
    })
  ]
};