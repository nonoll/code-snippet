import * as path from 'path';
import * as webpack from 'webpack';
import {
  webpackConfigModules,
  webpackConfigDevServer,
  webpackConfigPlugins,
  webpackConfigOptimization
} from './build';

const PACKAGE_JSON = require('./package.json');

const config: webpack.ConfigurationFactory = (_, args) => {
  const { mode } = args;
  const IS_DEV_MODE = mode === 'development';

  return {
    mode,
    entry: {
      vendor: './src/vendor.ts',
      polyfills: './src/polyfills.ts',
      bundle: './src/index.ts'
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '~': path.resolve(__dirname, 'src/assets')
      }
    },
    output: {
      filename: IS_DEV_MODE ? 'js/[name].js' : 'js/[name].[hash].js',
      path: path.resolve(__dirname, 'dist'),
    },
    module: webpackConfigModules(_, args),
    devServer: webpackConfigDevServer(_, args),
    plugins: webpackConfigPlugins(_, args, PACKAGE_JSON),
    optimization: webpackConfigOptimization(_, args)
  };
};

export default config;
