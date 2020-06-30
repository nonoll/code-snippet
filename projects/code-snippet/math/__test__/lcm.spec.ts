import { TestBed } from '@angular/core/testing';

import { lcm } from '../index';

describe('# @nonoll/code-snippet/math/lcm Spec Test', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('# lcm 는 function 이다.', () => {
    const type = typeof lcm === 'function';
    expect(type).toEqual(true);
  });

  it('# lcm 은, Number 형태를 반환한다', () => {
    const type = typeof lcm(5, 10) === 'number';
    expect(type).toEqual(true);
  });

  it('# lcm 를 활용하면, 최소 공배수를 구한다. 5, 10 의 최소 공배수는 10 이다.', () => {
    const result = 10;
    expect(lcm(5, 10)).toEqual(result);
  });

  it('# lcm 를 활용하면, 최대 공배수를 구한다. 3, 14 의 최소 공배수는 42 이다.', () => {
    const result = 42;
    expect(lcm(3, 14)).toEqual(result);
  });

});
