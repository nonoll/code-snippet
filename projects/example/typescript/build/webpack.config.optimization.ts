import * as webpack from 'webpack';
import { isDevMode } from './common';
import { ENV } from './types';

export const webpackConfigOptimization = (_: ENV, args: webpack.CliConfigOptions): webpack.Options.Optimization => {
  const IS_DEV_MODE = isDevMode(args);

  return {
    minimize: !IS_DEV_MODE,
    splitChunks: {},
    concatenateModules: true
  };
}
