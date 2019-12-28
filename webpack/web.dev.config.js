const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  devtool: "cheap-module-eval-source-map",
  devServer: {
    compress: true,
    contentBase: path.join(__dirname, "../build/"),
    historyApiFallback: true,
    hot: true,
    port: 9000,
  },
  entry: {
    main: path.resolve(__dirname, "../web/index.tsx"),
  },
  mode: "development",
  module: {
    rules: [
      {
        exclude: [path.resolve(__dirname, "../node_modules/")],
        test: /\.(ts|js)x?$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
            },
          },
        ],
      },
      {
        include: [path.resolve(__dirname, "../web/")],
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
            },
          },
          {
            loader: "postcss-loader",
          },
          {
            loader: "sass-loader",
          },
        ],
      },
    ],
  },
  output: {
    chunkFilename: "[name].js",
    filename: "[name].js",
    path: path.resolve(__dirname, "../build/"),
    publicPath: "/",
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Wishlist",
      template: path.resolve(__dirname, "../web/index.html"),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development"),
    }),
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  target: "web",
};
