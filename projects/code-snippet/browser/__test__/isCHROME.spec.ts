import { TestBed } from '@angular/core/testing';

import { USER_AGENTS, MockUserAgent } from '../../__test__/helper';
import { isCHROME } from '../index';

describe('# @nonoll/code-snippet/browser/isCHROME Spec Test', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('# isCHROME 는 function 이다.', () => {
    const type = typeof isCHROME === 'function';
    expect(type).toEqual(true);
  });

  it('# AOS Chrome 환경에서 isCHROME() 의 결과값은 true 이다.', () => {
    MockUserAgent(USER_AGENTS.AOS_CHROME);
    expect(isCHROME()).toEqual(true);
  });

  it('# IOS Chrome 환경에서 isCHROME() 의 결과값은 true 이다.', () => {
    MockUserAgent(USER_AGENTS.IOS_CHROME);
    expect(isCHROME()).toEqual(true);
  });

  it('# Chrome 환경이 아닐 경우, 결과값은 false 이다.', () => {
    MockUserAgent(USER_AGENTS.IPHONE_6_7_8_PLUS);
    expect(isCHROME()).toEqual(false);
  });

});
