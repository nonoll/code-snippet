import { TypeVoidFunction } from '../types';
import { IMutationObserverInit } from './index';

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
}
