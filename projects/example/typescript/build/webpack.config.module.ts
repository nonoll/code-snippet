import * as webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { isDevMode, relativePath, nameByENV } from './common';
import { ENV } from './types';

const typescript = (_: boolean): webpack.RuleSetRule => {
  return {
    test: /\.tsx?$/,
    loader: 'awesome-typescript-loader',
    exclude: /node_modules/,
    options: {
      transpileOnly: true,
      happyPackMode: true
    }
  };
};

const scss = (IS_DEV_MODE: boolean): webpack.RuleSetRule => {
  return {
    test: /\.s[ac]ss$/i,
    use: [
      IS_DEV_MODE
      ? 'style-loader'
      : {
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath: relativePath('..'),
          hmr: IS_DEV_MODE,
        },
      },
      'css-loader',
      'sass-loader'
    ],
    exclude: /node_modules/
  };
};

const images = (IS_DEV_MODE: boolean, limit: number = 10): webpack.RuleSetRule => {
  return {
    test: /\.(png|svg|jpe?g|gif)$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          outputPath: 'images/',
          name: nameByENV(IS_DEV_MODE),
          limit: 1000 * limit // 10KB
        }
      }
    ]
  };
};

const fonts = (IS_DEV_MODE: boolean): webpack.RuleSetRule => {
  return {
    test: /\.(woff|woff2|eot|ttf|otf)$/,
    use: [
      {
        loader: 'file-loader',
        options: {
          outputPath: 'fonts/',
          name: nameByENV(IS_DEV_MODE),
        }
      }
    ]
  };
};

export const webpackConfigModules = (_: ENV, args: webpack.CliConfigOptions): webpack.Module => {
  const IS_DEV_MODE = isDevMode(args);

  return {
    rules: [
      typescript(IS_DEV_MODE),
      scss(IS_DEV_MODE),
      images(IS_DEV_MODE, 10),
      fonts(IS_DEV_MODE)
    ]
  };
};
