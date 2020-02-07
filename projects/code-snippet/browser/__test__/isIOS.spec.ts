import { TestBed } from '@angular/core/testing';

import { USER_AGENTS, MockUserAgent } from '../../__test__/helper';
import { isIOS } from '../index';

describe('# @nonoll/code-snippet/browser/isIOS Spec Test', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('# isIOS 는 function 이다.', () => {
    const type = typeof isIOS === 'function';
    expect(type).toEqual(true);
  });

  it('# AOS 환경에서 isIOS() 의 결과값은 false 이다.', () => {
    MockUserAgent(USER_AGENTS.GALAXY_S5);
    expect(isIOS()).toEqual(false);
  });

  it('# IOS 환경에서 isIOS() 의 결과값은 true 이다.', () => {
    MockUserAgent(USER_AGENTS.IPHONE_6_7_8_PLUS);
    expect(isIOS()).toEqual(true);
  });

});
