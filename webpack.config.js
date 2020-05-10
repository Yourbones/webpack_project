const HtmlWebpackPlugin = require('html-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';
const config = require('./public/config')[isDev ? 'dev' : 'build'];

module.exports = {
    /* 打包模式，不同模式采用了不同的内置优化 */
    mode: isDev ? 'development' : 'production',
    /* 用于在浏览器实时查看效果 */
    devServer: {
        port: '1027',                                          // 程序运行的端口号，默认是8080
        quiet: false,                                          // 默认不启用（启用后，除了初始启动信息之外的任何内容都不会被打印到控制台，包括错误和警告⚠。）
        inline: true,                                          // 默认开启 inline 模式，如果设置为false，开启 iframe
        stats: "errors-only",                                  // 终端仅打印 error
        overlay: false,                                        // 默认不启用(启用后，当编译出错时，会在浏览器窗口全屏输出错误，默认是关闭的。)
        clientLogLevel: "silent",                              // 设置日志等级
        compress: true,                                        // 是否启动 gzip 压缩
        hot: true,                                             // 是否开启热更新
    },
    /* 模块转换器配置对象(配置指定文件使用指定loader进行转换) */
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            }
        ]
    },
    /* 插件配置对象(配置安装的webpack插件) */
    plugins: [
        // 自动将指定html文件一起打包，并将打包后的[hash].js文件自动插入指定的html中
        new HtmlWebpackPlugin({
            template: './public/index.html',                   // 指定的html文件
            filename: 'index.html',                            // 打包后的文件名
            // chunks: ['index'],                                 // 仅把数组中的js文件引入html文件中
            config: config.template,                           // 自定义设置的对象
            minify: {
                removeAttributeQuotes: false,                  // 是否删除属性的双引号
                collapseWhitespace: false,                     // 是否折叠空白
            },
            // hash: true                                      // 是否加上hash，默认是false
        }),
    ]
}