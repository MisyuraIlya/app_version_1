const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const autoprefixer = require("autoprefixer");

module.exports = {
	entry: ["@babel/polyfill", "./src/js/index.js"],
	module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
				use: [{
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                        babelrc: true
                    }
                }],
                exclude: /node_modules[\/\\](?!(swiper|dom7)[\/\\])/
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            },
			{
                test: /\.scss$/,
                use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader',
					{
						loader: 'postcss-loader',
						options: {
							plugins: () => [autoprefixer({ browsers: ['last 2 versions', 'iOS >= 8', 'Safari >= 8', 'Firefox >= 14', 'Opera >= 10',] })]
						}
					}
				]
			},
            {
                test: /\.css$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "sass-loader",
                    options: {
                        includePaths: ["absolute/path/a", "absolute/path/b"]
                    }
                }]
			},
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
			{
				test: /\.(png|jpg|gif)$/i,
				use: [
				  {
					loader: 'url-loader',
					options: {
					  limit: 8192
					}
				  }
				]
			  }
        ]
    },
	optimization: {
		minimizer: [
			new UglifyJsPlugin(),
			new OptimizeCSSAssetsPlugin({})
		]
	},
	resolve: {
        extensions: ['*', '.js', '.jsx']
    },
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery'
		}),
		new MiniCssExtractPlugin({
			filename: 'main.css'
		}),
		new UglifyJsPlugin({
			uglifyOptions:{
				output: {
					comments: false,
				},
				compress: {
					unused: true,
					dead_code: true,
					warnings: false,
					drop_debugger: true,
					conditionals: true,
					evaluate: true,
					drop_console: true,
					sequences: true,
					booleans: true,
				}
			},
		})
	],
	output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    }
};
