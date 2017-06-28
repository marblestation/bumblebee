var path = require('path');
var webpack = require('webpack');
var WebpackVisualizerPlugin = require('webpack-visualizer-plugin');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    'discovery': 'js/apps/discovery/main.js'
  },
  output: {
    path: path.resolve(__dirname, 'src'),
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
        partialResolver: function (partial, callback) {
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
    }]
  },
  plugins: [
    new WebpackVisualizerPlugin({
      filename: 'stats.html'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        return /node_modules/.test(module.resource);
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      minChunks: 2
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/)
  ],
  node: {
    fs: 'empty',
    dns: 'mock',
    net: 'mock',
    dgram: 'empty',
    tls: 'mock'
  }
};
