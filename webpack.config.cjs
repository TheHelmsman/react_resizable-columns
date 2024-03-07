const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const isProduction = process.env.NODE_ENV === "production";

const config = {
  entry: {
    // indexStyle: './src/index.css',
    index: "./src/index.tsx",
  },
  devtool: "inline-source-map",
  devServer: {
    static: "./dist",
    port: 3000,
    historyApiFallback: true,
    hot: true,
    compress: true,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      title: "Development",
      template: "./dist/index.html",
    }),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    modules: [path.resolve(__dirname, "src"), "node_modules"],
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "auto",
    clean: true,
  },
  optimization: {
    runtimeChunk: "single",
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
