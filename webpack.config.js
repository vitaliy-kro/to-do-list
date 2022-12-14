const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  entry: path.resolve(__dirname, "./src/index.js"),
  output: { path: path.resolve(__dirname, "./dist"), filename: "main.js" },

  mode: "development",
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, "/dist"),
    },
    open: true,
    compress: true,
    hot: true,
    port: 7777,
  },
  stats: {
    errorDetails: true,
    children: true,
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, "./src/index.html"),
      filename: "index.html",
    }),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin({
      publicPath: "/to-do-list/",
    }),
  ],

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|gif)$/,
        type: "asset/resource",
      },
    ],
  },
};
