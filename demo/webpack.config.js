const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pathDirname = path.resolve.bind(this, __dirname);

module.exports = {
  mode: 'development',
  entry: './index',
  output: {
    path: pathDirname('dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', 'jsx'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        exclude: /node_modules/,
      },
    ],
  },
  devServer: {
    contentBase: pathDirname('dist'),
    compress: true,
    port: 9000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: pathDirname('../demo/index.html'),
    }),
  ],
};
