import { TestBed } from '@angular/core/testing';

import { deepFreeze } from '../index';

describe('# @nonoll/code-snippet/functions/deepFreeze Spec Test', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('# deepFreeze 는 function 이다.', () => {
    const type = typeof deepFreeze === 'function';
    expect(type).toEqual(true);
  });

  it('# freeze, 정상 동작 확인.', () => {
    const typeObject = {
      a: '1',
      b: 1,
      c: {
        d: [11, 22, 33]
      }
    };
    const freezeObject = deepFreeze(typeObject);

    // freeze 설정이 정상적으로 이루어지면 error 가 발생 하므로, try ~ catch 처리
    try {
      freezeObject.a = '1234';
      freezeObject.b = 1234;
      freezeObject.c.d = [1];
    } catch (e) {}

    expect(freezeObject.a).toEqual(typeObject.a);
    expect(freezeObject.b).toEqual(typeObject.b);
    expect(freezeObject.c.d).toEqual(typeObject.c.d);
  });

  it('# freeze 는 유효하지 않은 형태를 설정하면 에러가 발생한다.', (done: DoneFn) => {
    const typeObject = new Map();

    try {
      deepFreeze(typeObject);
    } catch (e) {
      expect(e.message).toEqual('not allow types');
      done();
    }
  });

});
