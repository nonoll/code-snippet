/**
 * browser ios 유무 반환
 * @memberof module:browser
 * @example
 * import { isAOS } from 'fe-code-snippet/browser';
 * console.log(isAOS);
 * @returns boolean
 */
export const isAOS = (): boolean => {
  return /Android/.test(window.navigator.userAgent);
};

