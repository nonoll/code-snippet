import { EventEmitter } from '../event';
import { throttle as _throttle, noop } from '../functions';

const defaultThresholdList = new Array(101).fill(0).map((_, v) => v / 100);

/**
 * @typedef IntersectionObserverInit
 * @alias IntersectionObserverInit
 * @property {Element | null} [root]
 * @property {String} [rootMargin]
 * @property {Number | Number[]} [threshold]
 */
// for jsdoc

/**
 * @typedef IntersectionObserverEntry
 * @alias IntersectionObserverEntry
 * @property {DOMRectReadOnly} boundingClientRect
 * @property {Number} intersectionRatio
 * @property {DOMRectReadOnly} intersectionRect
 * @property {Boolean} isIntersecting
 * @property {DOMRectReadOnly | null} rootBounds
 * @property {Element} target
 * @property {Number} time
 */
// for jsdoc

/**
 * @callback callback
 * @param {IIntersectionChangeData} changeData
 */
// for jsdoc

/**
 * IntersectionEvent Types
 * @event IntersectionObserver#INTERSECTION_EVENTS
 * @memberof IntersectionObserver
 * @property {String} CHANGE - 변경 시점
 */
// for jsdoc
/**
 * @export
 * @readonly
 * @enum {INTERSECTION_EVENTS}
 */
export const INTERSECTION_EVENTS = {
  CHANGE: 'INTERSECTION_OBSERVER-EVENTS-CHANGE'
};

/**
 * @typedef {String} INTERSECTION_DIRECTIONS
 * @alias INTERSECTION_DIRECTIONS
 * @memberof IntersectionObserver
 * @property {String} UP
 * @property {String} DOWN
 * @property {String} UNKNOWN
 */
// for jsdoc
/**
 * @export
 * @readonly
 * @enum {INTERSECTION_DIRECTIONS}
 */
export enum INTERSECTION_DIRECTIONS {
  UP = 'INTERSECTION_OBSERVER-DIRECTIONS-UP',
  DOWN = 'INTERSECTION_OBSERVER-DIRECTIONS-DOWN',
  UNKNOWN = 'INTERSECTION_OBSERVER-DIRECTIONS-UNKNOWN'
};

/**
 * IntersectionObserver init options
 * @memberof IntersectionObserver
 * @alias IIntersectionObserverExtOption
 * @interface
 * @property {Element} target - 감지할 element
 * @property {Number} [visibleRatio] - 이벤트 visibleRatio 값
 * @property {Number} [throttle] - 이벤트 throttle 값
 * @property {callback} [callback] - 이벤트 callback
 * @property {IntersectionObserverInit} [options] - 세부 IntersectionObserver options
 * @see https://developer.mozilla.org/ko/docs/Web/API/IntersectionObserver/IntersectionObserver#%EB%A7%A4%EA%B0%9C%EB%B3%80%EC%88%98
 */
export interface IIntersectionObserverExtOption {
  target: Element;
  visibleRatio?: number;
  throttle?: number;
  callback?: (changeData: IIntersectionChangeData) => void;
  options?: IntersectionObserverInit;
};

/**
 * IntersectionObserver ChangeData
 * @memberof IntersectionObserver
 * @alias IIntersectionChangeData
 * @interface
 * @property {Element} currentTarget
 * @property {IntersectionObserverEntry} entry
 * @property {Number} intersectionRatio
 * @property {Boolean} isVisible
 * @property {INTERSECTION_DIRECTIONS} direction
 */
export interface IIntersectionChangeData {
  currentTarget: Element;
  entry: IntersectionObserverEntry;
  intersectionRatio: number;
  isVisible: boolean;
  direction: INTERSECTION_DIRECTIONS;
};

class ExtIntersectionObserverEntry {
  private options: Partial<IntersectionObserverInit>;
  private target: Element;
  private visibleRatio: number;

  constructor(initParams: Partial<IIntersectionObserverExtOption>) {
    const { target, visibleRatio = 0, options = {} } = initParams;

    /* istanbul ignore next: for not support error */
    if (!target) {
      throw new Error('IntersectionObserver target 설정은 필수 값 입니다.');
    }

    const defParams = {
      root: null,
      rootMargin: '0px',
      threshold: defaultThresholdList
    };

    this.target = target;
    this.visibleRatio = visibleRatio;
    this.options = Object.assign({}, defParams, options);
  }

  private checkForIntersections(target: Element, options: IntersectionObserverInit): IntersectionObserverEntry {
    const { root, rootMargin } = options;
    const rootMarginValues = this.parseRootMargin(rootMargin);
    const rootIsInDom = this.rootIsInDom(root);
    const rootRect = rootIsInDom ? this.getRootRect(root, rootMarginValues) : this.getEmptyRect();
    const boundingClientRect = this.getBoundingClientRect(target);
    const rootContainsTarget = this.rootContainsTarget(root, target);
    const intersectionRect = rootIsInDom && rootContainsTarget && this.computeTargetAndRootIntersection(target, rootRect, root);
    const isIntersecting = !!intersectionRect;

    const targetArea = boundingClientRect.width * boundingClientRect.height;
    let intersectionRatio = 0;
    if (targetArea) {
      const rect = intersectionRect || this.getEmptyRect();
      const intersectionArea = rect.width * rect.height
      intersectionRatio = Number((intersectionArea / targetArea).toFixed(4));
    } else {
      intersectionRatio = isIntersecting ? 1 : 0;
    }

    return {
      boundingClientRect,
      intersectionRatio,
      intersectionRect: intersectionRect || this.getEmptyRect(),
      isIntersecting,
      rootBounds: rootRect as DOMRectReadOnly | null,
      target,
      time: window.performance && performance.now && performance.now()
    } as IntersectionObserverEntry;
  }

  private computeTargetAndRootIntersection(target = null, rootRect = null, root = null) {
    if (window.getComputedStyle(target).display === 'none') {
      return false;
    }

    const targetRect = this.getBoundingClientRect(target);
    let intersectionRect: Partial<DOMRect> = targetRect;
    let parent = this.getParentNode(target);
    let atRoot = false;

    while (!atRoot) {
      let parentRect = null;
      const parentComputedStyle = (parent.nodeType === 1 ? window.getComputedStyle(parent) : {}) as CSSStyleDeclaration;

      if (parentComputedStyle.display === 'none') {
        return;
      }

      if (parent === root) {
        atRoot = true;
        parentRect = rootRect;
      } else {
        if (
          parent !== document.body &&
          parent !== document.documentElement &&
          parentComputedStyle.overflow !== 'visible'
        ) {
          parentRect = this.getBoundingClientRect(parent);
        }
      }

      if (parentRect) {
        intersectionRect = this.computeRectIntersection(parentRect, intersectionRect)

        if (!intersectionRect) {
          break;
        }
      }
      parent = this.getParentNode(parent);
    }
    return intersectionRect;
  }

  private computeRectIntersection(rect1: Partial<DOMRect>, rect2: Partial<DOMRect>): Partial<DOMRect> {
    const top = Math.max(rect1.top, rect2.top);
    const bottom = Math.min(rect1.bottom, rect2.bottom);
    const left = Math.max(rect1.left, rect2.left);
    const right = Math.min(rect1.right, rect2.right);
    const width = right - left;
    const height = bottom - top;
    const values = { top, bottom, left, right, width, height };
    return (width >= 0 && height >= 0) && values;
  }

  private parseRootMargin(rootMargin: string = '0px'): Array<{ value: number, unit: string }> {
    const margins = rootMargin.split(/\s+/).map((margin) => {
      const parts = /^(-?\d*\.?\d+)(px|%)$/.exec(margin);
      if (!parts) {
        throw new Error('rootMargin must be specified in pixels or percent');
      }
      return { value: window.parseFloat(parts[1]), unit: parts[2] };
    });

    margins[1] = margins[1] || margins[0];
    margins[2] = margins[2] || margins[0];
    margins[3] = margins[3] || margins[1];

    return margins;
  }

  private rootIsInDom(root: Element | null) {
    return root || this.containsDeep(window.document, root);
  }

  private rootContainsTarget(root: Element | null, target: Element) {
    return this.containsDeep(root || window.document, target);
  }

  private containsDeep(parent: Document | Element, child: Element) {
    let node = child;

    while (node) {
      if (node === parent) {
        return true;
      }
      node = this.getParentNode(node);
    }
    return false;
  }

  private getParentNode(node: Element): Element {
    const parent = node.parentNode;

    if (parent && parent.nodeType === 11 && (parent as ShadowRoot).host) {
      // If the parent is a shadow root, return the host element.
      return (parent as ShadowRoot).host;
    }
    return parent as Element;
  }

  private getRootRect(root: Element | null, rootMargin = []): DOMRect {
    let rootRect;

    if (root) {
      rootRect = this.getBoundingClientRect(root);
    } else {
      // Use <html>/<body> instead of window since scroll bars affect size.
      const html = window.document.documentElement;
      const body = window.document.body;
      rootRect = {
        top: 0,
        left: 0,
        right: html.clientWidth || body.clientWidth,
        width: html.clientWidth || body.clientWidth,
        bottom: html.clientHeight || body.clientHeight,
        height: html.clientHeight || body.clientHeight
      };
    }

    return this.expandRectByRootMargin(rootRect, rootMargin);
  }

  private getBoundingClientRect(el: Element): DOMRect | null {
    let rect = null;

    try {
      rect = el.getBoundingClientRect();
    } catch (err) {
      // Ignore Windows 7 IE11 "Unspecified error"
      // https://github.com/w3c/IntersectionObserver/pull/205
    }

    if (!rect) {
      return this.getEmptyRect();
    }

    return rect;
  }

  private getEmptyRect(): DOMRect {
    const emptyRect = {
      bottom: 0,
      height: 0,
      left: 0,
      right: 0,
      top: 0,
      width: 0,
      x: 0,
      y: 0
    }
    return {
      ...emptyRect,
      toJSON: () => emptyRect
    };
  }

  private expandRectByRootMargin(rect: DOMRect, rootMargin = []): DOMRect {
    const [mt, mr, mb, ml] = rootMargin.map((margin, i) => {
      return margin.unit === 'px' ? margin.value : (margin.value * (i % 2 ? rect.width : rect.height)) / 100;
    });

    const { top, right, bottom, left } = rect;
    const newRect = {
      top: top - mt,
      right: right + mr,
      bottom: bottom + mb,
      left: left - ml,
      x: 0,
      y: 0,
      width: 0,
      height: 0
    };

    newRect.x = newRect.left;
    newRect.y = newRect.top;
    newRect.width = newRect.right - newRect.left;
    newRect.height = newRect.bottom - newRect.top;

    return {
      ...newRect,
      toJSON: () => newRect
    };
  }

  getChangeData(): IIntersectionChangeData {
    const entry = this.checkForIntersections(this.target, this.options);
    const intersectionRatio = Math.floor(entry.intersectionRatio * 100);
    const isVisible = entry.intersectionRatio > this.visibleRatio;
    return {
      currentTarget: this.target,
      entry,
      intersectionRatio,
      isVisible,
      direction: INTERSECTION_DIRECTIONS.UNKNOWN
    }
  }
}

class PureIntersectionObserver {
  private pure: any;

  constructor(callback: IntersectionObserverCallback, options: IntersectionObserverInit) {
    // TODO polyfill
    // https://www.npmjs.com/package/intersection-observer
    // const IntersectionObserver = require('intersection-observer');
    // this.pure = new IntersectionObserver(callback);
    this.pure = new (window as any).IntersectionObserver(callback, options);
  }

  public observe(target: Element | any, options: IntersectionObserverInit): void {
    this.pure.observe(target, options);
  }

  public disconnect(): void {
    this.pure.disconnect();
  }
}

/**
 * element 가 viewport 영역에 노출되는지 변화를 감지
 * @export
 * @class IntersectionObserver
 * @alias observer/IntersectionObserver
 * @extends {EventEmitter}
 * @see https://developer.mozilla.org/ko/docs/Web/API/IntersectionObserver/IntersectionObserver
 * @see https://caniuse.com/#search=IntersectionObserver
 * @throws {Error} target 옵션을 지정하지 않은 경우 - throw new Error('IntersectionObserver target 설정은 필수 값 입니다.');
 * @param {Partial<IIntersectionObserverExtOption>} initParams
 * @param {Element} initParams.target
 * @param {Number} [initParams.visibleRatio=0]
 * @param {Number} [initParams.throttle=300]
 * @param {Function|null} [initParams.callback={@link noop}] callback function
 * @param {IntersectionObserverInit} [initParams.options={}]
 * @example
 .. TODO
 */
export class IntersectionObserver extends EventEmitter {
  private observer: PureIntersectionObserver;
  private options: Partial<IntersectionObserverInit>;
  private target: Element;
  private visibleRatio: number;
  private prevRatio: number;

  constructor(initParams: Partial<IIntersectionObserverExtOption>) {
    super();

    const { target, visibleRatio = 0, throttle = 300, callback = noop, options = {} } = initParams;

    /* istanbul ignore next: for not support error */
    if (!target) {
      throw new Error('IntersectionObserver target 설정은 필수 값 입니다.');
    }

    const defParams = {
      root: null,
      rootMargin: '0px',
      threshold: defaultThresholdList
    };

    this.target = target;
    this.visibleRatio = visibleRatio;
    this.prevRatio = 0;
    this.onIntersectionCallback = callback;
    this.onIntersectionListener = this.onIntersectionListener.bind(this);

    this.options = Object.assign({}, defParams, options);

    if (throttle) {
      this.observer = new PureIntersectionObserver(_throttle(this.onIntersectionListener, throttle), this.options);
    } else {
      this.observer = new PureIntersectionObserver(this.onIntersectionListener, this.options);
    }
  }

  static getIntersectionEntry(initParams: Partial<IIntersectionObserverExtOption>): IIntersectionChangeData {
    return new ExtIntersectionObserverEntry(initParams).getChangeData();
  }

  private onIntersectionCallback = (changeData: IIntersectionChangeData) => {};

  /**
   * 변화 감지 이벤트 리스너
   * @private
   * @param {IntersectionObserverEntry[]} entries
   * [MDN IntersectionObserverEntry]{@link https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry}
   * @memberof IntersectionObserver
   * @fires IntersectionObserver#INTERSECTION_EVENTS
   */
  private onIntersectionListener(entries: IntersectionObserverEntry[]): void {
    const entry: IntersectionObserverEntry = entries[0];
    const { intersectionRatio } = entry;
    const isVisible = intersectionRatio > this.visibleRatio;
    const direction = this.prevRatio > intersectionRatio ? INTERSECTION_DIRECTIONS.DOWN : INTERSECTION_DIRECTIONS.UP
    const changeData: IIntersectionChangeData = {
      currentTarget: this.target,
      entry,
      intersectionRatio: Math.floor(intersectionRatio * 100),
      isVisible,
      direction
    };

    this.emit(INTERSECTION_EVENTS.CHANGE, changeData);
    this.onIntersectionCallback(changeData);
    this.prevRatio = intersectionRatio;
  }

  /**
   * 이벤트 감지 설정
   * @returns {IntersectionObserver}
   * @memberof IntersectionObserver
   */
  public attach(): IntersectionObserver {
    this.observer.observe(this.target, this.options);
    return this;
  }

  /**
   * 이벤트 감지 해제
   * @returns {IntersectionObserver}
   * @memberof IntersectionObserver
   */
  public detach(): IntersectionObserver {
    this.observer.disconnect();
    return this;
  }

  /**
   * destory
   * @returns {IntersectionObserver}
   * @memberof IntersectionObserver
   */
  public destroy(): IntersectionObserver {
    this.detach();
    this.observer = null;
    return this;
  }
}
