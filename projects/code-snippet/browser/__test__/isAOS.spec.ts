import { TestBed } from '@angular/core/testing';

import { USER_AGENTS, MockUserAgent } from '../../__test__/helper';
import { isAOS } from '../index';

describe('# @nonoll/code-snippet/browser/isAOS Spec Test', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('# isAOS 는 function 이다.', () => {
    const type = typeof isAOS === 'function';
    expect(type).toEqual(true);
  });

  it('# AOS 환경에서 isAOS() 의 결과값은 true 이다.', () => {
    MockUserAgent(USER_AGENTS.GALAXY_S5);
    expect(isAOS()).toEqual(true);
  });

  it('# IOS 환경에서 isAOS() 의 결과값은 false 이다.', () => {
    MockUserAgent(USER_AGENTS.IPHONE_6_7_8_PLUS);
    expect(isAOS()).toEqual(false);
  });

});
