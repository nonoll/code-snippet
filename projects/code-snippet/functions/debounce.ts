import { TypeVoidFunction } from '../types/voidFunction';

export const debounce = (fn: TypeVoidFunction, delay: number): TypeVoidFunction => {
  let timer;
  delay = delay || 0;
  return (...args: any[]) => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      fn.apply(null, args);
    }, delay);
  };
};
