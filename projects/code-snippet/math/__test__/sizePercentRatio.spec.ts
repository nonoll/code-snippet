import { TestBed } from '@angular/core/testing';

import { sizePercentRatio } from '../index';

describe('# @nonoll/code-snippet/math/sizePercentRatio Spec Test', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('# sizePercentRatio 는 function 이다.', () => {
    const type = typeof sizePercentRatio === 'function';
    expect(type).toEqual(true);
  });

  it('# sizePercentRatio({ width: 720, height: 720 }) 의, ratio 는 100.00 이다.', () => {
    const input = { width: 720, height: 720 };
    const result = '100.00';
    expect(sizePercentRatio(input).ratio).toEqual(result);
  });

  it('# sizePercentRatio({ width: 1024, height: 768 }) 의, ratio 는 75.00 이다.', () => {
    const input = { width: 1024, height: 768 };
    const result = '75.00';
    expect(sizePercentRatio(input).ratio).toEqual(result);
  });

  it('# sizePercentRatio({ width: 1280, height: 1024 }) 의, ratio 는 80.00 이다.', () => {
    const input = { width: 1280, height: 1024 };
    const result = '80.00';
    expect(sizePercentRatio(input).ratio).toEqual(result);
  });

  it('# sizePercentRatio({ width: 1920, height: 1080 }) 의, ratio 는 56.25 이다.', () => {
    const input = { width: 1920, height: 1080 };
    const result = '56.25';
    expect(sizePercentRatio(input).ratio).toEqual(result);
  });

  it('# sizePercentRatio({ width: 1920, height: 1200 }) 의, ratio 는 62.50 이다.', () => {
    const input = { width: 1920, height: 1200 };
    const result = '62.50';
    expect(sizePercentRatio(input).ratio).toEqual(result);
  });

});
