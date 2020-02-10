/**
 * pure MutationObserver init options
 * @memberof MutationObserver
 * @alias IMutationObserverInit
 * @interface
 * @property {Boolean} [childList] - target 의 하위 요소 추가 / 삭제 감지 유무
 * @property {Boolean} [attributes] - target 의 속성 변경 감지 유무
 * @property {Boolean} [characterData] - target 의 데이터 변경 감지 유무
 * @property {Boolean} [subtree] - target 의 하위 요소 변경 사항 감지 유무
 * @property {Boolean} [attributeOldValue] - attributeOldValue TBD
 * @property {Boolean} [characterDataOldValue] - TBD
 * @property {Array.<String>} [attributeFilter] - TBD [MDN attributeFilter]{@link https://developer.mozilla.org/en-US/docs/Web/API/MutationObserverInit/attributeFilter}
 * @see https://developer.mozilla.org/ko/docs/Web/API/MutationObserver#MutationObserverInit
 */
export interface IMutationObserverInit {
  childList?: boolean;
  attributes?: boolean;
  characterData?: boolean;
  subtree?: boolean;
  attributeOldValue?: boolean;
  characterDataOldValue?: boolean;
  attributeFilter?: string[];
}
