let path = require('path'),
    HTMLWebpackPlugin = require('html-webpack-plugin'),
    { CleanWebpackPlugin } = require('clean-webpack-plugin'),
    SASSWebpackPlugin = require('sass-webpack-plugin');

module.exports = {
    entry: {
        main: path.resolve('src', 'index.js'),
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
        ],
    },
}