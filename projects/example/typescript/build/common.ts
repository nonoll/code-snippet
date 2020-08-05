import * as webpack from 'webpack';
import * as path from 'path';

export const isDevMode = (args: webpack.CliConfigOptions) => args.mode === 'development';
export const PROJECT_PATH = path.dirname('../');
export const resolvePath = (relPath: string): string => path.resolve(PROJECT_PATH, relPath);
export const relativePath = (relPath: string): string => path.relative(PROJECT_PATH, relPath);
export const joinPath = (relPath: string): string => path.join(PROJECT_PATH, relPath);
export const nameByENV = (IS_DEV_MODE: boolean, ext: string = '.[ext]') => {
  return IS_DEV_MODE ? `[name]${ext}` : `[name].[hash]${ext}`;
};
