const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
	mode: "production",
	entry: {
		main: ["./scripts/main.js", "./scripts/disk.js", "./scripts/process.js"],
	},
	output: {
		filename: "[name].bundle.js",
		path: path.resolve(__dirname, "dist"),
		clean: true,
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
				},
			},
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, "css-loader"],
			},
			{
				test: /\.scss$/,
				use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
			},
		],
	},
	resolve: {
		extensions: [".js", ".scss"],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./index.html",
			favicon: "./public/favicon.png", // Add this line to include the favicon in the HTML
		}),
		new MiniCssExtractPlugin({
			filename: "styles.css",
		}),
		new CopyWebpackPlugin({
			patterns: [
				{ from: "public", to: "" }, // Copy all files from public folder to the output directory
			],
		}),
	],
	devtool: "source-map",
	optimization: {
		minimize: true,
		minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
	},
};
