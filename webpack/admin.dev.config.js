const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  devtool: "cheap-module-eval-source-map",
  devServer: {
    compress: true,
    contentBase: path.join(__dirname, "../build/"),
    historyApiFallback: true,
    hot: true,
    openPage: "admin/",
    port: 9000,
  },
  entry: {
    main: path.resolve(__dirname, "../admin/index.ts"),
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
        include: [path.resolve(__dirname, "../admin/")],
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: {
                mode: "local",
                localIdentName: "[name]__[local]___[hash:base64:5]",
                context: path.resolve(__dirname, "../admin"),
              },
            },
          },
          {
            loader: "postcss-loader",
          },
        ],
      },
    ],
  },
  output: {
    chunkFilename: "[name].js",
    filename: "[name].js",
    path: path.resolve(__dirname, "../build/"),
    publicPath: "/admin",
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Admin",
      template: path.resolve(__dirname, "../admin/index.html"),
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, "../admin/config.yml"),
        to: path.resolve(__dirname, "../build"),
      },
    ]),
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
