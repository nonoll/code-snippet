/**
 * browser - IOS 유무 반환
 * @memberof module:browser
 * @function
 * @return {Boolean}
 * @example
import { isIOS } from '@nonoll/code-snippet/browser';
console.log(isIOS()); // true or false
 */
export const isIOS = (): boolean => {
  return /iP[honeaod;]/.test(window.navigator.userAgent);
};
