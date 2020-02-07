import { TestBed } from '@angular/core/testing';

import { isSupportPassive, getPassiveOption } from '../index';

describe('# @nonoll/code-snippet/browser/isSupportPassive Spec Test', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  describe('# isSupportPassive Spec Test', () => {
    it('# isSupportPassive 는 function 이다.', () => {
      const type = typeof isSupportPassive === 'function';
      expect(type).toEqual(true);
    });
  });

  describe('# getPassiveOption Spec Test', () => {
    it('# getPassiveOption 는 function 이다.', () => {
      const type = typeof getPassiveOption === 'function';
      expect(type).toEqual(true);
    });

    if (isSupportPassive()) {
      it('# passive 를 지원할 경우, IPassive 규격으로 반환 한다.', () => {
        expect(getPassiveOption()).toEqual({ passive: true });
      });
    } else {
      it('# passive 를 지원할 하지 않을 경우, false 이다.', () => {
        expect(getPassiveOption()).toEqual(false);
      });
    }
  });

});
