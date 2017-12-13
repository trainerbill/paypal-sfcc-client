const webpack = require('webpack');
const path = require('path');

/*
 * We've enabled UglifyJSPlugin for you! This minifies your app
 * in order to load faster and run less javascript.
 *
 * https://github.com/webpack-contrib/uglifyjs-webpack-plugin
 *
 */

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

/*
 * We've enabled ExtractTextPlugin for you. This allows your app to
 * use css modules that will be moved into a separate CSS file instead of inside
 * one of your module entries!
 *
 * https://github.com/webpack-contrib/extract-text-webpack-plugin
 *
 */

const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	devtool: 'inline-source-map',
	entry: './src/index.ts',
	externals : {
		paypal: 'paypal'
	},
	output: {
		chunkFilename: "[name].bundle.js",
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: "//rawgit.com/trainerbill/paypal-sfcc-client/master/dist/",
		libraryTarget: "umd",
		library: "SFCCPayPal"
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/
			},
			{
				test: /\.css$/,

				use: ExtractTextPlugin.extract({
					use: [
						{
							loader: 'css-loader',
							options: {
								sourceMap: true
							}
						}
					],
					fallback: 'style-loader'
				})
			}
		]
	},

	plugins: [
		// new UglifyJSPlugin(),
		new ExtractTextPlugin('style.css'),
		new webpack.ProvidePlugin({
			Promise: 'es6-promise-promise',
		})],
	resolve: {
		extensions: ['.ts', '.js', '.json']
	}
};
