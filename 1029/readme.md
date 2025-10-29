* BOM, DOM, 코어객체
    * BOM안에는 DOM이 포함되어있는 것이다.

* 웹 페이지에 작성된 HTML 태그 당 객체(DOM 객체) 생성
  * 목적: HTML 태그가 출력된 모양이나 콘텐츠를 제어하기 위해
      * DOM 객체를 통해 각 태그의 css 스타일 시트 접근 및 변경
      * HTML 태그에 의해 출력된 텍스트나 이미지 변경

* DOM 트리
* DOM 객체
  * DOM 트리의 한 노드
  * HTML 태그당 하나의 DOM 객체 생성
      * DOM 노드, DOM 엘리먼트라고도 불림

**자바스크립트로 브라우저를 제어할 수 있다 -> DOM 노드를 가지고 제어를 하게 된다 -> 태그 하나하나 제어가능**

* HTML 태그
  1. 엘리먼트 이름 (태그이름 ex. p태그, span태그)
  2. 속성
  3. css3 스타일
  4. 이벤트 리스너 (어떤 이벤트가 발생하는지 확인하는 요소)
  5. 콘텐츠 ( 스타트 태그와 엔드 태그 안에 들어가있는 요소 )
  **자바스크립트에서는 node라 부르고 html에서는 object라 부름**

* DOM 객체의 5개 구성 요소
    1. 프로퍼티(property)
    2. 메소드(method)
    3. 컬렉션(collection)
    4. 이벤트 리스너(event listener)
    5. CSS3 스타일
  **DOM 객체 마다 구성요소 5개 전부 가지고 있다**

* innerHTML 프로퍼티
   * 시작 태그와 종료 태그 사이에 들어 있는 HTML 콘텐츠

* this 활용
  * this는 자바와 같이 현재 객체를 가리킨다
  * obj는 자바의 object 클래스와 비슷하게 최상위 클래스라고 생각하면 된다.
 
* document 객체
   * document ( html의 body 부분 )
   * document는 DOM객체가 아니다

* document.write()와 document.writeln()

**script태그는 가급적 문서의 아래에 있어야 좋다**

---------------------------------------------------------------------------------
* addEventListener() 메소드

* 익명 함수(anonymous function)
  1. 한 번만 사용하고 안 사용할 거 같을때 함수 이름을 정의하지 않고 사용하는 함수
    ~~~
    p.addEventListener("mouseout",function () { this.style.backgroundColor="white"; });
    ~~~

* 이벤트 객체 전달 받는 방법은 e를 사용한다 (event의 줄임말)

**이벤트에 대한 정보는 자동으로 만들어지고 이벤트 객체는 e로 불러와서 사용할 수 있다.**

* 이벤트 객체에 들어있는 정보
  1. type - 프로퍼티
  2. target - 프로퍼티
  3. currentTarget - 프로퍼티
  4. dafualtPrevented - 프로퍼티
  5. preventDefault() - 메소드

* 이벤트 흐름
  1. 캡쳐 단계
  2. 버블 단계
  ***각 단계가 무슨 역할인지 찾아보기***

* 이벤트 흐름을 중단시키는 방법
  - 이벤트 객체의 stopPropagation() 호출
    -  event.stopPropagation(); // event가 이벤트 객체일 때

* 라디오버튼과 체크박스
  1. 라디오버튼: 여러개의 문항중 한 개만 선택할 때 사용
  2. 체크박스: 여러개의 문항중 여러개 선택할 때 사용
  **문항 주제의 이름을 모두 같게 선언해야함**

과제: 웹사이트 기획한다 => 10000명 이상에게 도움이 될 만한 사이트를 만든다.



