import * as webpack from 'webpack';
import { CheckerPlugin } from 'awesome-typescript-loader';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { isDevMode, resolvePath, nameByENV } from './common';
import { ENV, IPackageJson } from './types';

export const webpackConfigPlugins = (_: ENV, args: webpack.CliConfigOptions, packageJson: IPackageJson): webpack.Plugin[] => {
  const IS_DEV_MODE = isDevMode(args);

  return [
    new CheckerPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: resolvePath('public/static'),
          to: resolvePath('dist/static')
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: `css/${nameByENV(IS_DEV_MODE, '.css')}`
    }),
    new HtmlWebpackPlugin({
      title: packageJson.name,
      template: resolvePath('public/index.html'),
      filename: 'index.html',
      chunks: [
        'vendor',
        'polyfills',
        'bundle'
      ]
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: IS_DEV_MODE ? 'server' : 'static',
      analyzerHost: 'localhost',
      analyzerPort: 'auto',
      reportFilename: 'BundleAnalyzerReport.html',
      openAnalyzer: IS_DEV_MODE,
      excludeAssets: ['node_modules'],
      statsOptions: {
        exclude: /node_modules/
      }
    })
  ];
}
