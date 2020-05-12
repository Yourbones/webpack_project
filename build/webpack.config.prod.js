// 定义生产环境的配置
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasurePlugin();
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.config.base');
 
const config = merge(baseWebpackConfig, {
    mode: 'production',
    // ...其它的配置
    devtool: 'hidden-source-map'
})

module.exports = smp.wrap(config);