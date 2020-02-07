import { TestBed } from '@angular/core/testing';

import { EventEmitter } from '../index';

describe('# @nonoll/code-snippet/event/EventEmitter Spec Test', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('# EventEmitter 는 on, once, off, fire, emit 메소드를 사용할 수 있다.', () => {
    const ee = new EventEmitter();

    expect(ee.on).toBeTruthy();
    expect(ee.once).toBeTruthy();
    expect(ee.off).toBeTruthy();
    expect(ee.fire).toBeTruthy();
    expect(ee.emit).toBeTruthy();
  });

  it('# on 을 활용하면, 이벤트를 통해 값을 전달 받을 수 있다.', () => {
    const ee = new EventEmitter();
    const eventName = 'EVENT_ON_TEST';
    const emitValue = {a: 'a', b: 1, c: []};
    let resResolve = null;
    const resPromise = (() => new Promise(resolve => resResolve = resolve))() as Promise<number>;
    let eventCount = 0;

    expect(ee.off).toBeTruthy();

    ee.on(eventName, _ => eventCount++);
    ee.emit(eventName, emitValue);
    ee.emit(eventName, emitValue);

    resPromise.then(res => expect(res).toEqual(2));
    resResolve(eventCount);
  });

  it('# once 을 활용하면, 1회만 이벤트를 전달 받을 수 있다.', () => {
    const ee = new EventEmitter();
    const eventName = 'EVENT_ONCE_TEST';
    const emitValue = {a: 'a', b: 1, c: []};
    let resResolve = null;
    const resPromise = (() => new Promise(resolve => resResolve = resolve))() as Promise<number>;
    let eventCount = 0;

    expect(ee.once).toBeTruthy();

    ee.once(eventName, res => {
      eventCount++;
      expect(res).toEqual(emitValue);
    });
    ee.emit(eventName, emitValue);
    ee.emit(eventName, emitValue);

    resPromise.then(res => expect(res).toEqual(1));
    resResolve(eventCount);
  });

  it('# off 을 활용하면, 이벤트를 수신을 해제할 수 있다.', () => {
    const ee = new EventEmitter();
    const eventName = 'EVENT_OFF_TEST';
    const emitValue = {a: 'a', b: 1, c: []};
    let resResolve = null;
    const resPromise = (() => new Promise(resolve => resResolve = resolve))() as Promise<number>;
    let eventCount = 0;

    expect(ee.off).toBeTruthy();

    ee.on(eventName, res => {
      eventCount++;
      expect(res).toEqual(emitValue);
      ee.off(eventName);
    });
    ee.emit(eventName, emitValue);
    ee.emit(eventName, emitValue);

    resPromise.then(res => expect(res).toEqual(1));
    resResolve(eventCount);
  });

  it('# off 시에, 등록되지 않은 이벤트를 해제하면 false 를 반환한다.', () => {
    const ee = new EventEmitter();
    const registEvent = 'EVENT_OFF_REGIST';
    const notRegistEvent = 'EVENT_OFF_NOT_REGIST';
    ee.on(registEvent);

    expect(ee.off(registEvent)).toEqual(ee);
    expect(ee.off(notRegistEvent)).toEqual(false);
  });

  it('# fire 을 활용하면, 이벤트를 전파할 수 있다.', () => {
    const ee = new EventEmitter();
    const eventName = 'EVENT_FIRE_TEST';
    const emitValue = {a: 'a', b: 1, c: []};

    ee.on(eventName, res => expect(res).toEqual(emitValue));
    ee.fire(eventName, emitValue);
  });

  it('# emit 을 활용하면, 이벤트를 전파할 수 있다.', () => {
    const ee = new EventEmitter();
    const eventName = 'EVENT_EMIT_TEST';
    const emitValue = {a: 'a', b: 1, c: []};

    ee.on(eventName, res => expect(res).toEqual(emitValue));
    ee.emit(eventName, emitValue);
  });

});
