# webpack4.x+vue2.x+eslint
### 兼容IE
- main.js
```
import 'core-js/stable'
import 'regenerator-runtime/runtime'
```
- package.json
```
"browserslist": [
    "> 1%",
    "last 2 versions",
    "IE 9",
    "IE 10",
    "IE 11"
  ]
```
### Eslint和styleLint编码规范控制
### [webpack4打包速度优化参考](https://juejin.cn/post/6911519627772329991)
1、HappyPack
2、thread-loader
3、hard-source-webpack-plugin
4、terser-webpack-plugin
- 完整vue.config.js
```javascript
const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin')
const HappyPack = require('happypack')
const TerserPlugin = require('terser-webpack-plugin')
const { HashedModuleIdsPlugin } = require('webpack')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')

const productionGzipExtensions = ['js', 'css']
const isProduction = process.env.NODE_ENV === 'production'
function resolve(dir) {
    return path.join(__dirname, dir)
}
let rules = [
    {
        test: /\.js$/,
        include: path.resolve('src'),
        use: [
            {
                loader: 'thread-loader',
                options: {
                    // 产生的 worker 的数量，默认是 cpu 的核心数
                    workers: 3,
                    // 一个 worker 进程中并行执行工作的数量
                    // 默认为 20
                    workerParallelJobs: 50
                }
            }
        ]

    }

]

let pluginsArr = [
    new SimpleProgressWebpackPlugin(),
    new HardSourceWebpackPlugin(),
    new CompressionWebpackPlugin({
        filename: '[path][base].gz', // 提示compression-webpack-plugin@3.0.0的话asset改为filename
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8
    }),
    new HashedModuleIdsPlugin()
]
module.exports = {
    /* publicPath: {
            process: {
                env: {
                    NODE_ENV: 'development' // production
                }
            }
        }, */
    transpileDependencies: [
        /[/\\]node_modules[/\\](.+?)?element-ui(.*)[/\\]src/,
        /[/\\]node_modules[/\\](.+?)?element-ui(.*)[/\\]package/,
        /[/\\]node_modules[/\\](.+?)?f-render(.*)/,
        /[/\\]node_modules[/\\](.+?)?quill-image-drop-module(.*)/,
        /[/\\]node_modules[/\\](.+?)?vue-ele-form(.*)/,
        /[/\\]node_modules[/\\](.+?)?vue-ele-form-bmap(.*)/,
        /[/\\]node_modules[/\\](.+?)?vue-baidu-map(.*)/,
        /[/\\]node_modules[/\\](.+?)?vue-ele-upload-image(.*)/,
        /[/\\]node_modules[/\\](.+?)?@jiaminghi(.*)/,
        /[/\\]node_modules[/\\](.+?)?vuex(.*)/,
        /[/\\]node_modules[/\\](.+?)?vue-router(.*)/,
        /[/\\]node_modules[/\\](.+?)?jspdf(.*)/,
        /[/\\]node_modules[/\\](.+?)?bpmn-js(.*)/,
        /[/\\]node_modules[/\\](.+?)?camunda-bpmn-moddle(.*)/,
        /[/\\]node_modules[/\\](.+?)?xcrud(.*)/,
        /[/\\]node_modules[/\\](.+?)?vue2-ace-editor(.*)/,
        /[/\\]node_modules[/\\](.+?)?vue-ueditor-wrap(.*)/,
        /[/\\]node_modules[/\\](.+?)?vue-json-viewer(.*)/,
        /[/\\]node_modules[/\\](.+?)?vuedraggable(.*)/,
        /[/\\]node_modules[/\\](.+?)?vue-property-decorator(.*)/,
        /[/\\]node_modules[/\\](.+?)?vant(.*)/,
        /[/\\]node_modules[/\\](.+?)?vue-codemirror(.*)/,
        /[/\\]node_modules[/\\](.+?)?vue-class-component(.*)/,
        /[/\\]node_modules[/\\](.+?)?vue-clipboard2(.*)/,
        /[/\\]node_modules[/\\](.+?)?html2canvas(.*)/,
        /[/\\]node_modules[/\\](.+?)?iview(.*)/

    ],
    configureWebpack: config => {
        let plugins = []
        let module = {}
        if (isProduction) {
            module.rules = [].concat(rules)
            plugins = [].concat(pluginsArr)
            // 开启分离js
            config.optimization = {
               runtimeChunk: 'single',
                minimize: true,
                minimizer: [
                    new TerserPlugin({
                        terserOptions: {
                            ecma: undefined,
                            warnings: false,
                            parse: {},
                            compress: {
                                drop_console: true,
                                drop_debugger: false,
                                pure_funcs: ['console.log'] // 移除console
                            }
                        },
                        // 代码压缩插件
                        parallel: 4, // 开启并行压缩
                        cache: true
                    })
                ]
            }

            // 取消webpack警告的性能提示
            config.performance = {
                hints: 'warning',
                // 入口起点的最大体积
                maxEntrypointSize: 1000000 * 500,
                // 生成文件的最大体积
                maxAssetSize: 10000000 * 1000,
                // 只给出 js 文件的性能提示
                assetFilter: function(assetFilename) {
                    return assetFilename.endsWith('.js')
                }
            }
        }

        return isProduction ? { plugins, module } : { plugins }
    },
    css: {
        sourceMap: process.env.NODE_ENV !== 'production'
    },
    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('@mixins', resolve('src/mixins'))
            .set('@store', resolve('src/store'))
        config.plugin('HappyPack').use(HappyPack, [
            {
                loaders: [
                    {
                        loader: 'babel-loader?cacheDirectory=true'
                    }
                ]
            }
        ])
        // webpack 会默认给commonChunk打进chunk-vendors，所以需要对webpack的配置进行delete
        config.optimization.delete('splitChunks')

        // config
        //     .plugin('webpack-bundle-analyzer')
        //     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    },
    assetsDir: 'static',
    runtimeCompiler: true,
    productionSourceMap: false,
    outputDir: 'dist',
    devServer: {
        host: 'localhost',
        port: 3001,
        https: false,
        hotOnly: false,
        proxy: { // 设置代理
           
        }
    }
}

```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
