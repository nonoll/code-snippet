import { EventEmitter } from '../event';
import { IPrefersColorSchemeStatus } from './types';

/**
 * @typedef {String} PREFERS_COLOR_SCHEME
 * @alias PREFERS_COLOR_SCHEME
 * @memberof PrefersColorSchemeObserver
 * @property {String} LIGHT
 * @property {String} DARK
 */
// for jsdoc
/**
 * @export
 * @readonly
 * @enum {PREFERS_COLOR_SCHEME}
 */
export enum PREFERS_COLOR_SCHEME {
  LIGHT = 'light',
  DARK = 'dark'
}

/**
 * PrefersColorSchemeObserverEvent Types
 * @event PrefersColorSchemeObserver#PREFERS_COLOR_SCHEME_EVENTS
 * @memberof PrefersColorSchemeObserver
 * @property {String} CHANGE - 변경 시점
 * @property {String} GET_STATUS - 현재 상태값 체크
 */
// for jsdoc
/**
 * @export
 * @readonly
 * @enum {PREFERS_COLOR_SCHEME_EVENTS}
 */
export enum PREFERS_COLOR_SCHEME_EVENTS {
  CHANGE = 'PREFERS_COLOR_SCHEME_OBSERVER-EVENTS-CHANGE',
  GET_STATUS = 'PREFERS_COLOR_SCHEME_OBSERVER-EVENTS-GET_COLOR_SCHEME'
}

/**
 * prefers-color-scheme 상태 변화를 감지
<iframe
  src="https://codesandbox.io/embed/nonollcode-snippet-9gko8?autoresize=1&expanddevtools=1&fontsize=14&hidenavigation=1&initialpath=%2Fobsever-PrefersColorScheme.html&module=%2Fobsever-PrefersColorScheme.html&theme=dark"
  style="width:100%; height:500px; border:1px solid black; border-radius: 4px; overflow:hidden;"
  title="@nonoll/code-snippet"
  allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
  sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
></iframe>
 * @export
 * @class PrefersColorSchemeObserver
 * @alias observer/PrefersColorSchemeObserver
 * @extends EventEmitter
 * @throws {Error} browser 에서 지원하지 못하는 경우 - throw new Error('PrefersColorScheme 지원되지 않는 브라우저입니다.');
 * @example
import { PrefersColorSchemeObserver, PREFERS_COLOR_SCHEME_EVENTS } from "@nonoll/code-snippet/observer";

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

export const forExample = () => {
  if (observer) {
    console.log("already example");
    return;
  }

  const doc = window.document;

  observer = new PrefersColorSchemeObserver();

  observer.on(PREFERS_COLOR_SCHEME_EVENTS.CHANGE, ({ isDark, isLight }) => {
    console.log("change", isDark, isLight);
  });

  observer.attach();
  observer.emit(PREFERS_COLOR_SCHEME_EVENTS.GET_STATUS);

  const statusButton = createElement({ tag: "button", text: "status" });

  doc.body.appendChild(statusButton);

  statusButton.addEventListener("click", e => {
    e.preventDefault();
    console.log("statusButton clicked");
    if (!observer) {
      return;
    }
    observer.emit(PREFERS_COLOR_SCHEME_EVENTS.GET_STATUS);
  });
};

forExample();
 */
export class PrefersColorSchemeObserver extends EventEmitter {
  private checkColorScheme = `(prefers-color-scheme: ${PREFERS_COLOR_SCHEME.DARK})`;

  constructor() {
    super();

    /* istanbul ignore next: for not support error */
    if (!PrefersColorSchemeObserver.isSupport()) {
      throw new Error('PrefersColorScheme 지원되지 않는 브라우저입니다.');
    }

    this.onPrefersColorSchemeChangeListener = this.onPrefersColorSchemeChangeListener.bind(this);
  }

  /**
   * prefers-color-scheme 지원 여부 반환
   * @static
   * @returns {boolean}
   * @memberof PrefersColorSchemeObserver
   */
  static isSupport(): boolean {
    return !!window.matchMedia;
  }

  /**
   * 이벤트 감지 설정
   * @returns {PrefersColorSchemeObserver}
   * @memberof PrefersColorSchemeObserver
   */
  public attach(): PrefersColorSchemeObserver {
    window.matchMedia(this.checkColorScheme).addEventListener('change', this.onPrefersColorSchemeChangeListener);
    this.on(PREFERS_COLOR_SCHEME_EVENTS.GET_STATUS, this.onPrefersColorSchemeChangeListener);

    return this;
  }

  /**
   * 이벤트 감지 해제
   * @returns {PrefersColorSchemeObserver}
   * @memberof PrefersColorSchemeObserver
   */
  public detach(): PrefersColorSchemeObserver {
    window.matchMedia(this.checkColorScheme).removeEventListener('change', this.onPrefersColorSchemeChangeListener);
    this.off(PREFERS_COLOR_SCHEME_EVENTS.GET_STATUS, this.onPrefersColorSchemeChangeListener);

    return this;
  }

  /**
   * 현재 상태를 반환
   * @returns {IPrefersColorSchemeStatus}
   * @memberof PrefersColorSchemeObserver
   */
  public getStatus(): IPrefersColorSchemeStatus {
    const { matches } = window.matchMedia(this.checkColorScheme);
    const status: IPrefersColorSchemeStatus = {
      isDark: matches,
      isLight: !matches
    };

    return status;
  }

  /**
   * 변화 감지 이벤트 리스너
   * @private
   * @memberof PrefersColorSchemeObserver
   * @fires PrefersColorSchemeObserver#PREFERS_COLOR_SCHEME_EVENTS
   */
  private onPrefersColorSchemeChangeListener(): void {
    const status = this.getStatus();

    this.emit(PREFERS_COLOR_SCHEME_EVENTS.CHANGE, status);
  }

  /**
   * destroy
   * @returns {PrefersColorSchemeObserver}
   * @memberof PrefersColorSchemeObserver
   */
  public destroy(): PrefersColorSchemeObserver {
    this.detach();

    return this;
  }
}
