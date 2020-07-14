import { EventEmitter } from '../event';

export enum PREFERS_COLOR_SCHEME {
  LIGHT = 'light',
  DARK = 'dark'
}

export enum PREFERS_COLOR_SCHEME_EVENTS {
  CHANGE = 'PREFERS_COLOR_SCHEME_OBSERVER-EVENTS-CHANGE',
  GET_STATUS = 'PREFERS_COLOR_SCHEME_OBSERVER-EVENTS-GET_COLOR_SCHEME'
}

export interface IPrefersColorSchemeStatus {
  isDark: boolean;
  isLight: boolean;
};

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

  private onPrefersColorSchemeChangeListener(): void {
    const status = this.getStatus();

    this.emit(PREFERS_COLOR_SCHEME_EVENTS.CHANGE, status);
  }

  public destory(): PrefersColorSchemeObserver {
    this.detach();

    return this;
  }
}
