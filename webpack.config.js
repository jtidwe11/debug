
const webpack = require('webpack')
const resolve = require('path').resolve
const { spawn } = require('child_process')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  target: 'electron-renderer',
  entry: { renderer: './src/renderer.ts' },
  output: { filename: 'js/index.js' },
  context: __dirname,
  devtool: 'inline-source-map',
  module: {
    rules: [
      { test: /\.ts$/, loader: 'ts-loader', include: resolve('src'), options: { transpileOnly: true } }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin({ tslint: true, tslintAutoFix: true, watch: ['./src'] }),
  ],
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },
  devServer: {
    port: 4000,
    stats: 'errors-only',
    contentBase: resolve('dist'),
    before() {
      spawn('electron', ['.', '--remote-debugging-port=9222'], { shell: true, env: 'dev', stdio: 'inherit' })
        .on('close', () => process.exit(0))
        .on('error', spawnError => console.error(spawnError))
    }
  }
}
