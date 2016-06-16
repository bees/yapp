var webpack = require('webpack')
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var rupture = require('rupture')


module.exports = {
  entry: ['babel-polyfill', './src/main.js'],
  output: {
    path: path.join(process.cwd(), 'build/assets'),
    filename: 'bundle.js',
    publicPath: '/assets/'
  },
  resolve: {
    extensions: ['', '.js', '.vue', '.css']
  },
  module: {
    loaders: [
      {
        test: /\.js$/, loaders: ['babel'],
        exclude: [/node_modules/]
      },
      {
        test: /\.vue$/,
        loaders: ['vue']
      },
      {
        test: /\.hbs$/,
        loaders: ['handlebars']
      },
      {
        test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
        loader: 'url'
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url?limit=100&name=images/[hash].[ext]',
        exclude: [/node_modules/]
      }
    ],
    noParse: /node_modules\/json-schema\/lib\/validate\.js/
  },
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  vue: {
    autoprefixer: false,
    postcss:[
      require('postcss-cssnext')(),
      require('rupture'),
      require('lost')
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
        filename: path.join(process.cwd(), 'build/index.html'),
        title: 'VuePack',
        template: __dirname + '/index.hbs',
        inject: false
    }),
    new BrowserSyncPlugin(
      {
        // browse to http://localhost:3000/ during development, 
        // ./public directory is being served 
        host: 'localhost',
        port: 3000,
        proxy: 'http://localhost:3100/'
      },
      // plugin options 
      {
        // prevent BrowserSync from reloading the page 
        // and let Webpack Dev Server take care of this 
        reload: false
      }
    )
  ],
  babel: {
    presets: ['es2015', 'stage-0'],
    plugins: ['transform-runtime']
  }
}
