var fs = require('fs')
var path = require('patch')

var webpack = require('webpack')
var extractTextPlugin = require('extract-text-webpack-plugin')  // 独立打包样式文件

var ROOT = process.cwd()
var srcDir = path.resolve(ROOT, 'src')
var distDir = path.resolve(ROOT, 'dist')

// 创建入口文件集合对象
function makeEntry() {
  return [
    'src/index.js'
  ]
}

module.exports = {
  entry: makeEntry(),
  output: {
    path: distDir,
    filename: '[name].js'
  },
  externals: {
    'jquery': 'jQuery'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url',
        query: {
          limit: 8192
        }
      }
    ],
    noParse: [
      // 不希望webpack处理的模块的正则表达式
    ]
  },
  resolve: {
    root: srcDir,  //绝对路径
    extensions: ['', '.js', '.json', '.scss'],
    alias: {
      // 模块映射表
    }
  },

  // babel使用的插件
  babel: {
    presets: ['es2015'],
    plugins: ['transform-runtime']
  },

  // webpack插件
  plugins: [
    // 抽取公共模块
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'js/common.js',
      minChunks: 2,  // 至少被2个以上的模块引用才会被抽取为公共模块,
      chunks: makeEntry()
    }),

    // 单独提取样式文件
    new extractTextPlugin('[name].css')
  ]
}