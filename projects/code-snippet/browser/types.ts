/**
 * @typedef {String} BROWSER_AGENTS
 * @alias BROWSER_AGENTS
 * @memberof module:browser
 * @property {String} AOS - user agent pattern
 * @property {String} IOS - user agent pattern
 */
// for jsdoc
/**
 * @export
 * @readonly
 * @enum {BROWSER_AGENTS}
 */
export enum BROWSER_AGENTS {
  AOS = 'Android(\\s)([0-9]+)?\\.?([0-9]+)\\.?([0-9]+)?',
  IOS = 'iP[honeaod;]+(\\sCPU)?\\sOS\\s(\\d+)\\_?(\\d)\\_?(\\d)?'
}

/**
 * @memberof module:browser
 * @alias IBrowserAgents
 * @interface
 * @property {String} AOS - aos
 * @property {String} IOS - ios
 */
export interface IBrowserAgents {
  AOS: string;
  IOS: string;
}

/**
 * @memberof module:browser
 * @alias IAgentType
 * @interface
 * @property {String | Null} type
 * @property {String} version
 */
export interface IAgentType {
  type: string | null;
  version: string;
}

/**
 * @memberof module:browser
 * @alias IBrowserType
 * @extends {IAgentType}
 * @interface
 * @property {String | Null} type
 * @property {String} version
 */
// tslint:disable-next-line: no-empty-interface
export interface IBrowserType extends IAgentType {}

/**
 * IVendorPrefix
 * @memberof module:browser
 * @typedef
 * @property - dom 기준, prefix
 * @property - 소문자로 반환
 * @property - css 기준, prefix
 * @property - js 기준, prefix
 */
export interface IVendorPrefix {
  dom: string;
  lowercase: string;
  css: string;
  js: string;
}
