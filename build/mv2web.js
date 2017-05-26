/* eslint-disable */
require('shelljs/global')
var path = require('path')
var config = require('../config')
var replaceTxt = require('./utils')

if (config.build.mv2web) {
  /* eslint no-undef: "error"*/
  rm('-rf', config.build.publishPath + '/dist')
  //// 遍历目录，剔除svn文件
  //// cp('-R', './dist/', config.build.publishPath)
  var src = path.join(path.resolve(__dirname, '../'), './Manage')
  replaceTxt.copyDir(src, config.build.publishPath + '/dist', (err) => {
    console.log('err', err)
  })
}
