/**
 * browser - CHROME 유무 반환
 * @memberof module:browser
 * @function
 * @return {Boolean}
 * @example
import { isCHROME } from '@nonoll/code-snippet/browser';
console.log(isCHROME()); // true or false
 */
export const isCHROME = (): boolean => {
  return (/chrome|crios/i).test(window.navigator.userAgent);
};
