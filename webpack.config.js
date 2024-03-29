const path = require('path'),
    HTMLWebpackPlugin = require('html-webpack-plugin'),
    { CleanWebpackPlugin } = require('clean-webpack-plugin'),
    SASSWebpackPlugin = require('sass-webpack-plugin'),
    webpack = require('webpack');

module.exports = {
    entry: {
        main: path.resolve(__dirname, 'src', 'index.js'),
        uikit: path.resolve(__dirname, 'src', 'uikit', 'index.js'),
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        contentBase: './dist',
        open: 'opera',
        openPage: 'uikit/',
        hot: true,
        compress: true,
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    resolve: {
        alias: {
            Images: path.resolve(__dirname, 'src', 'images'),
        },
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            filename: 'uikit/index.html',
            template: 'src/uikit/index.pug',
        }),
        new HTMLWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.pug',
        }),
        new SASSWebpackPlugin({
            'src/uikit/index.scss': 'uikit/index.css',
            'src/index.scss': 'index.css',
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            jquery: 'jquery',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(scss|sass)$/,
                use: [
                    'css-loader',
                    'sass-loader',
                    'style-loader',
                ],
            },
            {
                test: /\.(png|svg|jp?eg|gif)$/i,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: './img',
                },
            },
            {
                test: /\.(ttf|woff|woff|eot|otf)$/i,
                use: [
                    'file-loader',
                ],
            },
            {
                test: /\.pug$/i,
                use: [
                    'pug-loader',
                ],
            },
        ],
    },
}