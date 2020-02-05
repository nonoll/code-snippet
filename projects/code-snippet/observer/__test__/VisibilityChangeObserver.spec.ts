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

  it('# getStatus 기능 확인, 브라우저가 활성 상태일 경우 { isHidden: false, isShow: true } 값을 전달 받는다.', () => {
    const toEqual = { isHidden: false, isShow: true };
    const observer: VisibilityChangeObserver = new VisibilityChangeObserver();
    observer.on(VISIBILITY_EVENTS.CHANGE, ({ isHidden, isShow }) => {
      expect(isHidden).toEqual(toEqual.isHidden);
      expect(isShow).toEqual(toEqual.isShow);
    });
    observer.attach();
    observer.emit(VISIBILITY_EVENTS.GET_STATUS);
  });
});
