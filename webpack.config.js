const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const path = require('path');

/**
 * @typedef {Object} PageStruct
 * @property {'home-page' | 'retail-audit'} folder
 * @property {string} file
 * @property {Array<string>} chunks
 */

/**
 * @param {PageStruct} data
 */
const generateHtmlPlugin = ({folder, file, chunks}) => {
    return new HtmlWebpackPlugin({
        chunks,
        title: folder,
        minify: {
            collapseWhitespace: true,
            removeComments: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            useShortDoctype: true
        },
        inject: true,
        filename: file,
        template: `pages/${folder}/${file}`,
    });
}

/**
 * @param {Array<PageStruct>} pagesArray
 * @return {Array<HtmlWebpackPlugin>}
 */
const populateHtmlPlugins = (pagesArray) => {
    return pagesArray.map(page => generateHtmlPlugin(page))
}

const chunkNames = {
    root: 'root',
    retail: 'retail',
    home: 'home',
    regions: 'regions',
    about: 'about',
    contact: 'contact'
};

const pages = populateHtmlPlugins([
    {
        folder: 'home-page',
        file: 'index.html',
        chunks: [chunkNames.root, chunkNames.home]
    },
    {
        folder: 'retail-audit',
        file: 'retail-audit.html',
        chunks: [chunkNames.root, chunkNames.retail]
    },
    {
        folder: 'micro-regions',
        file: 'micro-regions.html',
        chunks: [chunkNames.root, chunkNames.regions]
    },
    {
        folder: 'about-us',
        file: 'about-us.html',
        chunks: [chunkNames.root, chunkNames.about]
    },
    {
        folder: 'contact-us',
        file: 'contact-us.html',
        chunks: [chunkNames.root, chunkNames.contact]
    }
]);


module.exports = {
    resolve: {
        alias: {
            '@assets': path.resolve(__dirname, 'assets'),
            '@pages': path.resolve(__dirname, 'pages')
        }
    },
    optimization: {
        minimizer: [
            new TerserJSPlugin({}),
            new CssMinimizerPlugin(),
        ],
    },
    entry: {
        [chunkNames.root]: path.resolve(__dirname, 'index.js'),
        [chunkNames.home]: path.resolve(__dirname, 'pages/home-page/home-page.js'),
        [chunkNames.retail]: path.resolve(__dirname, 'pages/retail-audit/retail-audit.js'),
        [chunkNames.regions]: path.resolve(__dirname, 'pages/micro-regions/micro-regions.js'),
        [chunkNames.about]: path.resolve(__dirname, 'pages/about-us/about-us.js'),
        [chunkNames.contact]: path.resolve(__dirname, 'pages/contact-us/contact-us.js'),
    },
    output: {
        chunkFilename: '[name].js',
        path: path.resolve(__dirname, 'public')
    },
    devServer: {
        overlay: true,
        watchContentBase: true,
        hot: true,
        host: 'localhost',
        port: 755
    },
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    sources: {
                        list: [
                            {
                                tag: 'img',
                                attribute: 'data-src',
                                type: 'src',
                            },
                            {
                                tag: 'img',
                                attribute: 'data-srcset',
                                type: 'srcset',
                            },
                            {
                                tag: 'img',
                                attribute: 'src',
                                type: 'src'
                            },
                            {
                                tag: 'source',
                                attribute: 'src',
                                type: 'src'
                            },
                            {
                                tag: 'video',
                                attribute: 'data-src',
                                type: 'src'
                            },
                            {
                                tag: 'link',
                                attribute: 'href',
                                type: 'src'
                            }
                        ],
                    },
                    esModule: true,
                },
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                config: path.resolve(__dirname, 'postcss.config.js'),
                            }
                        }
                    },
                    "sass-loader"
                ],
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                type: 'asset/resource'
            },
            {
                test: /\.mp4$/i,
                type: 'asset/resource'
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                type: 'asset/resource'
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
        ...pages
    ],
};
