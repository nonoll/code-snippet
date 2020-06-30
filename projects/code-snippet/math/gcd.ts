/**
 * 최대 공약수(greatest common divisor) 반환
 * @memberof module:math
 * @function
 * @param {Number} a
 * @param {Number} b
 * @returns {Number}
 */
export const gcd = (a: number, b: number): number => {
  if (!b) {
    return a;
  }
  return gcd(b, a % b);
};
