import webpack from 'webpack';
import {join} from 'path';

const {NODE_ENV} = process.env;

module.exports = {
  devtool: 'source-maps',
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    }
  },
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/ }
    ]
  },
  entry: './src/index.js',
  output: {
    path: join(__dirname, 'dist', 'umd'),
    library: 'ReduxFetchResource',
    libraryTarget: 'umd'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
    })
  ]
};
