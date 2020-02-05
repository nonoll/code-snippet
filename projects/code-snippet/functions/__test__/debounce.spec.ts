import { TestBed } from '@angular/core/testing';

import { debounce } from '../index';

describe('# @nonoll/code-snippet/functions/debounce Spec Test', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('# debounce 는 function 이다.', () => {
    const type = typeof debounce === 'function';
    expect(type).toEqual(true);
  });

  it('# debounce 를 활용하면, delay 시간 이내에 연속 실행시 마지막 1회만 실행된다.', done => {
    const result = 'result';
    const delay = 500 * 1;
    const listener = debounce(res => {
      expect(res).toEqual(result);
      done();
    }, delay);

    listener('1');
    listener('2');
    listener('3');
    listener(`4 ${new Date()}`);

    setTimeout(() => listener(result), delay - 100);
  });

});
