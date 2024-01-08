### CSS
- 마우스 이벤트 방지
    ```css
  pointerEvents: none
    ```  
  
- boxShadow 
  - length
     - 4개의 length 값이 있다면, 4번째 값은 <spread-radius>을 결정한다. 
  
  - inset
    - 내부에서 shadow가 만들어진다.
    -  박스 내부에서 border가 그려진 효과

- useEffect UnMount Cleanup
  - [관련 React 문서](https://react.dev/reference/react/useEffect)
  - setInterval, addEventListener 등과 같은 외부 Api를 사용한 경우, cleanup 함수를 리턴해줘야한다.  
    ex) clearInterval(), removeEventListener()
