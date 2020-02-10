import { TypeVoidFunction } from '../types';

/**
 * Event Interface
 * @alias IEvent
 * @interface
 * @property {String} eventName - 이벤트 명
 * @property {TypeVoidFunction} [listener] - listener function
 * @property {any} [context] - context
 */
export interface IEvent {
  eventName: string;
  listener?: TypeVoidFunction;
  context?: any;
}
