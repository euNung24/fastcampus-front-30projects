# Virtual Keyboard

출처) 패스트캠퍼스 - 30개 프로젝트로 배우는 프론트엔드 with React

### New 지식

- Dark Mode

    ```css
    filter: invert(100%) hue-rotate(180deg);
  /* invert(100%) : 무채색 반전 */
  /* hue-rotate(180deg) :  반전 */
  ```

- toggle( String [, force] )
    - 하나의 인수만 있을 때: 클래스 값을 토글링한다. 즉, 클래스가 존재한다면 제거하고 false를 반환하며, 존재하지 않으면 클래스를 추가하고 true를 반환한다.
    - 두번째 인수가 있을 때: 두번째 인수가 true로 평가되면 지정한 클래스 값을 추가하고 false로 평가되면 제거한다.

    - [mdn 문서](https://developer.mozilla.org/ko/docs/Web/API/Element/classList)
