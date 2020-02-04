import { EventEmitter } from '../event';

const doc = window.document as any;

/**
 * 실행된 browser 기준으로, visibilityChange event 에 맞는 vendorPrefix 반환
 * @memberof VisibilityChangeObserver
 * @export
 * @returns {String}
 */
export function getVendorPrefix(): string {
  let prefix = '';

  if (typeof doc.hidden !== 'undefined') {
    prefix = '';
  } else if (typeof doc.msHidden !== 'undefined') {
    prefix = 'ms';
  } else if (typeof doc.webkitHidden !== 'undefined') {
    prefix = 'webkit';
  }

  return prefix;
}

/**
 * getVendorPrefix 의 값
 * @constant
 * @memberof VisibilityChangeObserver
 * @type {String}
 */
export const VENDOR_PREFIX = getVendorPrefix();

/**
 * browser 상의 visibilitychange event 명
 * @constant
 * @memberof VisibilityChangeObserver
 * @type {String}
 */
export const VISIBILITY_EVENT_NAME = `${VENDOR_PREFIX}visibilitychange`;

/**
 * browser 상의 visibility hidden 시점의 event 명
 * @constant
 * @memberof VisibilityChangeObserver
 * @type {String}
 */
export const HIDDEN_METHOD_NAME = VENDOR_PREFIX ? `${VENDOR_PREFIX}Hidden` : 'hidden';

/**
 * VisibilityChange Event Types
 * @event VisibilityChangeObserver#VISIBILITY_EVENTS
 * @memberof VisibilityChangeObserver
 * @property {String} CHANGE - 변경 시점
 * @property {String} GET_STATUS - 현재 상태값 체크
 */
// for jsdoc
/**
 * @export
 * @readonly
 * @enum {VISIBILITY_EVENTS}
 */
export enum VISIBILITY_EVENTS {
  CHANGE = 'VISIBILITY_CHANGE-EVENTS-CHANGE',
  GET_STATUS = 'VISIBILITY_CHANGE-EVENTS-GET_STATUS'
}

/**
 * browser 의 visibility 변화를 감지
 * @export
 * @class VisibilityChangeObserver
 * @alias observer/VisibilityChangeObserver
 * @extends {EventEmitter}
 */
export class VisibilityChangeObserver extends EventEmitter {
  constructor() {
    super();

    if (!VisibilityChangeObserver.isSupportVisibilityChange()) {
      throw new Error('VisibilityChange 지원되지 않는 브라우저입니다.');
    }

    this.onVisibilityChangeListener = this.onVisibilityChangeListener.bind(this);
  }

  /**
   * visibilitychange event 명 반환
   * @static
   * @returns {String}
   * @memberof VisibilityChangeObserver
   */
  static visibilityEventName(): string {
    return `${VENDOR_PREFIX}visibilitychange`;
  }

  /**
   * visibility hidden event 명 반환
   * @static
   * @returns {String}
   * @memberof VisibilityChangeObserver
   */
  static hiddenMethodName(): string {
    return VENDOR_PREFIX ? `${VENDOR_PREFIX}Hidden` : 'hidden';
  }

  /**
   * visibility change 지원 여부 반환
   * @static
   * @returns {boolean}
   * @memberof VisibilityChangeObserver
   */
  static isSupportVisibilityChange(): boolean {
    return typeof doc[VisibilityChangeObserver.hiddenMethodName()] !== 'undefined';
  }

  /**
   * @private
   * @memberof VisibilityChangeObserver
   */
  private onVisibilityChangeListener(): void {
    const isHidden = this.isHidden();
    this.emit(VISIBILITY_EVENTS.CHANGE, { isHidden, isShow: !isHidden });
  }

  /**
   * @private
   * @returns {Boolean}
   * @memberof VisibilityChangeObserver
   */
  private isHidden(): boolean {
    return doc[VisibilityChangeObserver.hiddenMethodName()];
  }

  /**
   * 현재 상태를 확인하는 메소드
   * @returns {VisibilityChangeObserver}
   * @memberof VisibilityChangeObserver
   * @fires VisibilityChangeObserver#VISIBILITY_EVENTS
   */
  public getStatus(): VisibilityChangeObserver {
    this.emit(VISIBILITY_EVENTS.GET_STATUS);

    return this;
  }

  /**
   * 이벤트 감지 설정
   * @returns {VisibilityChangeObserver}
   * @memberof VisibilityChangeObserver
   */
  public attach(): VisibilityChangeObserver {
    if (!doc.addEventListener) {
      return;
    }
    doc.addEventListener(VisibilityChangeObserver.visibilityEventName(), this.onVisibilityChangeListener, false);
    this.on(VISIBILITY_EVENTS.GET_STATUS, this.onVisibilityChangeListener);

    return this;
  }

  /**
   * 이벤트 감지 해제
   * @returns {VisibilityChangeObserver}
   * @memberof VisibilityChangeObserver
   */
  public detach(): VisibilityChangeObserver {
    if (!doc.addEventListener) {
      return;
    }
    doc.removeEventListener(VisibilityChangeObserver.visibilityEventName(), this.onVisibilityChangeListener, false);
    this.off(VISIBILITY_EVENTS.GET_STATUS, this.onVisibilityChangeListener);

    return this;
  }

  /**
   * destory
   * @returns {VisibilityChangeObserver}
   * @memberof VisibilityChangeObserver
   */
  public destroy(): VisibilityChangeObserver {
    this.detach();

    return this;
  }
}
