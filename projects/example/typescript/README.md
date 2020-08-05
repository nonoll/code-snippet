# webpack-typescript-boilerplate

## Scripts

package.json 에 정의된 scripts 목록

### 개발용

- dev:test : test, watch 활성화
- dev:e2e : e2e test
- dev:jsdoc : jsdoc, watch 활성화
- dev:webpack : webpack-dev-server, port 8080
- dev : dev:webpack 실행

### 빌드용

- build:test : test 실행
- build:jsdoc : jsdoc 생성
- build:webpack : production 모드 빌드
- buld : build:test, build:jsdoc, build:webpack 실행

## TODO

- scripts 별, command echo 출력 보정

- [Bash tips: Colors and formatting (ANSI/VT100 Control sequences)](https://misc.flogisoft.com/bash/tip_colors_and_formatting)
