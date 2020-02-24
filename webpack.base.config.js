const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const title = require('./package').title;

module.exports = {
	entry: [
    'react-hot-loader/patch',
    "./src/index.tsx"
  ],
	output: {
		path: path.resolve(__dirname, './public/'),
		filename: "bundle.js",
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js"],
		alias: {
			Components: path.resolve(__dirname, 'src/components/'),
			Pages: path.resolve(__dirname, 'src/pages/'),
			Store: path.resolve(__dirname, 'src/store/'),
			Styles: path.resolve(__dirname, 'src/styles/'),
			Types: path.resolve(__dirname, 'src/types/'),
		},
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: "awesome-typescript-loader",
				exclude: /node_modules/

			},
			{
				test: /\.js$/,
				loader: "source-map-loader",
				enforce: "pre",
				exclude: /node_modules/
			},
			{
				test: /\.s?css$/,
				use: ['style-loader', 'css-loader', 'sass-loader'],
				exclude: /node_modules/
			},
			{
				test: /\.(gif|png|jpe?g|svg)$/,
				use: [
						'file-loader',
						{
								loader: 'image-webpack-loader',
								options: {
										bypassOnDebug: true
								}
						}
				]
			},
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.ejs',
			templateParameters: (compilation, assets, assetTags, options) => {
					return {
							compilation,
							webpackConfig: compilation.options,
							htmlWebpackPlugin: {
									tags: assetTags,
									files: assets,
									options
							},
							'title': title || null
					};
			},
	}),
	],
};