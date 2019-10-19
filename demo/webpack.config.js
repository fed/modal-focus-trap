const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './public'
  },
  module: {
    rules: [
      {
        test: /\.ts(x)?$/,
        use: [
          'awesome-typescript-loader'
        ],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [
      '.ts',
      '.js'
    ]
  }
};
