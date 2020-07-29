import { TypeVoidFunction } from '../types/voidFunction';
import { noop } from '../functions';
import { IEvent } from './types';

/**
 * EventEmitter 의 기능과 동일한 맥락으로, 간단히 구성
  <iframe
    src="https://codesandbox.io/embed/nonollcode-snippet-9gko8?autoresize=1&expanddevtools=1&fontsize=14&hidenavigation=1&initialpath=%2Fevent-EventEmitter.html&module=%2Fevent-EventEmitter.html&theme=dark"
    style="width:100%; height:500px; border:1px solid black; border-radius: 4px; overflow:hidden;"
    title="@nonoll/code-snippet"
    allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
    sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
  ></iframe>
 * @export
 * @class EventEmitter
 * @alias event/EventEmitter
 * @memberof event
 * @see https://www.npmjs.com/package/events
 * @example
import { EventEmitter } from '@nonoll/code-snippet/event';

const createElement = ({ tag = 'div', id = '', style = '', value = '', text = '' }) => {
  const doc = window.document;
  const target = doc.createElement(tag);
  target.setAttribute('id', id);
  target.setAttribute('style', style);
  target.setAttribute('value', value);
  if (text) {
    target.textContent = text;
  }
  return target;
}

let ee;
const forExample = () => {
  const doc = window.document;

  const onButton = createElement({ tag: 'button', text: 'on button' });
  const offButton = createElement({ tag: 'button', text: 'off button' });
  const emitButton = createElement({ tag: 'button', text: 'emit button' });
  const EVENT_NAME = 'EVENT_EXAMPLE';

  doc.body.appendChild(onButton);
  doc.body.appendChild(offButton);
  doc.body.appendChild(emitButton);

  ee = new EventEmitter();
  ee.on(EVENT_NAME, res => console.log(res));

  onButton.addEventListener('click', e => {
    e.preventDefault();
    console.log('onButton clicked');
    if (!ee) {
      return;
    }
    ee.off(EVENT_NAME);
    ee.on(EVENT_NAME, res => console.log(res));
  });

  offButton.addEventListener('click', e => {
    e.preventDefault();
    console.log('offButton clicked');
    if (!ee) {
      return;
    }
    ee.off(EVENT_NAME);
  });

  emitButton.addEventListener('click', e => {
    e.preventDefault();
    console.log('emitButton clicked');
    if (!ee) {
      return;
    }
    ee.emit(EVENT_NAME, new Date());
  });
}

forExample();
 */
export class EventEmitter {
  private events: Array<IEvent> = [];

  constructor() {}

  /**
   * 이벤트 감지 등록
   * @param {string} eventName
   * @param {TypeVoidFunction} [listener={@link noop}]
   * @param {*} [context]
   * @returns {EventEmitter}
   * @memberof EventEmitter
   */
  on(eventName: string, /* istanbul ignore next: for noop */ listener: TypeVoidFunction = noop, context?: any): EventEmitter {
    this.events.push({ eventName, listener, context });
    return this;
  }

  /**
   * 이벤트 감지 해제
   * @param {string} eventName
   * @param {TypeVoidFunction} [listener]
   * @returns {EventEmitter}
   * @memberof EventEmitter
   */
  off(eventName: string, listener?: TypeVoidFunction): EventEmitter | false {
    // tslint:disable-next-line: max-line-length
    const matched = this.events.findIndex(regEvent => regEvent.eventName === eventName && (listener ? regEvent.listener === listener : true));
    // tslint:disable-next-line: no-bitwise
    if (!~matched) {
      return false;
    }
    this.events.splice(matched, 1);
    return this;
  }

  /**
   * 이벤트 1회 감지 등록
   * @param {string} eventName
   * @param {TypeVoidFunction} [listener={@link noop}]
   * @param {*} [context]
   * @returns {EventEmitter}
   * @memberof EventEmitter
   */
  once(eventName: string, /* istanbul ignore next: for noop */ listener: TypeVoidFunction = noop, context?: any): EventEmitter {
    const onceWrapper = (...values: any) => {
      this.off(eventName, onceWrapper);
      listener.apply(context || listener, values);
    };
    this.on(eventName, onceWrapper, context);
    return this;
  }

  /**
   * 이벤트 전파
   * @param {string} eventName
   * @param {...any[]} values
   * @returns {EventEmitter}
   * @memberof EventEmitter
   */
  emit(eventName: string, ...values: any[]): EventEmitter {
    this.events.forEach(regEvent => {
      if (regEvent.eventName === eventName) {
        regEvent.listener.apply(regEvent.context || regEvent.listener, values);
      }
    });
    return this;
  }

  /**
   * 이벤트 전파
   * @param {string} eventName
   * @param {any} values
   * @returns {EventEmitter}
   * @memberof EventEmitter
   */
  fire(eventName: string, values: any): EventEmitter {
    this.emit(eventName, values);
    return this;
  }
}
