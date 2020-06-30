import { IRatioParams, IRatio } from './types';

/**
 * width : height 로 css padding-top 비율(%) 반환<br/>
 * css padding에 의한 비율 계산이 필요할 경우 사용
 * @memberof module:math
 * @function
 * @param {Number} width
 * @param {Number} height
 * @returns {IRatio}
 */
export const sizePercentRatio = ({ width, height }: IRatioParams): IRatio => {
  const w = Math.round(width);
  const h = Math.round(height);
  const ratio = {
    width: w,
    height: h,
    ratio: ((height / width) * 100).toFixed(2)
  };
  return ratio;
};
