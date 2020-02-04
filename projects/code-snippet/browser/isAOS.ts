/**
 * browser - AOS 유무 반환
 * @memberof module:browser
 * @function
 * @return {Boolean}
 * @example
import { isAOS } from '@nonoll/code-snippet/browser';
console.log(isAOS()); // true or false
 */
export const isAOS = (): boolean => {
  return /Android/.test(window.navigator.userAgent);
};
