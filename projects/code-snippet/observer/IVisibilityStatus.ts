/**
 * Visibility Status 반환 규격
 * @memberof VisibilityChangeObserver
 * @alias IVisibilityStatus
 * @interface
 * @property {Boolean} hidden - hidden 상태 유무
 * @property {Boolean} show - show 상태 유무
 * @see VisibilityChangeObserver#getStatus
 */
export interface IVisibilityStatus {
  isHidden: boolean;
  isShow: boolean;
}
