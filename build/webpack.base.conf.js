var path = require('path');
var config = require('../config');
var utils = require('./utils');
var projectRoot = path.resolve(__dirname, '../');

// var entries = utils.getEntry('./src/view/**/*.js'); // 获得入口js文件
// var chunks = Object.keys(entries);

module.exports = {
    entry: {
        index: './src/index.js',
        login: './src/view/login/index/index.js'
    },
//  output: {
//      path: config.build.assetsRoot,
//      publicPath: config.build.assetsPublicPath,
//      filename: 'build.js'
//  },
     output: {
         path: config.build.assetsRoot,
         publicPath: config.build.assetsPublicPath,
         filename: utils.assetsPath('js/[name].js'),
         chunkFilename: utils.assetsPath('js/[id].js')
     },
    resolve: {
        extensions: ['', '.js', '.vue'],
        fallback: [path.join(__dirname, '../node_modules')],
    // 别名配置
        alias: {
            'src': path.resolve(__dirname, '../src'),
            'static': path.resolve(__dirname, '../src/static'),
            'common': path.resolve(__dirname, '../src/common'),
            'component': path.resolve(__dirname, '../src/component'),
            'view': path.resolve(__dirname, '../src/view'),
            'store': path.resolve(__dirname, '../src/store'),
            'library': path.resolve(__dirname, '../src/library'),
            'filter': path.resolve(__dirname, '../src/filter'),
            'directive': path.resolve(__dirname, '../src/directive'),
            'api': path.resolve(__dirname, '../src/api')
        }
    },
    resolveLoader: {
        fallback: [path.join(__dirname, '../node_modules')]
    },
    module: {
    //  preLoaders: [
    //    {
    //      test: /\.vue$/,
    //      loader: 'eslint',
    //      include: projectRoot,
    //      exclude: /node_modules/
    //    },
    //    {
    //      test: /\.js$/,
    //      loader: 'eslint',
    //      include: projectRoot,
    //      exclude: /node_modules/
    //    }
    //  ],
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.js$/,
                loader: 'babel',
                include: projectRoot,
                exclude: /node_modules/
            },
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.html$/,
                loader: 'vue-html'
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url',
                query: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url',
                query: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    },
    eslint: {
        formatter: require('eslint-friendly-formatter')
    },
    vue: {
        loaders: utils.cssLoaders()
    }
};
