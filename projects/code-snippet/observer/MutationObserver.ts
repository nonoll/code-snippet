import { TypeVoidFunction } from '../types';
import { EventEmitter } from '../event';
import { debounce as _debounce, noop } from '../functions';

/**
 * pure MutationObserver init options
 * @memberof MutationObserver
 * @typedef
 * @property - target 의 하위 요소 추가 / 삭제 감지 유무
 * @property - target 의 속성 변경 감지 유무
 * @property - target 의 데이터 변경 감지 유무
 * @property - target 의 하위 요소 변경 사항 감지 유무
 * @property - target 의 ...
 * @property - target 의 ...
 * @property - target 의 ... [MDN attributeFilter]{@link https://developer.mozilla.org/en-US/docs/Web/API/MutationObserverInit/attributeFilter}
 * @see https://developer.mozilla.org/ko/docs/Web/API/MutationObserver#MutationObserverInit
 */
interface IMutationObserverInit {
  childList?: boolean;
  attributes?: boolean;
  characterData?: boolean;
  subtree?: boolean;
  attributeOldValue?: boolean;
  characterDataOldValue?: boolean;
  attributeFilter?: string[];
}

/**
 * MutationObserver init options
 * @memberof MutationObserver
 * @typedef
 * @property - 감지할 element
 * @property - 이벤트 debounce 값
 * @property - 이벤트 callback
 * @property - 세부 MutationObserver options
 */
interface IMutationObserverExtOption {
  target: HTMLElement;
  debounce?: number;
  callback?: TypeVoidFunction;
  options?: IMutationObserverInit;
}


/**
 * @typedef {String} MutationRecordType
 * @alias MutationRecordType
 * @memberof MutationObserver
 * @see https://developer.mozilla.org/ko/docs/Web/API/MutationObserver#MutationObserverInit
 * @property {String} childList
 * @property {String} attributes
 * @property {String} characterData
 * @property {String} subtree
 */
// for jsdoc
/**
 * @export
 * @readonly
 * @enum {MutationRecordType}
 */
export enum MutationRecordType {
  childList = 'childList',
  attributes = 'attributes',
  characterData = 'characterData',
  subtree = 'subtree'
}


/**
 * MutationEvent Types
 * @event MutationObserver#MUTATION_EVENTS
 * @memberof MutationObserver
 * @property {String} CHANGE_CHILD_LIST - childList 변경 시점
 * @property {String} CHANGE_SUBTREE - subtree 변경 시점
 * @property {String} CHANGE_ATTRIBUTES - attributes 변경 시점
 * @property {String} CHANGE_CHARACTER_DATA - data 변경 시점
 * @property {String} CHANGE - 기타 변경 시점
 * @property {String} WILD_CARD - 모든 변경 시점
 */
// for jsdoc
/**
 * @export
 * @readonly
 * @enum {MUTATION_EVENTS}
 */
export enum MUTATION_EVENTS {
  CHANGE_CHILD_LIST = 'MUTATION_OBERSERVER-EVENTS-CHANGE_CHILD_LIST',
  CHANGE_SUBTREE = 'MUTATION_OBERSERVER-EVENTS-CHANGE_SUBTREE',
  CHANGE_ATTRIBUTES = 'MUTATION_OBERSERVER-EVENTS-CHANGE_ATTRIBUTES',
  CHANGE_CHARACTER_DATA = 'MUTATION_OBERSERVER-EVENTS-CHANGE_CHARACTER_DATA',
  CHANGE = 'MUTATION_OBERSERVER-EVENTS-CHANGE',
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
 * target 으로 설정된 element 의 변화를 감지
  <iframe
    src="https://codesandbox.io/embed/nonollcode-snippet-9gko8?autoresize=1&expanddevtools=1&fontsize=14&hidenavigation=1&initialpath=%2Fobserver-MutationObserver.html&module=%2Fobserver-MutationObserver.html&theme=dark"
    style="width:100%; height:500px; border:1px solid black; border-radius: 4px; overflow:hidden;"
    title="@nonoll/code-snippet"
    allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
    sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
  ></iframe>
 * @export
 * @class MutationObserver
 * @alias observer/MutationObserver
 * @extends EventEmitter
 * @see https://developer.mozilla.org/ko/docs/Web/API/MutationObserver
 * @see https://github.com/webmodules/mutation-observer
 * @see https://developer.mozilla.org/ko/docs/Web/API/MutationObserver#MutationObserverInit
 * @param {Partial<IMutationObserverExtOption>} option
 * @param {HTMLElement} [option.target=null] target
 * @param {Number} [option.debounce=300] debounce
 * @param {Function|null} [option.callback={@link noop}] callback function
 * @param {Object} [option.options={}]
 * @param {Boolean} [option.options.childList]
 * @param {Boolean} [option.options.attributes]
 * @param {Boolean} [option.options.characterData]
 * @param {Boolean} [option.options.subtree]
 * @param {Boolean} [option.options.attributeOldValue]
 * @param {Boolean} [option.options.characterDataOldValue]
 * @param {Array.<String>} [option.options.attributeFilter] [MDN attributeFilter]{@link https://developer.mozilla.org/en-US/docs/Web/API/MutationObserverInit/attributeFilter}
 * @example
import { MutationObserver, MUTATION_EVENTS } from '@nonoll/code-snippet/observer';

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

let observer;

const forExample = () => {
  if (observer) {
    console.log('already example');
    return;
  }

  const doc = window.document;

  const target = createElement({ id: 'example_target', style: 'border: 1px solid red' });
  doc.body.appendChild(target);

  const options = {
    childList: true,
    subtree: true
  };

  observer = new MutationObserver({ target, options });

  observer.on(MUTATION_EVENTS.WILD_CARD, (type, values) => {
    console.log('wildCard', type, values);
  }).on(MUTATION_EVENTS.CHANGE_CHILD_LIST, values => {
    console.log('childList', values);
  });

  observer.attach();

  const attachButton = createElement({ tag: 'button', text: 'observer attach' });
  const detachButton = createElement({ tag: 'button', text: 'observer detach' });
  const appendButton = createElement({ tag: 'button', text: 'append' });

  doc.body.appendChild(attachButton);
  doc.body.appendChild(detachButton);
  doc.body.appendChild(appendButton);

  attachButton.addEventListener('click', e => {
    e.preventDefault();
    console.log('attachButton clicked');
    if (!observer) {
      return;
    }
    observer.attach();
  });

  detachButton.addEventListener('click', e => {
    e.preventDefault();
    console.log('detachButton clicked');
    if (!observer) {
      return;
    }
    observer.detach();
  });

  appendButton.addEventListener('click', e => {
    e.preventDefault();
    console.log('appendButton clicked');
    if (!observer) {
      return;
    }
    const input = createElement({ tag: 'input', value: `${+new Date()}` });
    target.appendChild(input);
  });
}

forExample();
 */
export class MutationObserver extends EventEmitter {
  private target: HTMLElement;
  private callback: TypeVoidFunction;
  private observer: PureMutationObserver;
  private options: MutationObserverInit;

  constructor({ target = null, debounce = 300, callback = noop, options = {} }: Partial<IMutationObserverExtOption>) {
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

  /**
   * 이벤트 감지 설정
   * @returns {MutationObserver}
   * @memberof MutationObserver
   * @example
   observer.attach();
   */
  public attach(): MutationObserver {
    this.observer.observe(this.target, this.options);
    return this;
  }

  /**
   * 이벤트 감지 등록
   * @override
   * @param {string} eventName
   * @param {TypeVoidFunction} [listener={@link noop}]
   * @param {*} [context]
   * @memberof MutationObserver
   * @listens MutationObserver#MUTATION_EVENTS
   * @returns {MutationObserver}
   */
  public on(eventName: string, listener: TypeVoidFunction = noop, context?: any): MutationObserver {
    super.on(eventName, listener, context);
    return this;
  }

  /**
   * 변화 감지 이벤트 리스너
   * @private
   * @param {MutationRecord[]} mutations [MDN MutationRecord]{@link https://developer.mozilla.org/en-US/docs/Web/API/MutationRecord}
   * @memberof MutationObserver
   * @fires MutationObserver#MUTATION_EVENTS
   */
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

  /**
   * 이벤트 감지 해제
   * @returns {MutationObserver}
   * @memberof MutationObserver
   * @example
   observer.detach();
   */
  public detach(): MutationObserver {
    if (this.observer) {
      this.observer.disconnect();
    }
    return this;
  }

  /**
   * destory
   * @returns {MutationObserver}
   * @memberof MutationObserver
   * @example
   observer.destroy();
   */
  public destroy(): MutationObserver {
    this.detach();
    this.observer = null;
    return this;
  }
}
