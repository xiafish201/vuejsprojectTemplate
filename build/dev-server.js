var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('../config');
var utils = require('./utils');
require('shelljs/global');
var proxyMiddleware = require('http-proxy-middleware');
var webpackConfig = process.env.NODE_ENV === 'testing'
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf');

process.env.NODE_ENV = 'development';

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port;
var hostname = config.dev.hostname || 'localhost';
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable;

var assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)
//rm('-rf', config.build.assetsRoot)
mkdir('-p', config.build.assetsRoot + '/static');
//var src = path.join(path.resolve(__dirname, '../'), './src/static');
//utils.copyDir(src, config.build.assetsRoot + '/static', (err) => {
//  console.log('err', err);
//});

var app = express();
var compiler = webpack(webpackConfig);

var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {
        colors: true,
        chunks: false
    }
});

var hotMiddleware = require('webpack-hot-middleware')(compiler);
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function(compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
        hotMiddleware.publish({
            action: 'reload'
        });
        cb();
    });
});

// proxy api requests
Object.keys(proxyTable).forEach(function(context) {
    var options = proxyTable[context];
    if (typeof options === 'string') {
        options = {
            target: options
        };
    }
    app.use(proxyMiddleware(context, options));
});

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')());

// serve webpack bundle output
app.use(devMiddleware);

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware);

// serve pure static assets
var staticPath = path.posix.join(config.build.assetsPublicPath, config.build.assetsSubDirectoryOfDev);
app.use(staticPath, express.static('./Manage'));

module.exports = app.listen(port, hostname, function(err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log('Listening at ' + hostname + ':' + port + '\n');
});
