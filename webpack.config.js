let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let CleanWebpackPlugin = require("clean-webpack-plugin");
let Happypack = require("happypack");
const { HotModuleReplacementPlugin } = require("webpack");
const { DllPlugin,IgnorePlugin,DllReferencePlugin } = require("webpack");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "bundle.[hash].js",
    path: path.resolve(__dirname, "build"),
  },
  devtool: "source-map",
  watch:true,
  watchOptions:{
    poll:1000,
    aggregateTimeout:500,
    ignored:/node_modules/
  },
  devServer: {
    port: 8080,
    static: {
      directory: path.join(__dirname, "build"),
    },
    compress: true,
    hot:true
    // before(app) {
    //   app.get('/api/user',(req,res)=>{
    //     res.json({name:'alkjdkfjddda大家放得开'})
    // })
    // }
    // proxy:{
    //   '/api':'http://localhost:3000'
    // }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
      },
      hash: true,
    }),
    new IgnorePlugin({
      contextRegExp:/\.\/locale/, 
      resourceRegExp:/moment/
    }),
    // new CleanWebpackPlugin('./build'),
    // new Happypack({
    //   id: "css",
    //   use: [
    //     {
    //       loader: "style-loader",
    //     },
    //     "css-loader",
    //     "postcss-loader",
    //     "less-loader",
    //   ],
    // }),
    new HotModuleReplacementPlugin(),
  ],
  module: {
    noParse:/jquery/,
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: "file-loader",
      },
      // {
      //   test:/\.js$/,
      //   use:{
      //     loader:'eslint-loader',
      //     options:{
      //       enforce:'pre'
      //     }
      //   }
      // },
      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                // "@babel/plugin-proposal-decorators",
                // "@babel/plugin-proposal-class-properties",
                // "@babel/plugin-transform-runtime"
                ["@babel/plugin-proposal-decorators", { legacy: true }],
                ["@babel/plugin-proposal-class-properties", { loose: true }],
                // ["@babel/plugin-transform-runtime"]
              ],
            },
          },
        ],
        exclude: /node_modules/,
        // includes: path.resolve(__dirname, "src"),
      },
      // {
      //   test: /\.less$/,
      //   use: "Happypack/loader?id=css",
      // },
      {
        test:/\.less$/,
        use:[{
          loader:'style-loader'
        },'css-loader','postcss-loader','less-loader']
      }
    ],
  },
};

// 优化
// npParse 不解析某个库中的依赖
// wepback.IgnorePlugin  // 忽略包中的依赖
// exclude include
// DllPlugin 先将一些库（如react）打包好，直接引入
// happypack 多线程打包
// 自带的tree-shaking   作用域提升，可以将已知变量直接计算
// split chunk 抽离公共代码
// 懒加载
// 热跟新
