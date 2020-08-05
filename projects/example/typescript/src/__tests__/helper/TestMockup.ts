/* istanbul ignore file: 테스트 코드 작성용 heleper 이므로, 테스트 제외 처리 */

import { USER_AGENTS } from './TestUserAgent';

const originalGetComputedStyle = window.getComputedStyle;
const originalMatchMedia = window.matchMedia;

export const MockUserAgent = (agent = USER_AGENTS.GALAXY_S5 ) => {
  return Object.defineProperty(window.navigator, 'userAgent', { value: agent, configurable: true });
};

export const MockComputedStyle = (data: any) => {
  if (data) {
    window.getComputedStyle = () => data as CSSStyleDeclaration;
  } else {
    window.getComputedStyle = originalGetComputedStyle;
  }
};

export const MockMatchMedia = data => {
  if (data) {
    window.matchMedia = () => data as MediaQueryList;
  } else {
    window.matchMedia = originalMatchMedia;
  }
};