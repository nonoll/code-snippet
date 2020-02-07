/**
 * @interface IPassive
 * @property {Boolean} passive - passive 지원 유무
 * @see https://developers.google.com/web/tools/lighthouse/audits/passive-event-listeners?hl=ko
 */
interface IPassive {
  passive: boolean;
}

/**
 * passive 옵션 지원 유무 반환
 * @memberof module:browser
 * @function
 * @return {Boolean}
 * @see https://github.com/WICG/EventListenerOptions/pull/30
 * @see https://github.com/cubiq/iscroll/blob/master/demos/demoUtils.js#L2-L12
 * @see https://developers.google.com/web/tools/lighthouse/audits/passive-event-listeners?hl=ko
 * @example
import { isSupportPassive } from '@nonoll/code-snippet/browser';
console.log(isSupportPassive()); // true or false
 */
/* istanbul ignore next */
export const isSupportPassive = (): boolean => {
  let supportPassiveOption = false;

  try {
    const options = Object.defineProperty({}, 'passive', { get: () => supportPassiveOption = true });
    addEventListener('test_passive_option', null, options);
  } catch (e) {}

  return supportPassiveOption;
};

/**
 * 실행된 browser 에서 지원하는 passive 옵션 값 반환
 * @memberof module:browser
 * @function
 * @return {(IPassive|Boolean)}
 * @see https://developers.google.com/web/tools/lighthouse/audits/passive-event-listeners?hl=ko
 * @example
import { getPassiveOption } from '@nonoll/code-snippet/browser';
console.log(getPassiveOption()); // IPassive or false
 */
export const getPassiveOption = (): IPassive | boolean => isSupportPassive() ? { passive: true } : /* istanbul ignore next */ false;
