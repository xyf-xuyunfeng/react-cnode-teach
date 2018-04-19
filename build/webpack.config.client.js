const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const HTMLPlugin = require('html-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

const config = webpackMerge(baseConfig, {
	entry: {
		app: path.join(__dirname, '../client/app.js')
	},
	output: {
		filename: '[name].[hash].js',
		path: path.join(__dirname, '../dist'),
		publicPath: '/public/'
	},
	plugins: [
		new HTMLPlugin({
			template: path.join(__dirname, '../client/template.html')
		})
	]
});


if (isDev) {
	config.entry = {
		app: [
			'react-hot-loader/patch',
			path.join(__dirname, '../client/app.js')
		]
	};
	config.devServer = {
		host: '0.0.0.0',
		port: '8888',
		contentBase: path.join(__dirname, '../dist'),
		overlay: {
			errors: true // 在页面显示错误 只显示错误信息
		},
		hot: true,
		publicPath: '/public/', // 要与output的publicPath对应
		historyApiFallback: {  // 所有请求不到的页面（404）都返回这个页面
			index: '/public/index.html'
		}
	};
	config.plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = config;
