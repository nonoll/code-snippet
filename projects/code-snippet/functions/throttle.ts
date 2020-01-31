import { TypeVoidFunction } from '../types/voidFunction';

export const throttle = (fn: TypeVoidFunction, delay: number): TypeVoidFunction => {
  delay = delay || 0;

  const caller = (args: any[]) => {
    fn.apply(null, args);
    base = +new Date();
  };

  let base = null;
  let isLeading = true;
  let stamp = null;

  return (...args: any[]) => {
    if (isLeading) {
      caller(args);
      isLeading = false;
      return;
    }

    stamp = +new Date();
    base = base || stamp;

    if ((stamp - base) >= delay) {
      caller(args);
    }
  }
}
