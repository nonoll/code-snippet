import { TestBed } from '@angular/core/testing';

import { throttle } from '../index';

describe('# @nonoll/code-snippet/functions/throttle Spec Test', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('# throttle 은 function 이다.', () => {
    const type = typeof throttle === 'function';
    expect(type).toEqual(true);
  });

  it('# throttle 를 활용하면, delay 시간 이내에 연속 실행시 첫번째 1회만 실행된다.', done => {
    const result = 'result';
    const delay = 500 * 1;
    const listener = throttle(res => {
      expect(res).toEqual(result);
      done();
    }, delay);

    listener(result);
    listener('2');
    listener('3');
    listener(`4 ${new Date()}`);

    setTimeout(() => listener('5'), delay - 100);
  });

});
