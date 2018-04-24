var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var WebpackCleanPlugin = require('webpack-clean');
var webpack=require('webpack');
var customPlugin=require('./assets/js/Helloworld.js');

//var CopyWebpackPlugin = require('copy-webpack-plugin');
function lessEntryMap(){
  var fs = require('fs');
  var entryMap = {};
  var fileList = [];
  fs.readdirSync('./assets/less/')
  .filter(file => {
      return file.match(/.*\.less$/);
  })
  .forEach(f => {
      fileList.push(f.replace(/\.less$/, '.js'))
      entryMap[f.replace(/\.less$/, '')] = ['./assets/less/' + f];
  });
  return {entryFiles:entryMap,deleteFiles:fileList};
}
var lessEntryMap1=lessEntryMap()
module.exports = {
 entry: Object.assign(lessEntryMap1.entryFiles, {
  bundle:  './assets/js/bundle.ts',
  global:  './assets/js/global.ts'
 }),
 output: {
   path: __dirname+'/build/',
   filename: "js/[name].js"
 },
 module: {
   rules: [
   {
      enforce: 'pre',
      test: /\.ts$/,
      exclude: /node_modules/,
      loader: 'tslint-loader',
      options:{
        emitErrors: true,
        failOnHint: true,
        typeCheck: true
      }
    },
    {
      test: /\.ts(x?)$/,
      exclude: /node_modules/,
      loader: 'ts-loader',
    },
    {
      test: /\.less$/,
      exclude: /node_modules/,
      use: ExtractTextPlugin.extract({use:['css-loader', 'less-loader']})
    },
    {
      test: /.*\.(gif|png|jpe?g)$/i,
      use: [{
          loader: 'file-loader',
          options: {
            name: 'images/[name].[ext]'
          }
        },
        {
          loader: 'image-webpack-loader',
          options: {
            name: '[name].[ext]',
            optipng: {
              optimizationLevel: 7
            },
            pngquant: {
              quality: '65-90'
            },
            mozjpeg: {
              quality: 65
            }
          }
        }]
      }]
 },
 plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: "commons",
      filename: "js/commons.js",
    }),
    new CleanWebpackPlugin(['build'], {root: __dirname}),
    new ExtractTextPlugin('/css/[name].css'),
   // new CopyWebpackPlugin([{ from: __dirname+'/build/*.png', to: __dirname+'/build/images/',flatten: true}]),
    new WebpackCleanPlugin(lessEntryMap1.deleteFiles,path.join(__dirname, 'build/js')),
    new customPlugin()
 ],
 resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: [".ts", ".tsx", ".js"]
  }
}