var path = require('path');
var webpack = require('webpack');
require('dotenv').config();

module.exports = {
  entry: {
    bundle: './src/index.jsx'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          comments: false,
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file'
      },
      {
        test: /\.(woff|woff2)$/,
        loader: 'url?prefix=font/&limit=5000'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream',
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.PORT': JSON.stringify(process.env.PORT),
      'process.env.REGION': JSON.stringify(process.env.REGION),
      'process.env.COGNITO_IDENTITY_POOL_ID': JSON.stringify(process.env.COGNITO_IDENTITY_POOL_ID),
      'process.env.COGNITO_USER_POOL_ID': JSON.stringify(process.env.COGNITO_USER_POOL_ID),
      'process.env.COGNITO_APP_CLIENT_ID': JSON.stringify(process.env.COGNITO_APP_CLIENT_ID),
      'process.env.DEFAULT_USERNAME': JSON.stringify(process.env.DEFAULT_USERNAME),
      'process.env.DEFAULT_PASSWORD': JSON.stringify(process.env.DEFAULT_PASSWORD),
      'process.env.INVOKE_URL_GET': JSON.stringify(process.env.INVOKE_URL_GET),
      'process.env.INVOKE_URL_POST': JSON.stringify(process.env.INVOKE_URL_POST),
      'process.env.INVOKE_URL_PUT': JSON.stringify(process.env.INVOKE_URL_PUT),
      'process.env.INVOKE_URL_DELETE': JSON.stringify(process.env.INVOKE_URL_DELETE),
    })
  ]
}
