import { TestBed } from '@angular/core/testing';

import { gcd } from '../index';

describe('# @nonoll/code-snippet/math/gcd Spec Test', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('# gcd 는 function 이다.', () => {
    const type = typeof gcd === 'function';
    expect(type).toEqual(true);
  });

  it('# gcd 은, Number 형태를 반환한다', () => {
    const type = typeof gcd(5, 10) === 'number';
    expect(type).toEqual(true);
  });

  it('# gcd 를 활용하면, 최대 공약수를 구한다. 5, 10 의 최대 공약수는 5 이다.', () => {
    const result = 5;
    expect(gcd(5, 10)).toEqual(result);
  });

  it('# gcd 를 활용하면, 최대 공약수를 구한다. 3, 14 의 최대 공약수는 1 이다.', () => {
    const result = 1;
    expect(gcd(3, 14)).toEqual(result);
  });

  it('# gcd 두번째 인자가 0 이면, 첫번째 인자 값을 반환한다.', () => {
    const result = 1;
    expect(gcd(1, 0)).toEqual(result);
  });

});
