var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var WebpackVisualizerPlugin = require('webpack-visualizer-plugin');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    'discovery': 'js/apps/discovery/main.js',
    'styles': 'styles/sass/manifest.scss'
  },
  output: {
    path: path.resolve(__dirname, 'src', 'dist'),
    publicPath: '/dist/',
    filename: '[name].bundle.js',
    chunkFilename: '[name]-bundle.js'
  },
  resolve: {
    extensions: ['.js', '.es6', '.html'],
    modules: [
      path.resolve(__dirname, './node_modules'),
      path.resolve(__dirname, './src')
    ],
    alias: {
      'analytics_config': 'discovery.vars.js',
      'analytics': 'js/components/analytics.js',
      'google-analytics': 'googleanalytics/lib/ga.js',
      'marionette': 'backbone.marionette',
      'app-config': 'app.config.js',
      'router': 'js/apps/discovery/router.js',
      'hbs': 'handlebars',
      'cache': 'dsjslib/lib/Cache.js',
      'pubsub_service_impl': 'js/services/default_pubsub',
      'jquery-querybuilder': 'jQuery-QueryBuilder/dist/js/query-builder.js',
      'jQuery.extendext': 'jquery-extendext/jQuery.extendext.js'
    }
  },
  module: {
    rules: [
    {
      test: /.html$/,
      exclude: /node_modules/,
      loader: 'handlebars-loader',
      query: {
        knownHelpers: ['compare'],
        'partialResolver': function (partial, callback) {
          if (partial.indexOf(/.html$/) === -1) {
            partial += '.html';
          }
          callback(null, path.resolve(__dirname, 'src', partial));
        }
      }
    },{
      test: /.es6$/,
      loader: 'babel-loader',
      query: {
        presets: ['babili', 'react']
      }
    },{
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/i,
        loader: 'file-loader'
    }, {
      enforce: 'pre',
      test: /\.scss$/,
      exclude: [
        path.resolve(__dirname, 'node_modules')
      ],
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          'css-loader',
          {
            loader: 'resolve-url-loader',
            query: {
              debug: true,
              keepQuery: true
            }
          // }, {
          //   loader: 'string-replace-loader',
          //   query: {
          //     search: /$ui-icon-font-path: '\.\.\/fonts\/'/,
          //     replace: '$ui-icon-font-path: \'~jquery-ui-sass/assets/fonts/\''
          //   }
          }, 'sass-loader'
        ]
      })
    }]
  },
  plugins: [
    new WebpackVisualizerPlugin({
      filename: 'stats.html'
    }),
    new ExtractTextPlugin('styles.css'),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor',
    //   minChunkCount: Infinity,
    //   'minChunks': function (module) {
    //     return /node_modules/.test(module.resource);
    //   }
    // }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
    new HtmlWebpackPlugin({
      template: 'index.html',
      files: {
        css: ['styles.css']
      }
    })
  ],
  node: {
    fs: 'empty',
    dns: 'mock',
    net: 'mock',
    dgram: 'empty',
    tls: 'mock'
  }
};
