/* istanbul ignore file: 테스트 코드 작성용 heleper 이므로, 테스트 제외 처리 */

import { USER_AGENTS } from './TestUserAgent';

export const MockUserAgent = (agent = USER_AGENTS.GALAXY_S5 ) => {
  return Object.defineProperty(window.navigator, 'userAgent', { value: agent });
};
