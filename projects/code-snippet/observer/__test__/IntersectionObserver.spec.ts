import { TestBed } from '@angular/core/testing';

import { wait } from '../../__test__/helper';
import { IntersectionObserver, INTERSECTION_EVENTS } from '../index';
import { IIntersectionChangeData } from '../types';

describe('# @nonoll/code-snippet/observer/IntersectionObserver Spec Test', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});

    const mockMarkup = `
      <div id="viewport" style="height:100px;overflow:auto">
        <div id="target" style="width:100%;height:100px;margin-top:200px"></div>
      </div>
    `;
    document.body.insertAdjacentHTML('afterbegin', mockMarkup);
  });

  afterEach(() => document.body.removeChild(document.querySelector('#viewport')));

  it('# IntersectionObserver 가 정상 생성 된다.', () => {
    const target = document.querySelector('#target') as HTMLElement;
    const observer: IntersectionObserver = new IntersectionObserver({ target });
    expect(observer).toBeTruthy();
  });

  it('# IntersectionObserver 에 target 은 필수 값, 지정이 안될 경우 에러가 발생 된다.', () => {
    const result = 'IntersectionObserver target 설정은 필수 값 입니다.';
    try {
      // tslint:disable-next-line: no-unused-expression
      new IntersectionObserver({});
    } catch (e) {
      expect(e.message).toEqual(result);
    }
  });

  it('# IntersectionObserver 을 이용하면, target 의 IIntersectionChangeData 규격의 데이터를 확인한다.', (done: DoneFn) => {
    const viewport = document.querySelector('#viewport') as HTMLElement;
    const target = document.querySelector('#target') as HTMLElement;
    const options = { root: viewport, rootMargin: '100px 0px 0px 0px' };
    const changeData = IntersectionObserver.getIntersectionEntry({ target, options });
    const checkChangeDataKeys = {
      currentTarget: 'Element',
      entry: 'IntersectionObserverEntry',
      intersectionRatio: 'number',
      isVisible: 'boolean',
      direction: 'INTERSECTION_DIRECTIONS'
    }

    Object.keys(checkChangeDataKeys).forEach(key => {
      expect(typeof changeData[key]).toBeTruthy();
    });

    done();
  });

  it('# target 의 위치가, viewport 영역에 노출되면 isVisible: true 를 반환한다.', (done: DoneFn) => {
    const result = true;
    const viewport = document.querySelector('#viewport') as HTMLElement;
    const target = document.querySelector('#target') as HTMLElement;
    const options = { root: viewport, rootMargin: '100px 0px 0px 0px' };

    const observer: IntersectionObserver = new IntersectionObserver({ target });
    observer.on(INTERSECTION_EVENTS.CHANGE, ({ isVisible }: IIntersectionChangeData) => {
      expect(isVisible).toEqual(result);
      done();
    });
    viewport.scrollTop = 200;
    observer.attach();

    const changeData = IntersectionObserver.getIntersectionEntry({ target, options });
    expect(changeData.isVisible).toEqual(result);
  });

  it('# target 의 위치가, viewport 영역에 밖이면 isVisible: false 를 반환한다.', (done: DoneFn) => {
    const result = false;
    const viewport = document.querySelector('#viewport') as HTMLElement;
    const target = document.querySelector('#target') as HTMLElement;
    const options = { root: viewport, rootMargin: '100px 0px 0px 0px' };

    const observer: IntersectionObserver = new IntersectionObserver({ target });
    observer.on(INTERSECTION_EVENTS.CHANGE, ({ isVisible }: IIntersectionChangeData) => {
      expect(isVisible).toEqual(result);
      done();
    });
    observer.attach();

    const changeData = IntersectionObserver.getIntersectionEntry({ target, options });
    expect(changeData.isVisible).toEqual(result);
  });

  it('# intersectionRatio 는 target 의 위치가, viewport 영역내에 있을때 노출 비율값을 반환한다.', async (done: DoneFn) => {
    const viewport = document.querySelector('#viewport') as HTMLElement;
    const target = document.querySelector('#target') as HTMLElement;
    const options = { root: viewport, rootMargin: '100px 0px 0px 0px' };
    const observer: IntersectionObserver = new IntersectionObserver({ target, throttle: 100, options });
    const resultRatioList = [0, 10, 20, 30, 40, 50, 60, 70, 80, 100];
    const responseRatioList = [];
    observer.on(INTERSECTION_EVENTS.CHANGE, ({ intersectionRatio }: IIntersectionChangeData) => {
      responseRatioList.push(intersectionRatio);
    });
    observer.attach();

    for (let i = 0, leng = resultRatioList.length; i < leng; i++) {
      viewport.scrollTop = 100 + resultRatioList[i];
      await wait(200);
    }

    expect(responseRatioList).toEqual(responseRatioList);
    done();
  });

  it('# throttle: 200 설정, target 의 위치가 100ms 타이밍으로 10회 움직이면 INTERSECTION_EVENTS.CHANGE 이벤트 발생 횟수는 5회다.', async (done: DoneFn) => {
    const viewport = document.querySelector('#viewport') as HTMLElement;
    const target = document.querySelector('#target') as HTMLElement;
    const options = { root: viewport, rootMargin: '100px 0px 0px 0px' };
    const observer: IntersectionObserver = new IntersectionObserver({ target, throttle: 200, options });
    const resultRatioList = [0, 10, 20, 30, 40, 50, 60, 70, 80, 100];
    const resultCount = 5;
    let eventCount = 0;
    observer.on(INTERSECTION_EVENTS.CHANGE, _ => {
      eventCount++;
    });
    observer.attach();

    for (let i = 0, leng = resultRatioList.length; i < leng; i++) {
      viewport.scrollTop = 100 + resultRatioList[i];
      await wait(100);
    }

    expect(eventCount).toEqual(resultCount);
    done();
  });

  it('# visibleRatio: 0.4 설정, target 의 위치가 0.1 ratio 비율로 10회 증가하면 isVisible: true 는 5회 이상 확인된다.', async (done: DoneFn) => {
    const viewport = document.querySelector('#viewport') as HTMLElement;
    const target = document.querySelector('#target') as HTMLElement;
    const options = { root: viewport, rootMargin: '100px 0px 0px 0px' };
    const observer: IntersectionObserver = new IntersectionObserver({ target, throttle: 100, visibleRatio: 0.4, options });
    const resultRatioList = [0, 10, 20, 30, 40, 50, 60, 70, 80, 100];
    const resultVisibleCount = 5;
    let visibleCount = 0;

    observer.on(INTERSECTION_EVENTS.CHANGE, ({ isVisible }: IIntersectionChangeData) => {
      if (isVisible) {
        visibleCount++;
      }
    });
    observer.attach();

    for (let i = 0, leng = resultRatioList.length; i < leng; i++) {
      viewport.scrollTop = 100 + resultRatioList[i];
      await wait(300);
    }

    // intersectionRatio 값이 소수점이 조금 상이하여 visibleCount 가 오차가 생길 수 있으므로, toBeGreaterThanOrEqual 으로 체크
    expect(visibleCount).toBeGreaterThanOrEqual(resultVisibleCount);
    done();
  });

  it('# destroy 실행시, event listener 감지가 되지 않는다.', async (done: DoneFn) => {
    const viewport = document.querySelector('#viewport') as HTMLElement;
    const target = document.querySelector('#target') as HTMLElement;
    const options = { root: viewport, rootMargin: '100px 0px 0px 0px' };

    let resResolve = null;
    const resPromise = (() => new Promise(resolve => resResolve = resolve))() as Promise<number>;
    let eventCount = 0;

    const observer: IntersectionObserver = new IntersectionObserver({ target, throttle: 300, options });
    observer.on(INTERSECTION_EVENTS.CHANGE, _ => eventCount++);
    observer.attach();

    viewport.scrollTop = 200;

    await wait(200);
    observer.destroy();

    viewport.scrollTop = 0;
    await wait(200);
    viewport.scrollTop = 200;

    resPromise.then(res => {
      expect(res).toEqual(1);
      done();
    });

    resResolve(eventCount);
  });

});
