import { wait } from '@/__tests__/helper';
import { Component } from '@/components';

describe('# @nonoll/components/Component Spec Test', () => {
  beforeEach(() => {});

  test('# Component 는 function 이다.', () => {
    const type = typeof Component === 'function';
    expect(type).toEqual(true);
  });

  test('# Component.element 는 div element 를 반환한다', () => {
    const component = new Component();
    expect(component.element.nodeName).toEqual('DIV');
  });

  test('# wait, async 테스트', async (done) => {
    const component = new Component();
    await wait(100);
    expect(component.element.nodeName).toEqual('DIV');
    done();
  });

});
