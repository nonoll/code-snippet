import { TypeVoidFunction } from '../types';

/**
 * throttle
  <iframe
    src="https://codesandbox.io/embed/nonollcode-snippet-9gko8?autoresize=1&expanddevtools=1&fontsize=14&hidenavigation=1&initialpath=%2Ffunctions-throttle.html&module=%2Ffunctions-throttle.html&theme=dark"
    style="width:100%; height:500px; border:1px solid black; border-radius: 4px; overflow:hidden;"
    title="@nonoll/code-snippet"
    allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
    sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
  ></iframe>
 * @memberof module:functions
 * @function
 * @see https://css-tricks.com/debouncing-throttling-explained-examples/
 * @param {TypeVoidFunction} fn
 * @param {Number} [delay=0]
 * @returns {TypeVoidFunction}
 * @example
import { debounce } from '@nonoll/code-snippet/functions';

const forExample = () => {
  const delay = 1000 * 1;
  const listener = throttle(res => console.log(res), delay);

  listener(`1 ${new Date()}`);
  listener('2');
  listener('3');
  listener('4');

  setTimeout(() => {
    listener(`5 ${new Date()}`);
  }, delay);
}

forExample();
 */
export const throttle = (fn: TypeVoidFunction, delay: number = 0): TypeVoidFunction => {
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
