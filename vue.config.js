module.exports = {
  //基本路径
  publicPath:
    process.env.NODE_ENV === "production" ? "/production-sub-path/" : "/",
  //输出文件目录
  outputDir: "dist",
  //放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  assetsDir: "static",
  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,
  //以多页模式构建应用程序。
  pages: undefined,
  //是否使用包含运行时编译器的 Vue 构建版本
  runtimeCompiler: false,
  //是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建，在适当的时候开启几个子进程去并发的执行压缩
  // parallel: require("os").cpus().length > 1,
  //生产环境是否生成 sourceMap 文件，一般情况不建议打开（map文件的作用在于：项目打包后，代码都是经过压缩加密的，如果运行时报错，输出的错误信息无法准确得知是哪里的代码报错。）
  productionSourceMap: false,
  // webpack配置
  //对内部的 webpack 配置进行更细粒度的修改 https://github.com/neutrinojs/webpack-chain see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: config => {},
  //调整 webpack 配置 https://cli.vuejs.org/zh/guide/webpack.html#%E7%AE%80%E5%8D%95%E7%9A%84%E9%85%8D%E7%BD%AE%E6%96%B9%E5%BC%8F
  configureWebpack: config => {},
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?（项目中会写很多样式，但是在浏览器打开控制台可能看不到这段css是在哪写的）
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      sass: {
        // 注意：在 sass-loader v7 中，这个选项名是 "data"
        prependData: `@import "./src/style/index.scss";`
      }
    },
    // 启用 CSS modules
    //modules: false
    //// 启用 CSS modules for all css / pre-processor files
    requireModuleExtension: true
  },
  devServer: {
    // host: 'localhost',
    host: "0.0.0.0",
    port: 8000, // 端口号
    https: false, // https:{type:Boolean}
    open: false, //配置自动启动浏览器  http://172.11.11.22:8888/rest/XX/
    hotOnly: true, // 热更新
    // proxy: 'http://localhost:8000'   // 配置跨域处理,只有一个代理
    proxy: {
      //配置自动启动浏览器
      "/XX/*": {
        target: "http://172.11.11.11:7071",
        changeOrigin: true,
        // ws: true,//websocket支持
        secure: false
      },
      "/XX2/*": {
        target: "http://172.12.12.12:2018",
        changeOrigin: true,
        //ws: true,//websocket支持
        secure: false
      }
    }
  }
};
