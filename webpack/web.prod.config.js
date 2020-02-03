const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const cssnano = require("cssnano");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const LoadablePlugin = require("@loadable/webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  devtool: undefined,
  entry: {
    main: path.resolve(__dirname, "../web/index.tsx"),
  },
  mode: "production",
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
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: {
                mode: "local",
                localIdentName: "[hash:base64]",
                context: path.resolve(__dirname, "../web"),
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
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: false,
      }),
      new OptimizeCSSAssetsPlugin({
        canPrint: false,
        cssProcessor: cssnano,
        cssProcessorOptions: {
          preset: [
            "default",
            {
              discardComments: {
                removeAll: true,
              },
            },
          ],
        },
      }),
    ],
    moduleIds: "hashed",
    chunkIds: "named",
    runtimeChunk: {
      name: "runtime",
    },
    splitChunks: {
      cacheGroups: {
        styles: {
          enforce: true,
          reuseExistingChunk: true,
          test: /\.css$/,
        },
        jsons: {
          enforce: true,
          reuseExistingChunk: true,
          test: /\.json$/,
        },
        vendors: {
          enforce: true,
          reuseExistingChunk: true,
          test: /[\\/]node_modules[\\/]/,
        },
      },
      chunks: "all",
    },
  },
  output: {
    chunkFilename: "[name]-[contenthash:10].js",
    filename: "[name]-[contenthash:10].js",
    path: path.resolve(__dirname, "../build"),
    publicPath: "/",
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      chunkFilename: "[name]-[contenthash:10].min.css",
      filename: "[name]-[contenthash:10].min.css",
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
      "process.env.BROWSER": true,
      "process.env.LITE": !!process.env.LITE,
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, "../web/images/"),
        to: path.resolve(__dirname, "../build"),
      },
      {
        from: path.resolve(__dirname, "../web/icons/"),
        to: path.resolve(__dirname, "../build/"),
      },
      {
        from: path.resolve(__dirname, "../web/app-manifest.json"),
        to: path.resolve(__dirname, "../build/"),
      },
      {
        from: path.resolve(__dirname, "../web/robots.txt"),
        to: path.resolve(__dirname, "../build/"),
      },
    ]),
    new LoadablePlugin(),
    ...(process.env.WBA ? [new BundleAnalyzerPlugin()] : []),
    new ManifestPlugin(),
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  target: "web",
};
