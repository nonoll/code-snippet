import { TestBed } from '@angular/core/testing';

import { VisibilityChangeObserver, VISIBILITY_EVENTS } from '../index';

describe('# @nonoll/code-snippet/observer/VisibilityChangeObserver Spec Test', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('# VisibilityChangeObserver 가 정상 생성 된다.', () => {
    const observer: VisibilityChangeObserver = new VisibilityChangeObserver();
    expect(observer).toBeTruthy();
  });

  it('# 브라우저가 활성 상태일 경우, isSupportVisibilityChange 값이 true 가 된다.', () => {
    const result = VisibilityChangeObserver.isSupportVisibilityChange();
    expect(result).toEqual(true);
  });

  describe('# getStatus 기능 확인 Spec Test', () => {
    it('# emit(VISIBILITY_EVENTS.GET_STATUS) 을 활용하여, on(VISIBILITY_EVENTS.CHANGE) 으로 정보를 전달 받을 수 있다.', () => {
      const toEqual = { isHidden: false, isShow: true };
      const observer: VisibilityChangeObserver = new VisibilityChangeObserver();
      observer.on(VISIBILITY_EVENTS.CHANGE, ({ isHidden, isShow }) => {
        expect(isHidden).toEqual(toEqual.isHidden);
        expect(isShow).toEqual(toEqual.isShow);
      });
      observer.attach();
      observer.emit(VISIBILITY_EVENTS.GET_STATUS);
    });

    it('# getStatus 메소드를 활용하여, 정보를 리턴 받을 수 있다.', () => {
      const toEqual = { isHidden: false, isShow: true };
      const observer: VisibilityChangeObserver = new VisibilityChangeObserver();
      const { isHidden, isShow } = observer.getStatus();
      expect(isHidden).toEqual(toEqual.isHidden);
      expect(isShow).toEqual(toEqual.isShow);
    });
  });

  it('# detach 를 실행하면, 이벤트 정보가 수신되지 않는다.', (done: DoneFn) => {
    const observer: VisibilityChangeObserver = new VisibilityChangeObserver();

    let resResolve = null;
    const resPromise = (() => new Promise(resolve => resResolve = resolve))() as Promise<number>;
    let eventCount = 0;

    observer.on(VISIBILITY_EVENTS.CHANGE, () => {
      eventCount++;
    });
    observer.attach();
    observer.emit(VISIBILITY_EVENTS.GET_STATUS);

    observer.detach();
    observer.emit(VISIBILITY_EVENTS.GET_STATUS);
    observer.emit(VISIBILITY_EVENTS.GET_STATUS);

    resPromise.then(res => {
      expect(res).toEqual(1);
      done();
    });

    resResolve(eventCount);
  });

  it('# destroy 를 실행하면, 기능이 해제되고 이벤트 정보가 수신되지 않는다.', (done: DoneFn) => {
    const observer: VisibilityChangeObserver = new VisibilityChangeObserver();

    let resResolve = null;
    const resPromise = (() => new Promise(resolve => resResolve = resolve))() as Promise<number>;
    let eventCount = 0;

    observer.on(VISIBILITY_EVENTS.CHANGE, () => {
      eventCount++;
    });
    observer.attach();
    observer.emit(VISIBILITY_EVENTS.GET_STATUS);

    observer.destroy();
    observer.emit(VISIBILITY_EVENTS.GET_STATUS);
    observer.emit(VISIBILITY_EVENTS.GET_STATUS);

    resPromise.then(res => {
      expect(res).toEqual(1);
      done();
    });

    resResolve(eventCount);
  });

});
