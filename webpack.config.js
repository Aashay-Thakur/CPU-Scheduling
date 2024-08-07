import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import TerserPlugin from "terser-webpack-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";

export default {
	mode: "production",
	entry: {
		main: "./scripts/main.js",
		processAndDisk: ["./scripts/disk.js", "./scripts/process.js"],
		login: "./scripts/login.js",
	},
	output: {
		filename: "[name].bundle.js",
		path: path.resolve(process.cwd(), "dist"),
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
			favicon: "./public/favicon.png",
			chunks: ["main", "processAndDisk"],
		}),
		new HtmlWebpackPlugin({
			template: "./login.html",
			filename: "login.html",
			favicon: "./public/favicon.png",
			chunks: ["main", "login"],
		}),
		new MiniCssExtractPlugin({
			filename: "[name].css",
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
		usedExports: true,
	},
	devServer: {
		historyApiFallback: true, // Add this line to support History API
	},
};
