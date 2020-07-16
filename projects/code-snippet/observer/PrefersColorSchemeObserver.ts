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
 * @export
 * @class PrefersColorSchemeObserver
 * @alias observer/PrefersColorSchemeObserver
 * @extends EventEmitter
 * @throws {Error} browser 에서 지원하지 못하는 경우 - throw new Error('PrefersColorScheme 지원되지 않는 브라우저입니다.');
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

  static isSupport(): boolean {
    return !!window.matchMedia;
  }

  public attach(): PrefersColorSchemeObserver {
    window.matchMedia(this.checkColorScheme).addEventListener('change', this.onPrefersColorSchemeChangeListener);
    this.on(PREFERS_COLOR_SCHEME_EVENTS.GET_STATUS, this.onPrefersColorSchemeChangeListener);

    return this;
  }

  public detach(): PrefersColorSchemeObserver {
    window.matchMedia(this.checkColorScheme).removeEventListener('change', this.onPrefersColorSchemeChangeListener);
    this.off(PREFERS_COLOR_SCHEME_EVENTS.GET_STATUS, this.onPrefersColorSchemeChangeListener);

    return this;
  }

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
