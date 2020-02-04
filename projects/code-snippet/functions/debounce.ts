import { TypeVoidFunction } from '../types';

/**
 * debounce
  <iframe
    src="https://codesandbox.io/embed/nonollcode-snippet-9gko8?autoresize=1&expanddevtools=1&fontsize=14&hidenavigation=1&initialpath=%2Ffunctions-debounce.html&module=%2Ffunctions-debounce.html&theme=dark"
    style="width:100%; height:500px; border:1px solid black; border-radius: 4px; overflow:hidden;"
    title="@nonoll/code-snippet"
    allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
    sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
  ></iframe>
 * @memberof module:functions
 * @function
 * @see https://css-tricks.com/debouncing-throttling-explained-examples/
 * @returns {TypeVoidFunction}
 * @example
import { debounce } from '@nonoll/code-snippet/functions';

const forExample = () => {
  const delay = 1000 * 1;
  const listener = debounce(res => console.log(res), delay);

  listener('1');
  listener('2');
  listener('3');
  listener(`4 ${new Date()}`);

  setTimeout(() => {
    listener(`5 ${new Date()}`);
  }, delay);
}

forExample();
 */
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
