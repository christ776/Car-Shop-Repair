const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  entry: path.resolve(__dirname, './src/index.jsx'),
  output: {
    publicPath: '/',
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      { test: /\.css$/, use: [{ loader: 'css-loader' }] },
      {
        test: /.scss$/,
        use: [
          {
            loader: 'style-loader', // creates style nodes from JS strings
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
          },
          {
            loader: 'sass-loader', // compiles Sass to CSS
          },
        ],
      },
      { test: /\.(graphql|gql)$/, loader: 'graphql-tag/loader' },
      { test: /\.jsx?$/, use: [{ loader: 'babel-loader' }] },
      {
        test: /\.(jpe?g|png|gif|svg|woff2?|ttf|eot)$/i,
        use: [{ loader: 'file-loader', options: { name: '[name][hash].[ext]' } }],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
