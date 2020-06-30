/**
 * ratio 파라미터 규격
 * @alias IRatioParams
 * @interface
 * @property {Number} width
 * @property {Number} height
 */
export interface IRatioParams {
  width: number;
  height: number;
};

/**
 * ratio 반환 규격
 * @alias IRatio
 * @interface
 * @extends IRatioParams
 * @property {Number} width
 * @property {Number} height
 * @property {String} ratio - 비율 정보
 */
export interface IRatio extends IRatioParams {
  ratio: string;
};
