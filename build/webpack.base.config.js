const path = require('path');
const {getPageGenerate, assetsPath} = require('./utils.js');
const pagesGenerate = getPageGenerate();
const CopyWebpackPlugin = require('copy-webpack-plugin');

function resove(dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = {
  resolve: {
    alias: {
      '@': resove('src')
    }
  },
  entry: pagesGenerate.entry,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,        //排除 node_modules 下的js
        loader: "babel-loader",        //webpack 和 babel 之间的桥梁
        options:{
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          //字体文件小于1000字节的时候处理方式
          limit: 10000,
          name: assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      // {
      //     test: /\.(htm|html)$/i,
      //     loader: 'html-withimg-loader'
      // },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('media/[name].[hash:7].[ext]')
        }
      },
    
    ]
  },
  plugins: [
    
    new CopyWebpackPlugin([
      {
        // 定义要拷贝的源目录
        from: resove('./static'),
        // 定义要拷贝到的目标目录
        to: resove('./dist/static'),
        // 忽略拷贝指定的文件
        ignore: ['.*']
        // flatten 只拷贝文件不管文件夹      默认是false
        // toType  file 或者 dir         可选，默认是文件
      }
    ])
  ]
  
}