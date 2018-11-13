
const webpack = require('webpack')
const resolve = require('path').resolve
const { spawn } = require('child_process')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  target: 'electron-renderer',
  entry: { renderer: './src/index.ts' },
  output: { filename: 'js/index.js' },
  context: __dirname,
  devtool: 'inline-source-map',
  module: {
    rules: [
      { test: /\.ts$/, loader: 'ts-loader', include: resolve('src'), options: { appendTsSuffixTo: [/\.vue$/], transpileOnly: true } },
      { test: /\.vue$/, loader: 'vue-loader' },
      { test: /\.pug$/, loader: 'pug-plain-loader' },
      { test: /\.css$/, use: ['vue-style-loader', 'css-loader'] }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin({ tslint: true, tslintAutoFix: true, vue: true, watch: ['./src'] }),
    new VueLoaderPlugin()
  ],
  resolve: {
    extensions: ['.ts', '.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
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
