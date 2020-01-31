import { TypeVoidFunction } from '../types/voidFunction';
import { noop } from '../functions/noop';

/**
 * Event Interface
 * @memberof EventEmitter
 * @typedef
 * @property - 이벤트 명
 * @property - listener function
 * @property - context
 */
interface IEvent {
  eventName: string;
  listener?: TypeVoidFunction;
  context?: any;
}

/**
 * @export
 * @class EventEmitter
 * @alias event/EventEmitter
 * @memberof event
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
  on(eventName: string, listener: TypeVoidFunction = noop, context?: any): EventEmitter {
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
  off(eventName: string, listener?: TypeVoidFunction): EventEmitter {
    // tslint:disable-next-line: max-line-length
    const matched = this.events.findIndex(regEvent => regEvent.eventName === eventName && (listener ? regEvent.listener === listener : true));
    // tslint:disable-next-line: no-bitwise
    if (!~matched) {
      return;
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
  once(eventName: string, listener: TypeVoidFunction = noop, context?: any): EventEmitter {
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
   * @param {...any[]} values
   * @returns {EventEmitter}
   * @memberof EventEmitter
   */
  fire(eventName: string, ...values: any[]): EventEmitter {
    this.emit(eventName, values);
    return this;
  }
}
