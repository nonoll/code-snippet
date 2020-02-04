import { TestBed } from '@angular/core/testing';

import { vendorPrefix } from '../index';

const COMPUTED_STYLES = {
  CHROME: '{\"194\":\"-webkit-hyphenate-character\"}',
  FIRE_FOX: '{\"324\":\"-moz-appearance\"}'
};

const original = window.getComputedStyle;
const mockComputedStyle = data => {
  if (data) {
    window.getComputedStyle = () => data as CSSStyleDeclaration;
  } else {
    window.getComputedStyle = original;
  }
};

describe('# @nonoll/code-snippet/browser/vendorPrefix Spec Test', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('# vendorPrefix 는 function 이다.', () => {
    const type = typeof vendorPrefix === 'function';
    expect(type).toEqual(true);
  });

  it('# vendorPrefix() 는 { dom, lowercase, css, js } 를 반환한다.', () => {
    const keys = ['dom', 'lowercase', 'css', 'js'];
    keys.forEach(key => {
      expect(vendorPrefix().hasOwnProperty(key)).toEqual(true);
    });
  });

  it('# Chrome 에서 vendorPrefix() 결과값은 Webkit prefix 를 반환한다.', () => {
    mockComputedStyle(COMPUTED_STYLES.CHROME);
    const toEqual = {dom: 'Webkit', lowercase: 'webkit', css: '-webkit-', js: 'Webkit'};
    expect(vendorPrefix()).toEqual(toEqual);
  });

  it('# Firefox 에서 prefix() 결과값은 Moz prefix 를 반환한다.', () => {
    mockComputedStyle(COMPUTED_STYLES.FIRE_FOX);
    const toEqual = {dom: 'Moz', lowercase: 'moz', css: '-moz-', js: 'Moz'};
    expect(vendorPrefix()).toEqual(toEqual);
  });

});
