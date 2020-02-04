import { TestBed } from '@angular/core/testing';

import { isAOS } from '../index';

const USER_AGENTS = {
  // tslint:disable-next-line: max-line-length
  GALAXY_S5: 'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Mobile Safari/537.36',
  // tslint:disable-next-line: max-line-length
  IPHONE_6_7_8_PLUS: 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1'
};

const mockUserAgent = (agent = USER_AGENTS.GALAXY_S5) => Object.defineProperty(window.navigator, 'userAgent', { value: agent });

describe('# @nonoll/code-snippet/browser/isAOS Spec Test', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('# isAOS 는 function 이다.', () => {
    const type = typeof isAOS === 'function';
    expect(type).toEqual(true);
  });

  it('# AOS 환경에서 isAOS() 의 결과값은 true 이다.', () => {
    mockUserAgent(USER_AGENTS.GALAXY_S5);
    expect(isAOS()).toEqual(true);
  });

  it('# IOS 환경에서 isAOS() 의 결과값은 false 이다.', () => {
    mockUserAgent(USER_AGENTS.IPHONE_6_7_8_PLUS);
    expect(isAOS()).toEqual(false);
  });

});
