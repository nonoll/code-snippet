import { TestBed } from '@angular/core/testing';

import { sizeRatio } from '../index';

describe('# @nonoll/code-snippet/math/sizeRatio Spec Test', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('# sizeRatio 는 function 이다.', () => {
    const type = typeof sizeRatio === 'function';
    expect(type).toEqual(true);
  });

  it('# sizeRatio 는 { width, height, ratio } 를 반환한다', () => {
    const input = { width: 720, height: 720 };
    const result = sizeRatio(input);
    expect(result.width).toBeTruthy();
    expect(result.height).toBeTruthy();
    expect(result.ratio).toBeTruthy();
  });

  it('# sizeRatio({ width: 720, height: 720 }) 은 1x1 비율이다.', () => {
    const input = { width: 720, height: 720 };
    const result = '1x1';
    expect(sizeRatio(input).ratio).toEqual(result);
  });

  it('# sizeRatio({ width: 1024, height: 768 }) 은 4x3 비율이다.', () => {
    const input = { width: 1024, height: 768 };
    const result = '4x3';
    expect(sizeRatio(input).ratio).toEqual(result);
  });

  it('# sizeRatio({ width: 1280, height: 1024 }) 은 5x4 비율이다.', () => {
    const input = { width: 1280, height: 1024 };
    const result = '5x4';
    expect(sizeRatio(input).ratio).toEqual(result);
  });

  it('# sizeRatio({ width: 1920, height: 1080 }) 은 16x9 비율이다.', () => {
    const input = { width: 1920, height: 1080 };
    const result = '16x9';
    expect(sizeRatio(input).ratio).toEqual(result);
  });

  it('# sizeRatio({ width: 1920, height: 1200 }) 은 16x10(8x5) 비율이다.', () => {
    const input = { width: 1920, height: 1200 };
    const result = '8x5';
    expect(sizeRatio(input).ratio).toEqual(result);
  });

});
