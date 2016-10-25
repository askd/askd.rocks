const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const postcss = require('./src/postcss');

const isProduction = process.env.NODE_ENV === 'production';

const cssLoader = `css-loader?${JSON.stringify({
  sourceMap: !isProduction,
  minimize: false,
})}`;

const entry = path.join(__dirname, 'src', 'index');

const config = {
  entry: isProduction ? [
    // 'babel-polyfill',
    entry,
  ] : [
    'webpack-hot-middleware/client',
    entry,
  ],

  output: {
    path: path.join(__dirname, 'assets'),
    filename: 'application.js',
    publicPath: '/assets/',
    pathinfo: !isProduction,
  },

  resolve: {
    root: path.join(__dirname, 'src'),
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(isProduction ? 'production' : 'development'),
      },
    }),
    new webpack.ProvidePlugin({
      _: 'underscore',
    }),
    new ExtractTextPlugin('application.css'),
    new HtmlWebpackPlugin({
      filename: 'index_en.html',
      lang: 'en',
      template: path.join(__dirname, 'src', 'index.ejs'),
    }),
    new HtmlWebpackPlugin({
      filename: 'index_ru.html',
      lang: 'ru',
      template: path.join(__dirname, 'src', 'index.ejs'),
    }),
  ],

  module: {
    loaders: [
      {
        test: /\.(jpg|png|gif|ico)$/,
        loader: 'file-loader?name=[name].[ext]',
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.ejs$/,
        loader: 'ejs-loader',
      },
      {
        test: /\.(js|es6)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', [cssLoader, 'postcss-loader?pack=vendor']),
      },
      {
        test: /\.pcss$/,
        loader: ExtractTextPlugin.extract('style-loader', [cssLoader, 'postcss-loader']),
      },
    ],
  },

  devtool: isProduction ? 'source-map' : '#eval-source-map',

  postcss,
};


if (isProduction) {
  config.plugins.push(
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      },
      screw_ie8: true,
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(true)
  );
} else {
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  );
}

module.exports = config;
