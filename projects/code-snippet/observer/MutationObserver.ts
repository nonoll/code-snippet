import { TypeVoidFunction } from '../types/voidFunction';
import { EventEmitter } from '../event/EventEmitter';
import { debounce as _debounce } from '../functions/debounce';
import { noop } from '../functions/noop';

interface MutationObserverInit {
  childList?: boolean;
  attributes?: boolean;
  characterData?: boolean;
  subtree?: boolean;
  attributeOldValue?: boolean;
  characterDataOldValue?: boolean;
  attributeFilter?: string[];
}

interface MutationObserverExtOption {
  target: HTMLElement;
  debounce?: number;
  callback?: TypeVoidFunction;
  options?: MutationObserverInit;
}

/**
 * MutationRecordType
 * @export
 * @readonly
 * @enum {string}
 * @see https://developer.mozilla.org/ko/docs/Web/API/MutationObserver#MutationObserverInit
 */
export enum MutationRecordType {
  childList = 'childList',
  attributes = 'attributes',
  characterData = 'characterData',
  subtree = 'subtree'
}

/**
 * MutationEvent Types
 * @export
 * @readonly
 * @enum {string}
 */
export enum MUTATION_EVENTS {
  /** change childList */
  CHANGE_CHILD_LIST = 'MUTATION_OBERSERVER-EVENTS-CHANGE_CHILD_LIST',
  /** change subtree */
  CHANGE_SUBTREE = 'MUTATION_OBERSERVER-EVENTS-CHANGE_SUBTREE',
  /** change attributes */
  CHANGE_ATTRIBUTES = 'MUTATION_OBERSERVER-EVENTS-CHANGE_ATTRIBUTES',
  /** change characterData */
  CHANGE_CHARACTER_DATA = 'MUTATION_OBERSERVER-EVENTS-CHANGE_CHARACTER_DATA',
  /** change other case */
  CHANGE = 'MUTATION_OBERSERVER-EVENTS-CHANGE',
  /** change wildcard - all case */
  WILD_CARD = 'MUTATION_OBERSERVER-EVENTS-CHANGE_WILCD_CARD'
}

class PureMutationObserver {
  private pure;

  constructor(callback: MutationCallback) {
    // TODO polyfill
    // const MutationObserver = require('mutation-observer');
    // this.pure = new MutationObserver(callback);
    this.pure = new (window as any).MutationObserver(callback);
  }

  public observe(target, options: MutationObserverInit): void {
    this.pure.observe(target, options);
  }

  public disconnect(): void {
    this.pure.disconnect();
  }
}

/**
 * @export
 * @class MutationObserver
 * @extends EventEmitter
 * @see https://developer.mozilla.org/ko/docs/Web/API/MutationObserver
 * @see https://github.com/webmodules/mutation-observer
 * @example
 * import { MutationObserver, MUTATION_EVENTS } from '@nonoll/my-lib/observer';
 *
 * const createElement = ({ tag = 'div', id = '', style = '', value = '', text = '' }) => {
 *  const doc = window.document;
 *  const target = doc.createElement(tag);
 *  target.setAttribute('id', id);
 *  target.setAttribute('style', style);
 *  target.setAttribute('value', value);
 *  if (text) {
 *    target.textContent = text;
 *  }
 *  return target;
 * }
 *
 * const forExample = () => {
 *  const doc = window.document;
 *
 *  const attachButton = createElement({ tag: 'button', text: 'observer attach' });
 *  const detachButton = createElement({ tag: 'button', text: 'observer detach' });
 *  const appendButton = createElement({ tag: 'button', text: 'append' });
 *
 *  doc.body.appendChild(attachButton);
 *  doc.body.appendChild(detachButton);
 *  doc.body.appendChild(appendButton);
 *
 *  attachButton.addEventListener('click', e => {
 *    e.preventDefault();
 *    console.log('attachButton clicked');
 *    if (!observer) {
 *      return;
 *    }
 *    observer.attach();
 *  });
 *
 *  detachButton.addEventListener('click', e => {
 *    e.preventDefault();
 *    console.log('detachButton clicked');
 *    if (!observer) {
 *      return;
 *    }
 *    observer.detach();
 *  });
 *
 *  appendButton.addEventListener('click', e => {
 *    e.preventDefault();
 *    console.log('appendButton clicked');
 *    if (!observer) {
 *      return;
 *    }
 *    const input = createElement({ tag: 'input', value: `${+new Date()}` });
 *    target.appendChild(input);
 *  });
 * }
 *
 * const target = createElement({ id: 'example_target', style: 'border: 1px solid red' });
 * window.document.body.appendChild(target);
 *
 * const options = {
 *  childList: true,
 *  subtree: true
 * };
 *
 * const observer = new MutationObserver({ target, options });
 * observer.on(MUTATION_EVENTS.WILD_CARD, (type, values) => {
 *  console.log('wildCard', type, values);
 * }).on(MUTATION_EVENTS.CHANGE_CHILD_LIST, values => {
 *  console.log('childList', values);
 * });
 * observer.attach();
 *
 * forExample();
 */
export class MutationObserver extends EventEmitter {
  private target: HTMLElement;
  private callback: TypeVoidFunction;
  private observer: PureMutationObserver;
  private options: MutationObserverInit;

  constructor({ target = null, debounce = 300, callback = noop, options = {} }: MutationObserverExtOption) {
    super();

    const defaultOptions = { childList: true, subtree: true };

    this.target = target;
    this.options = Object.assign({}, defaultOptions, options);
    this.onMutationObserverListener = this.onMutationObserverListener.bind(this);
    this.callback = callback || noop;

    if (debounce) {
      this.observer = new PureMutationObserver(_debounce(this.onMutationObserverListener, debounce) as MutationCallback);
    } else {
      this.observer = new PureMutationObserver(this.onMutationObserverListener);
    }
  }

  public attach(): MutationObserver {
    this.observer.observe(this.target, this.options);
    return this;
  }

  private onMutationObserverListener(mutations: MutationRecord[]): void {
    mutations.forEach(mutation => {
      const type = mutation.type as MutationRecordType;
      const values = { type, mutation };

      switch (type) {
        case MutationRecordType.childList:
          this.callback(values);
          this.emit(MUTATION_EVENTS.CHANGE_CHILD_LIST, values);
          this.emit(MUTATION_EVENTS.WILD_CARD, type, values);
          break;

        case MutationRecordType.subtree:
          this.callback(values);
          this.emit(MUTATION_EVENTS.CHANGE_SUBTREE, values);
          this.emit(MUTATION_EVENTS.WILD_CARD, type, values);
          break;

        case MutationRecordType.attributes:
          this.callback(values);
          this.emit(MUTATION_EVENTS.CHANGE_ATTRIBUTES, values);
          this.emit(MUTATION_EVENTS.WILD_CARD, type, values);
          break;

        case MutationRecordType.characterData:
          this.callback(values);
          this.emit(MUTATION_EVENTS.CHANGE_CHARACTER_DATA, values);
          this.emit(MUTATION_EVENTS.WILD_CARD, type, values);
          break;

        default:
          this.callback(values);
          this.emit(MUTATION_EVENTS.CHANGE, type, values);
          this.emit(MUTATION_EVENTS.WILD_CARD, type, values);
          break;
      }
    });
  }

  public detach(): MutationObserver {
    if (this.observer) {
      this.observer.disconnect();
    }
    return this;
  }

  public destroy(): MutationObserver {
    this.detach();
    this.observer = null;
    return this;
  }
}
