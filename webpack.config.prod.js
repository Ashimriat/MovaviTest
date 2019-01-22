const path = require('path'),
  CopyWebpackPlugin = require('copy-webpack-plugin'),
  JavaScriptObfuscator = require('webpack-obfuscator');

module.exports = {
  mode: 'production',
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin([
      {from: 'src/assets', to: 'assets'},
      {from: 'src/index.html'}
    ], {}),
    new JavaScriptObfuscator ({
      rotateUnicodeArray: true
    })
  ]
};