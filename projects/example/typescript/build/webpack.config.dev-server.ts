import * as webpack from 'webpack';
import * as WebpackDevServer from 'webpack-dev-server';
import { joinPath } from './common';
import { ENV } from './types';

export const webpackConfigDevServer = (_: ENV, __: webpack.CliConfigOptions): WebpackDevServer.Configuration => {
  return {
    contentBase: [
      joinPath('public')
    ],
    quiet: true,
    clientLogLevel: 'silent',
    host: 'localhost',
    overlay: true,
    compress: true,
    watchContentBase: true,
    https: false,
    port: 8080
  };
};
