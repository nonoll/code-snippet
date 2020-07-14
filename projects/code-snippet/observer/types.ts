import { TypeVoidFunction } from '../types';
import { INTERSECTION_DIRECTIONS } from './IntersectionObserver';

/**
 * pure MutationObserver init options
 * @memberof MutationObserver
 * @alias IMutationObserverInit
 * @interface
 * @property {Boolean} [childList] - target 의 하위 요소 추가 / 삭제 감지 유무
 * @property {Boolean} [attributes] - target 의 속성 변경 감지 유무
 * @property {Boolean} [characterData] - target 의 데이터 변경 감지 유무
 * @property {Boolean} [subtree] - target 의 하위 요소 변경 사항 감지 유무
 * @property {Boolean} [attributeOldValue] - attributeOldValue TBD
 * @property {Boolean} [characterDataOldValue] - TBD
 * @property {Array.<String>} [attributeFilter] - TBD [MDN attributeFilter]{@link https://developer.mozilla.org/en-US/docs/Web/API/MutationObserverInit/attributeFilter}
 * @see https://developer.mozilla.org/ko/docs/Web/API/MutationObserver#MutationObserverInit
 */
export interface IMutationObserverInit {
  childList?: boolean;
  attributes?: boolean;
  characterData?: boolean;
  subtree?: boolean;
  attributeOldValue?: boolean;
  characterDataOldValue?: boolean;
  attributeFilter?: string[];
};

/**
 * MutationObserver init options
 * @memberof MutationObserver
 * @alias IMutationObserverExtOption
 * @interface
 * @property {HTMLElement} target - 감지할 element
 * @property {Number} [debounce] - 이벤트 debounce 값
 * @property {TypeVoidFunction} [callback] - 이벤트 callback
 * @property {IMutationObserverInit} [options] - 세부 MutationObserver options
 */
export interface IMutationObserverExtOption {
  target: HTMLElement;
  debounce?: number;
  callback?: TypeVoidFunction;
  options?: IMutationObserverInit;
};

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
};


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
