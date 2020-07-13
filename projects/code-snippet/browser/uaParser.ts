import { IBrowserAgents, IBrowserType, BROWSER_AGENTS } from './types';

/**
 * uaParser
 * @template T, R
 * @memberof module:browser
 * @function
 * @param {T} parsingType parsing 타입
 * @param {Number} [start=1] version slice - start index
 * @param {Number} [end=1] version slice - end index
 * @param {String} [ua=window.navigator.userAgent]
 * @returns {R}
 * @example
import { uaParser, IBrowserType } from '@nonoll/code-snippet/browser';

const iosChromeParser = (): IBrowserType => {
  return uaParser<{CHROME: string}, IBrowserType>({CHROME: 'CriOS\/([0-9]+)?\\.?([0-9]+)\\.?([0-9]+)\\.?([0-9]+)?'}, 1, 6);
};

console.log(iosChromeParser()); // { type, version }
 */
export const uaParser = <T = unknown, R = unknown>(parsingType: T, start = 1, end = 4, ua = window.navigator.userAgent): R => {
  const matched = (Object.entries(parsingType)
    .map((values: [string, unknown]) => {
      const [type, pattern] = values;
      // tslint:disable-next-line: no-shadowed-variable
      const matched = ua.match(new RegExp(pattern as string, 'i'));
      if (!matched) {
        return null;
      }
      const version = matched
        .slice(start, end)
        .map(v => v || 0)
        .join('.');
      return { type, version };
    })
    .filter(v => v)[0] as unknown) as R;

  if (matched) {
    return { ...matched } as R;
  } else {
    return ({ type: null, version: '' } as unknown) as R;
  }
};

/**
 * AOS, IOS - type, version 정보 반환
 * @memberof module:browser
 * @function
 * @returns {IBrowserType}
 * @example
import { browserType } from '@nonoll/code-snippet/browser';

console.log(browserType()); // { type, version }
 */
export const browserType = (): IBrowserType => uaParser<IBrowserAgents, IBrowserType>(BROWSER_AGENTS, 2, 5);
