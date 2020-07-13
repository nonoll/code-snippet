import { TestBed } from '@angular/core/testing';

import { USER_AGENTS, MockUserAgent } from '../../__test__/helper';
import { uaParser, browserType } from '../index';
import { IBrowserAgents, IBrowserType, BROWSER_AGENTS } from '../types';

describe('# @nonoll/code-snippet/browser/uaParser Spec Test', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('# uaParser 는 function 이다.', () => {
    const type = typeof uaParser === 'function';
    expect(type).toEqual(true);
  });

  it('# USER_AGENTS.GALAXY_S5 환경에서 uaParser<IBrowserAgents, IBrowserType>(BROWSER_AGENTS, 2, 5) 의 결과값은 { type: "AOS", version: "5.0.0" } 이다.', () => {
    MockUserAgent(USER_AGENTS.GALAXY_S5);
    const response = uaParser<IBrowserAgents, IBrowserType>(BROWSER_AGENTS, 2, 5);
    const result = { type: 'AOS', version: '5.0.0' };
    expect(response).toEqual(result);
  });

  it('# USER_AGENTS.IPHONE_6_7_8_PLUS 환경에서 uaParser<IBrowserAgents, IBrowserType>(BROWSER_AGENTS, 2, 5) 의 결과값은 { type: "AOS", version: "5.0.0" } 이다.', () => {
    MockUserAgent(USER_AGENTS.IPHONE_6_7_8_PLUS);
    const response = uaParser<IBrowserAgents, IBrowserType>(BROWSER_AGENTS, 2, 5);
    const result = { type: 'IOS', version: '11.0.0' };
    expect(response).toEqual(result);
  });

  it(`# USER_AGENTS.IOS_CHROME 환경에서 uaParser<{CHROME: string}, IBrowserType>({CHROME: 'CriOS\/([0-9]+)?\\.?([0-9]+)\\.?([0-9]+)\\.?([0-9]+)?'}, 1, 6) 의 결과값은 { type: 'CHROME', version: '83.0.4103.88' } 이다.`, () => {
    MockUserAgent(USER_AGENTS.IOS_CHROME);
    const response = uaParser<{CHROME: string}, IBrowserType>({CHROME: 'CriOS\/([0-9]+)?\\.?([0-9]+)\\.?([0-9]+)\\.?([0-9]+)?'}, 1, 6);
    const result = { type: 'CHROME', version: '83.0.4103.88' };
    expect(response).toEqual(result);
  });

  it(`# ua 값이 없거나, 매칭이 안되는 경우의 결과값은 { type: null, version: '' } 이다.`, () => {
    MockUserAgent(USER_AGENTS.GALAXY_S5);
    const response = uaParser<IBrowserAgents, IBrowserType>(BROWSER_AGENTS, 2, 5, '');
    const result = { type: null, version: '' };
    expect(response).toEqual(result);
  });

});


describe('# @nonoll/code-snippet/browser/browserType Spec Test', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('# browserType 는 function 이다.', () => {
    const type = typeof browserType === 'function';
    expect(type).toEqual(true);
  });

  it('# USER_AGENTS.GALAXY_S5 환경에서 browserType() 의 결과값은 { type: "AOS", version: "5.0.0" } 이다.', () => {
    MockUserAgent(USER_AGENTS.GALAXY_S5);
    const response = browserType();
    const result = { type: 'AOS', version: '5.0.0' };
    expect(response).toEqual(result);
  });

  it('# USER_AGENTS.IPHONE_6_7_8_PLUS 환경에서 browserType() 의 결과값은 { type: "AOS", version: "5.0.0" } 이다.', () => {
    MockUserAgent(USER_AGENTS.IPHONE_6_7_8_PLUS);
    const response = browserType();
    const result = { type: 'IOS', version: '11.0.0' };
    expect(response).toEqual(result);
  });

  it(`# ua 값이 없거나, 매칭이 안되는 경우의 결과값은 { type: null, version: '' } 이다.`, () => {
    MockUserAgent('');
    const response = browserType();
    const result = { type: null, version: '' };
    expect(response).toEqual(result);
  });

});
