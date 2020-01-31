import { TypeVoidFunction } from '../types/voidFunction';
import { noop } from '../functions/noop';

interface IEvent {
  eventName: string;
  listener?: TypeVoidFunction;
  context?: any;
}

export class EventEmitter {
  private events: Array<IEvent> = [];

  constructor() {}

  on(eventName: string, listener: TypeVoidFunction = noop, context?: any): EventEmitter {
    this.events.push({ eventName, listener, context });
    return this;
  }

  off(eventName: string, listener?: TypeVoidFunction): EventEmitter {
    const matched = this.events.findIndex(regEvent => regEvent.eventName === eventName && (listener ? regEvent.listener === listener : true));
    if (!~matched) {
      return;
    }
    this.events.splice(matched, 1);
    return this;
  }

  once(eventName: string, listener: TypeVoidFunction = noop, context?: any): EventEmitter {
    const onceWrapper = (...values: any) => {
      this.off(eventName, onceWrapper);
      listener.apply(context || listener, values);
    };
    this.on(eventName, onceWrapper, context);
    return this;
  }

  emit(eventName: string, ...values: any[]): EventEmitter {
    this.events.forEach(regEvent => {
      if (regEvent.eventName === eventName) {
        regEvent.listener.apply(regEvent.context || regEvent.listener, values);
      }
    });
    return this;
  }

  fire(eventName: string, ...values: any[]): EventEmitter {
    this.emit(eventName, values);
    return this;
  }
}
