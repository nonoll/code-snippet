import { IRatioParams, IRatio } from './types';
import { gcd } from './gcd';

/**
 * width : height 비율 반환
 * @memberof module:math
 * @function
 * @param {Number} width
 * @param {Number} height
 * @returns {IRatio}
 */
export const sizeRatio = ({ width, height }: IRatioParams): IRatio => {
  const gcdValue = gcd(width, height);
  const w = width / gcdValue;
  const h = height / gcdValue;
  const ratio = {
    width: w,
    height: h,
    ratio: `${w}x${h}`
  };
  return ratio;
};
