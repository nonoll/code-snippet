import { TestBed } from '@angular/core/testing';

import { wait, MockMatchMedia } from '../../__test__/helper';
import { PrefersColorSchemeObserver, PREFERS_COLOR_SCHEME_EVENTS, PREFERS_COLOR_SCHEME } from '../index';
import { IPrefersColorSchemeStatus } from '../types';

describe('# @nonoll/code-snippet/observer/PrefersColorSchemeObserver Spec Test', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('# PrefersColorSchemeObserver 가 정상 생성 된다.', () => {
    const observer: PrefersColorSchemeObserver = new PrefersColorSchemeObserver();
    expect(observer).toBeTruthy();
  });

  it('# getStatus 로 현재 상태값을 확인할 수 있다.', () => {
    const result = { isDark: true, isLight: false };
    const observer: PrefersColorSchemeObserver = new PrefersColorSchemeObserver();
    MockMatchMedia({ matches: true });
    expect(observer.getStatus()).toEqual(result);
  });

  it('# prefers-color-scheme 변경이 되면, PREFERS_COLOR_SCHEME_EVENTS.CHANGE 이벤트가 발생된다.', (done: DoneFn) => {
    MockMatchMedia(null);

    const result = { isDark: true, isLight: false };
    const observer: PrefersColorSchemeObserver = new PrefersColorSchemeObserver();
    observer.on(PREFERS_COLOR_SCHEME_EVENTS.CHANGE, (res: IPrefersColorSchemeStatus) => {
      expect(res).toEqual(result);
      done();
    });
    observer.attach();

    MockMatchMedia({ matches: true });
    // change 시점 구성이 어려우므로, PREFERS_COLOR_SCHEME_EVENTS.GET_STATUS 을 발생시킨다
    // window.matchMedia('(prefers-color-scheme: dark)').dispatchEvent(new Event('change'));
    observer.emit(PREFERS_COLOR_SCHEME_EVENTS.GET_STATUS);
  });

  it('# destroy 실행시, event listener 감지가 되지 않는다.', async (done: DoneFn) => {
    MockMatchMedia(null);

    const observer: PrefersColorSchemeObserver = new PrefersColorSchemeObserver();

    let resResolve = null;
    const resPromise = (() => new Promise(resolve => resResolve = resolve))() as Promise<number>;
    let eventCount = 0;

    observer.on(PREFERS_COLOR_SCHEME_EVENTS.CHANGE, _ => eventCount++);
    observer.attach();

    MockMatchMedia({ matches: true });
    // change 시점 구성이 어려우므로, PREFERS_COLOR_SCHEME_EVENTS.GET_STATUS 을 발생시킨다
    // window.matchMedia('(prefers-color-scheme: dark)').dispatchEvent(new Event('change'));
    observer.emit(PREFERS_COLOR_SCHEME_EVENTS.GET_STATUS);

    await wait(100);

    MockMatchMedia(null);
    observer.destroy();

    await wait(100);

    MockMatchMedia({ matches: true });
    // change 시점 구성이 어려우므로, PREFERS_COLOR_SCHEME_EVENTS.GET_STATUS 을 발생시킨다
    // window.matchMedia('(prefers-color-scheme: dark)').dispatchEvent(new Event('change'));
    observer.emit(PREFERS_COLOR_SCHEME_EVENTS.GET_STATUS);

    resPromise.then(res => {
      expect(res).toEqual(1);
      done();
    });

    resResolve(eventCount);
  });

});
