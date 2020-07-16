/* istanbul ignore file: 테스트 코드 작성용 helper 이므로, 테스트 제외 처리 */

export const wait = (time = 100): Promise<any> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};
