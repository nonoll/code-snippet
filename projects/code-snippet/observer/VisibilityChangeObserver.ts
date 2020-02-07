import { EventEmitter } from '../event';

const doc = window.document as any;

/**
 * Visibility Status 반환 규격
 * @memberof VisibilityChangeObserver
 * @alias IVisibilityStatus
 * @interface
 * @property {Boolean} hidden - hidden 상태 유무
 * @property {Boolean} show - show 상태 유무
 * @see VisibilityChangeObserver#getStatus
 */
interface IVisibilityStatus {
  isHidden: boolean;
  isShow: boolean;
}

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
  } /* istanbul ignore next */ else if (typeof doc.msHidden !== 'undefined') {
    prefix = 'ms';
  } /* istanbul ignore next */ else if (typeof doc.webkitHidden !== 'undefined') {
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
export const HIDDEN_METHOD_NAME = VENDOR_PREFIX ? /* istanbul ignore next */ `${VENDOR_PREFIX}Hidden` : 'hidden';

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
  <iframe
    src="https://codesandbox.io/embed/nonollcode-snippet-9gko8?autoresize=1&expanddevtools=1&fontsize=14&hidenavigation=1&initialpath=%2Fobserver-VisibilityChange.html&module=%2Fobserver-VisibilityChange.html&theme=dark"
    style="width:100%; height:500px; border:1px solid black; border-radius: 4px; overflow:hidden;"
    title="@nonoll/code-snippet"
    allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
    sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
  ></iframe>
 * @export
 * @class VisibilityChangeObserver
 * @alias observer/VisibilityChangeObserver
 * @extends {EventEmitter}
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API
 * @see https://caniuse.com/#search=visibilityState
 * @throws {Error} browser 에서 지원하지 못하는 경우 - throw new Error('VisibilityChange 지원되지 않는 브라우저입니다.');
 * @example
import { VisibilityChangeObserver, VISIBILITY_EVENTS } from '@nonoll/code-snippet/observer';

const createElement = ({ tag = 'div', id = '', style = '', value = '', text = '' }) => {
  const doc = window.document;
  const target = doc.createElement(tag);
  target.setAttribute('id', id);
  target.setAttribute('style', style);
  target.setAttribute('value', value);
  if (text) {
    target.textContent = text;
  }
  return target;
}

let observer;

const forExample = () => {
  if (observer) {
    console.log('already example');
    return;
  }

  const doc = window.document;

  observer = new VisibilityChangeObserver();

  observer.on(VISIBILITY_EVENTS.CHANGE, ({ isHidden, isShow }) => {
    console.log('change', isHidden, isShow);
  });

  observer.attach();
  observer.emit(VISIBILITY_EVENTS.GET_STATUS);

  const statusButton = createElement({ tag: 'button', text: 'status' });
  const openButton = createElement({ tag: 'button', text: 'window open' });

  doc.body.appendChild(statusButton);
  doc.body.appendChild(openButton);

  statusButton.addEventListener('click', e => {
    e.preventDefault();
    console.log('statusButton clicked');
    if (!observer) {
      return;
    }
    // observer.emit(VISIBILITY_EVENTS.GET_STATUS);
    const { isHidden, isShow } = observer.getStatus();
    console.log('getStatus', isHidden, isShow);
  });

  openButton.addEventListener('click', e => {
    e.preventDefault();
    console.log('openButton clicked');
    if (!observer) {
      return;
    }
    const browser = window.open('https://nonoll.github.io/code-snippet/');
    if (!browser) {
      console.error('팝업이 차단되어 있습니다.');
    }
  });
}

forExample();
 */
export class VisibilityChangeObserver extends EventEmitter {
  constructor() {
    super();

    /* istanbul ignore next: for not support error */
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
    return HIDDEN_METHOD_NAME;
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
   * @see IVisibilityStatus
   * @fires VisibilityChangeObserver#VISIBILITY_EVENTS
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
   * 현재 상태를 반환
   * @returns {IVisibilityStatus}
   * @memberof VisibilityChangeObserver
   */
  public getStatus(): IVisibilityStatus {
    this.emit(VISIBILITY_EVENTS.GET_STATUS);

    const isHidden = this.isHidden();
    return { isHidden, isShow: !isHidden };
  }

  /**
   * 이벤트 감지 설정
   * @returns {VisibilityChangeObserver}
   * @memberof VisibilityChangeObserver
   */
  public attach(): VisibilityChangeObserver {
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
