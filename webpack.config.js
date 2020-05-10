const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
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
            chunks: ['index'],                                 // 仅把数组中的js文件引入html文件中
            minify: {
                removeAttributeQuotes: false,                  // 是否删除属性的双引号
                collapseWhitespace: false,                     // 是否折叠空白
            },
            // hash: true                                      // 是否加上hash，默认是false
        }),
    ]
}