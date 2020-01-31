import { EventEmitter } from '../event/EventEmitter';

const doc = window.document as any;

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

export const VENDOR_PREFIX = getVendorPrefix();
export const VISIBILITY_EVENT_NAME = `${VENDOR_PREFIX}visibilitychange`;
export const HIDDEN_METHOD_NAME = VENDOR_PREFIX ? `${VENDOR_PREFIX}Hidden` : 'hidden';

export enum VISIBILITY_EVENTS {
  CHANGE = 'VISIBILITY_CHANGE-EVENTS-CHANGE',
  GET_STATUS = 'VISIBILITY_CHANGE-EVENTS-GET_STATUS'
}

export class VisibilityChangeObserver extends EventEmitter {
  constructor() {
    super();

    if (!VisibilityChangeObserver.isSupportVisibilityChange()) {
      throw new Error('VisibilityChange 지원되지 않는 브라우저입니다.');
    }

    this.onVisibilityChangeListener = this.onVisibilityChangeListener.bind(this);
  }

  static visibilityEventName(): string {
    return `${VENDOR_PREFIX}visibilitychange`;
  }

  static hiddenMethodName(): string {
    return VENDOR_PREFIX ? `${VENDOR_PREFIX}Hidden` : 'hidden';
  }

  static isSupportVisibilityChange(): boolean {
    return typeof doc[VisibilityChangeObserver.hiddenMethodName()] !== 'undefined';
  }

  private onVisibilityChangeListener(): void {
    const isHidden = this.isHidden();
    this.emit(VISIBILITY_EVENTS.CHANGE, { isHidden, isShow: !isHidden });
  }

  private isHidden(): boolean {
    return doc[VisibilityChangeObserver.hiddenMethodName()];
  }

  public getStatus(): VisibilityChangeObserver {
    this.emit(VISIBILITY_EVENTS.GET_STATUS);

    return this;
  }

  public attach(): VisibilityChangeObserver {
    if (!doc.addEventListener) {
      return;
    }
    doc.addEventListener(VisibilityChangeObserver.visibilityEventName(), this.onVisibilityChangeListener, false);
    this.on(VISIBILITY_EVENTS.GET_STATUS, this.onVisibilityChangeListener);

    return this;
  }

  public detach(): VisibilityChangeObserver {
    if (!doc.addEventListener) {
      return;
    }
    doc.removeEventListener(VisibilityChangeObserver.visibilityEventName(), this.onVisibilityChangeListener, false);
    this.off(VISIBILITY_EVENTS.GET_STATUS, this.onVisibilityChangeListener);

    return this;
  }

  public destroy(): VisibilityChangeObserver {
    this.detach();

    return this;
  }
}
