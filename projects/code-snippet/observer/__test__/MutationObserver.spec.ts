import { TestBed } from '@angular/core/testing';

import { wait } from '../../__test__/helper';
import { MutationObserver, MUTATION_EVENTS } from '../index';

describe('# @nonoll/code-snippet/observer/MutationObserver Spec Test', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});

    const mockMarkup = `
      <div id="mock_markup">
        <div id="target"></div>
      </div>
    `;
    document.body.insertAdjacentHTML('afterbegin', mockMarkup);
  });

  afterEach(() => document.body.removeChild(document.querySelector('#mock_markup')));

  it('# MutationObserver 가 정상 생성 된다.', () => {
    const observer: MutationObserver = new MutationObserver({});
    expect(observer).toBeTruthy();
  });

  it('# target 의 child 변화가 발생되면, MUTATION_EVENTS.CHANGE_CHILD_LIST 로 감지 할 수 있다.', (done: DoneFn) => {
    const target = document.querySelector('#target') as HTMLElement;
    const child = document.createElement('div');
    const observer: MutationObserver = new MutationObserver({ target });
    observer.on(MUTATION_EVENTS.WILD_CARD, type => {
      expect(type).toEqual(MUTATION_EVENTS.CHANGE_CHILD_LIST);
      done();
    });
    observer.attach();
    target.appendChild(child);
  });

  it('# target 의 attribute 변화가 발생되면, MUTATION_EVENTS.CHANGE_ATTRIBUTES 로 감지 할 수 있다.', (done: DoneFn) => {
    const target = document.querySelector('#target') as HTMLElement;
    const options = { attributes: true };
    const observer: MutationObserver = new MutationObserver({ target, options });
    observer.on(MUTATION_EVENTS.WILD_CARD, type => {
      expect(type).toEqual(MUTATION_EVENTS.CHANGE_ATTRIBUTES);
      done();
    });
    observer.attach();
    target.setAttribute('data-test-attribute', 'changed');
  });

  it('# destroy 실행시, event listener 감지가 되지 않는다.', async (done: DoneFn) => {
    const target = document.querySelector('#target') as HTMLElement;
    const child = document.createElement('div');
    const child2 = document.createElement('div');
    const observer: MutationObserver = new MutationObserver({ target, debounce: 0 });

    let resResolve = null;
    const resPromise = (() => new Promise(resolve => resResolve = resolve))() as Promise<number>;
    let eventCount = 0;

    observer.on(MUTATION_EVENTS.WILD_CARD, _ => eventCount++);
    observer.attach();
    target.appendChild(child);

    await wait(100);

    observer.destroy();
    target.appendChild(child2);

    resPromise.then(res => {
      expect(res).toEqual(1);
      done();
    });

    resResolve(eventCount);
  });

});
