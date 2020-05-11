// 定义开发环境的配置
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.config.base');
const webpack = require('webpack');
const path = require('path');

module.exports = merge(baseWebpackConfig, {
    mode: 'development',
    // ...其他的配置
})