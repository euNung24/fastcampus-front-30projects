const path = require('path');
const TerserWebpackPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CSSMinimizerPlugin = require('css-minimizer-webpack-plugin');
module.exports = (env) => {
    const isDevMode = env.mode === 'development';
    const devServer = {
        static: { directory: path.join(__dirname, "dist") },
        watchFiles: './index.html',
    };

    return {
        mode: isDevMode ? "development" : "production",
        devtool: isDevMode ? "inline-source-map" : "source-map",
        resolve: {
            extensions: [".tsx",".ts", ".jsx", ".js"]
        },
        entry: "./src/js/index",
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        MiniCssExtractPlugin.loader, 'css-loader'
                    ]
                }
            ]
        },
        output: {
            filename: "bundle.[chunkhash].js",
            path: path.resolve(__dirname, './dist'),
            // publicPath: "/",
            clean: true
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "./index.html",
                inject: 'body',
                favicon: "./favicon.png"
            }),
            new MiniCssExtractPlugin({
                filename: "./style.css"
            })
        ],
        optimization: {
            minimizer: [
                new TerserWebpackPlugin(),
                new CSSMinimizerPlugin()
            ]
        },
        ...isDevMode ? {devServer} : {}
    }

}
