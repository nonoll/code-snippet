import { gcd } from './gcd';

/**
 * 최소 공배수(least common multiple) 반환
 * @memberof module:math
 * @function
 * @param {Number} a
 * @param {Number} b
 * @returns {Number}
 */
export const lcm = (a: number, b: number): number => {
  return a * b / gcd(a, b);
};
