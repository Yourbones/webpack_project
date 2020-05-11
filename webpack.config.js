const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path');
const Webpack = require('webpack');
const isDev = process.env.NODE_ENV === 'development';
const config = require('./public/config')[isDev ? 'dev' : 'build'];

module.exports = {
    /* 打包模式，不同模式采用了不同的内置优化 */
    mode: isDev ? 'development' : 'production',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),                             // 必须是绝对路径
        filename: 'bundle.[hash:6].js',                                    // 打包后的文件名
        publicPath: '/'                                                    // 通常是CDN地址
    },
    /* 用于在浏览器实时查看效果 */
    devServer: {
        port: '1027',                                                      // 程序运行的端口号，默认是8080
        quiet: false,                                                      // 默认不启用（启用后，除了初始启动信息之外的任何内容都不会被打印到控制台，包括错误和警告⚠。）
        inline: true,                                                      // 默认开启 inline 模式，如果设置为false，开启 iframe
        stats: "errors-only",                                              // 终端仅打印 error
        overlay: false,                                                    // 默认不启用(启用后，当编译出错时，会在浏览器窗口全屏输出错误，默认是关闭的。)
        clientLogLevel: "silent",                                          // 设置日志等级
        compress: true,                                                    // 是否启动 gzip 压缩
        hot: true,                                                         // 是否开启热更新
    },
    /* 开发工具配置 */
    devtool: isDev ? 'cheap-module-eval-source-map' : 'source-map',        // 打包后的源码映射，对于通过控制台打印语句找到对应源码行数
    /* 模块转换器配置对象(配置指定文件使用指定loader进行转换) */
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.(le|c)ss$/,
                use: [                   
                    {                                                      // style-loader 动态创建 style 标签，将 css 插入到 head 中
                        loader: MiniCssExtractPlugin.loader,               // 替换之前的 style-loader(实现抽离css单独进行打包)
                        options: {
                            hmr: isDev,
                            reloadAll: true,
                        }
                    },                       
                    'css-loader',
                    {                                        
                        loader: 'postcss-loader',                              // css-loader 负责处理 @import 等语句
                        options: {                                             // postcss-loader 和 autoprefixer，自动生成浏览器兼容性前缀
                            plugins: function () {
                                return [                                       // less-loader 负责处理编译 .less 文件,将其转为 css
                                    require('autoprefixer')({                  // loader 的执行顺序是从右向左执行的
                                        "overrideBrowserslist": [
                                            "defaults"
                                        ]
                                    })
                                ]
                            }
                        }
                    }, 
                    'less-loader'
                ],
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|jpeg|webp|svg|eot|ttf|woff|woff2)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240,                                   // 资源大小小于 10K 时，将资源转换为 base64，超过 10K，将图片拷贝到 dist 目录。
                            esModule: false,
                            name: '[name]_[hash:6].[ext]',
                            outputPath: 'assets'
                        }
                    }
                ],
                exclude: /node_modules/
            },
        ]
    },
    /* 插件配置对象(配置安装的webpack插件) */
    plugins: [
        // 自动将指定html文件一起打包，并将打包后的[hash].js文件自动插入指定的html中
        new HtmlWebpackPlugin({
            template: './public/index.html',                                // 指定的html文件
            filename: 'index.html',                                         // 打包后的文件名
            // chunks: ['index'],                                           // 仅把数组中的js文件引入html文件中
            config: config.template,                                        // 自定义设置的对象
            minify: {
                removeAttributeQuotes: false,                               // 是否删除属性的双引号
                collapseWhitespace: false,                                  // 是否折叠空白
            },
            // hash: true                                                   // 是否加上hash，默认是false
        }),
        // 每次打包前清空dist目录
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns:['**/*', '!dll', '!dll/**']         // 不删除dll目录下的文件
        }),
        // 静态资源拷贝(需要做的是将 public/js 目录拷贝至 dist/js 目录)
        new CopyWebpackPlugin([
            {
                from: 'public/js/*.js',
                to: path.resolve(__dirname, 'dist', 'js'),
                flatten: true,                                               // flatten 这个参数，设置为 true，那么它只会拷贝文件，而不会把文件夹路径都拷贝上
            },
            // 还可以继续配置其它要拷贝的文件
        ], {
            ignore: ['other.js']
        }),
        // 抽离css文件单独进行打包，原先的css文件会被打入js文件中
        new MiniCssExtractPlugin({
            filename: 'css/[name].css' 
        }),
        // 压缩抽离出来单独打包的css文件
        new OptimizeCssPlugin(),
        // 热更新插件
        new Webpack.HotModuleReplacementPlugin()
    ]
}