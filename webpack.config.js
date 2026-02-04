import path from 'path';
import { fileURLToPath } from 'url';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const src_dir = 'src';
const dest_dir = 'dist';
const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

console.log('Is Dev-', isDev, '; Is Prod-', isProd);

const filename = (ext) => isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`;
const jsLoader = () => {
    const loaders = [
        {
            loader: "babel-loader",
            options: {
                presets: ['@babel/preset-env']
            }
        }
    ]
    return loaders;
}

export default {
    context: path.resolve(__dirname, src_dir),
    mode: 'development',
    entry: './index.js',
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, dest_dir),
    },
    resolve: {
        extensions: ['.js', '.css'],
        alias: {
            '@': path.resolve(__dirname, src_dir),
            '@core': path.resolve(__dirname, src_dir + '/core'),
        }
    },
    devtool: isDev ? 'eval-source-map' : false,
    devServer: {
        port: 3000,
        // open: true,
        hot: isDev,
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: 'index.html',
            minify: {
                collapseWhitespace: isProd,
                removeComments: isProd,
            }
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, src_dir + '/favicon.ico'),
                    to: path.resolve(__dirname, dest_dir)
                }
            ],
        }),
        new MiniCssExtractPlugin({
            filename: filename('css'),
        }),
        new ESLintPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: jsLoader()
            },
        ],

    }
}