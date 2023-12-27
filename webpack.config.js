const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env) => {
  const isDevMode = env.mode === "development";
  const devServer= {
    watchFiles: 'index.html',
    hot: true
  }

  return {
    mode: isDevMode ? "development" : "production",
    devtool: isDevMode ? 'source-map' : "inline-source-map",
    resolve: {
      extensions: [".js"],
    },
    entry: "./src/js/index",
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
        {
          test: /\.jpeg$/,
          type:'asset/inline'
        }
      ],
    },
    output: {
      filename: "bundle.[chunkhash].js",
      path: path.resolve(__dirname, "./dist"),
      assetModuleFilename: 'images/[hash][ext][query]',
      clean: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "index.html",
        inject: "body",
        favicon: "./favicon.png"
      }),
      new MiniCssExtractPlugin({ filename: "style.css" }),
    ],
    optimization: {
      minimizer: [
        new TerserPlugin(),
        new CssMinimizerPlugin()
      ]
    },
    ...isDevMode ? {devServer}: {}
  }
}
