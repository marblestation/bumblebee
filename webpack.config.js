var path = require('path');
var webpack = require('webpack');
module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: 'js/apps/discovery/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bumblebee.bundle.js'
  },
  resolve: {
    extensions: ['.js'],
    modules: [
      path.resolve(__dirname, './node_modules'),
      path.resolve(__dirname, './src')
    ],
    alias: {
      'analytics_config': 'discovery.vars.js',
      'google-analytics': 'googleanalytics/lib/ga.js',
      'marionette': 'backbone.marionette',
      'appConfig': 'app.config.js',
      'router': 'js/apps/discovery/router.js',
      'hbs': 'handlebars'
    }
  },
  module: {
    loaders: [{
      test: /\.html$/,
      loader: 'handlebars-loader'
    }]
  },
  plugins: [
    // new (require('webpack-visualizer-plugin'))({
    //   filename: 'stats.html'
    // }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor',
    //   filename: 'vendor.js',
    //   'minChunks': function(module){
    //     return module.context && module.context.indexOf('node_modules') !== -1;
    //   }
    // }),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false,
    //     drop_console: false,
    //   }
    // })
  ],
  node: {
    fs: 'empty'
  }
};
