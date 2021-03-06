import { IVendorPrefix } from './types';

/**
 * browser - vendorPrefix 반환
 * @memberof module:browser
 * @see https://davidwalsh.name/vendor-prefix
 * @function
 * @return {IVendorPrefix}
 * @example
import { vendorPrefix } from '@nonoll/code-snippet/browser';
console.log(vendorPrefix()); // {dom: "Webkit", lowercase: "webkit", css: "-webkit-", js: "Webkit"}
 */
export const vendorPrefix = (): IVendorPrefix => {
  const styles = window.getComputedStyle(window.document.documentElement, '');
  // tslint:disable-next-line: max-line-length
  const pre = (Array.from(styles).join('').match(/-(moz|webkit|ms)-/) || /* istanbul ignore next */ ((styles as any).OLink === '' && ['', 'o']))[1];
  const dom = ('Webkit|Moz|MS|O').match(new RegExp(`(${pre})`, 'i'))[1];
  return {
    dom,
    lowercase: pre,
    css: `-${pre}-`,
    js: pre[0].toUpperCase() + pre.substr(1)
  };
};
