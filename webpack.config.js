const webpack = require('webpack')
const path = require('path')

module.exports = {
  devtool: 'source-map',
  entry: {
    'app': [
      'babel-polyfill',
      'react-hot-loader/patch',
      './src/index'
    ]
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.css$/, exclude: /node_modules/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
      { test: /\.(sass|scss)$/,
        use: [
            'style-loader',
            'css-loader',
            'sass-loader',
          ]
        }
    ]
  }
}
