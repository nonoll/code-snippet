export type ENV = string | Record<string, string | number | boolean>;
export interface IPackageJson {
  name?: string;
  version?: string;
  description?: string;
  [key: string]: any;
};
