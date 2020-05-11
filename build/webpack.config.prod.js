// 定义生产环境的配置
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.config.base');

module.exports = merge(baseWebpackConfig, {
    mode: 'production'
    // ...其它的配置
})