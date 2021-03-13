const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: "./src/index.html",
    filename: "./index.html",
    minify: false
  });

const miniCssExtractPlugin = new MiniCssExtractPlugin({
  filename: 'style/style.css',
})

module.exports = {

    mode: 'development',

    entry: './src/ts/index.ts',

    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js'
    },
    
    devServer: {
        historyApiFallback: true,
        port: 8000,
        open: true
    },

    devtool: 'inline-source-map',
  
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: 'ts-loader',
        },

        {
            test: /\.(sa|sc|c)ss$/,
            use: [
                MiniCssExtractPlugin.loader,
                {
                  loader: 'css-loader',
                  options: {
                    url: true
                }
                },
                {
                  loader: 'sass-loader'
                }
            ]
        },

        {
          test:/\.(jpe?g|png|gif|svg|ico|jpeg)$/,
          use: [
            {
                loader: 'file-loader',
                options: {
                    name: './images/[name].[ext]',
                }
            }
        ]
        }
      ],
    },

    resolve: {
      extensions: [
        '.ts', '.js',
      ],
    },

    plugins: [
        htmlWebpackPlugin,
        miniCssExtractPlugin
    ]

  };