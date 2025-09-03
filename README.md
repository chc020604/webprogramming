# 웹프로그래밍 수업 요약

## 1. 웹의 기본 개념

### 웹의 구조
- **클라이언트-서버 모델**: 웹 브라우저(클라이언트)가 웹 서버에 요청을 보내고 응답을 받는 구조
- **HTTP 프로토콜**: 웹에서 데이터를 주고받는 통신 규약
- **URL(Uniform Resource Locator)**: 웹 리소스의 위치를 나타내는 주소

### 웹의 발전
- **Web 1.0**: 정적 웹페이지 중심
- **Web 2.0**: 사용자 참여와 상호작용 중심
- **Web 3.0**: 시맨틱 웹, 인공지능 기반

## 2. HTML (HyperText Markup Language)

### HTML 기본 구조
```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>페이지 제목</title>
</head>
<body>
    <h1>내용</h1>
</body>
</html>
```

### 주요 HTML 태그
- **구조 태그**: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`
- **텍스트 태그**: `<h1>~<h6>`, `<p>`, `<span>`, `<strong>`, `<em>`
- **리스트 태그**: `<ul>`, `<ol>`, `<li>`
- **링크와 이미지**: `<a>`, `<img>`
- **테이블**: `<table>`, `<tr>`, `<td>`, `<th>`
- **폼**: `<form>`, `<input>`, `<textarea>`, `<select>`

### HTML5 새로운 기능
- 시맨틱 태그로 문서 구조 명확화
- 멀티미디어 지원 (`<video>`, `<audio>`)
- 캔버스 API (`<canvas>`)
- 로컬 스토리지

## 3. CSS (Cascading Style Sheets)

### CSS 기본 문법
```css
선택자 {
    속성: 값;
    속성: 값;
}
```

### 선택자 종류
- **기본 선택자**: 타입, 클래스(.), ID(#)
- **복합 선택자**: 후손, 자식(>), 인접 형제(+)
- **가상 선택자**: `:hover`, `:focus`, `:nth-child()`

### 박스 모델
- **Content**: 실제 내용 영역
- **Padding**: 내부 여백
- **Border**: 테두리
- **Margin**: 외부 여백

### 레이아웃 기법
- **Float**: 요소를 좌우로 띄우는 방식
- **Position**: static, relative, absolute, fixed, sticky
- **Flexbox**: 1차원 레이아웃 시스템
- **Grid**: 2차원 레이아웃 시스템

### 반응형 디자인
- **미디어 쿼리**: 화면 크기에 따른 스타일 적용
- **유연한 단위**: %, em, rem, vw, vh
- **모바일 퍼스트**: 작은 화면부터 설계

## 4. JavaScript

### 기본 문법
```javascript
// 변수 선언
let name = "홍길동";
const age = 25;

// 함수 정의
function greet(name) {
    return `안녕하세요, ${name}님!`;
}

// 화살표 함수
const add = (a, b) => a + b;
```

### DOM 조작
```javascript
// 요소 선택
const element = document.getElementById('myId');
const elements = document.querySelectorAll('.myClass');

// 내용 변경
element.textContent = '새로운 텍스트';
element.innerHTML = '<strong>HTML 내용</strong>';

// 스타일 변경
element.style.color = 'red';
element.classList.add('active');

// 이벤트 처리
element.addEventListener('click', function() {
    console.log('클릭되었습니다!');
});
```

### 비동기 프로그래밍
- **콜백 함수**: 다른 함수의 인자로 전달되는 함수
- **Promise**: 비동기 작업의 결과를 나타내는 객체
- **async/await**: Promise를 더 쉽게 다루는 문법

### AJAX와 Fetch API
```javascript
// Fetch API 사용 예시
fetch('/api/data')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
```

## 5. 백엔드 기초

### 서버사이드 언어
- **Node.js**: JavaScript 런타임 환경
- **Python**: Django, Flask 프레임워크
- **PHP**: 웹 개발에 특화된 언어
- **Java**: Spring 프레임워크

### 데이터베이스
- **관계형 데이터베이스**: MySQL, PostgreSQL
- **NoSQL 데이터베이스**: MongoDB, Redis
- **SQL 기본**: SELECT, INSERT, UPDATE, DELETE

### API 설계
- **REST API**: HTTP 메서드를 이용한 API 설계 원칙
- **JSON**: 데이터 교환 형식
- **상태 코드**: 200(성공), 404(찾을 수 없음), 500(서버 오류) 등

## 6. 개발 도구와 환경

### 버전 관리
- **Git**: 분산 버전 관리 시스템
- **GitHub/GitLab**: Git 저장소 호스팅 서비스

### 개발 환경
- **IDE/에디터**: Visual Studio Code, WebStorm
- **브라우저 개발자 도구**: 디버깅과 성능 분석
- **패키지 매니저**: npm, yarn

### 빌드 도구
- **Webpack**: 모듈 번들러
- **Babel**: JavaScript 컴파일러
- **Sass/Less**: CSS 전처리기

## 7. 웹 보안

### 주요 보안 위협
- **XSS (Cross-Site Scripting)**: 악성 스크립트 삽입 공격
- **CSRF (Cross-Site Request Forgery)**: 요청 위조 공격
- **SQL Injection**: 데이터베이스 조작 공격

### 보안 대책
- 입력값 검증 및 이스케이핑
- HTTPS 사용
- 인증과 권한 관리
- 보안 헤더 설정

## 8. 성능 최적화

### 프론트엔드 최적화
- **파일 압축**: HTML, CSS, JavaScript 압축
- **이미지 최적화**: 적절한 포맷과 크기 사용
- **CDN 활용**: 콘텐츠 전송 네트워크 사용
- **캐싱**: 브라우저 캐시 활용

### 백엔드 최적화
- **데이터베이스 쿼리 최적화**
- **서버 캐싱**: Redis, Memcached
- **로드 밸런싱**: 트래픽 분산

## 9. 최신 웹 기술 트렌드

### 프론트엔드 프레임워크
- **React**: 컴포넌트 기반 UI 라이브러리
- **Vue.js**: 점진적 프레임워크
- **Angular**: 완전한 프론트엔드 프레임워크

### 최신 기술
- **PWA (Progressive Web App)**: 웹과 앱의 장점을 결합
- **WebAssembly**: 웹에서 네이티브 성능 구현
- **GraphQL**: 효율적인 데이터 쿼리 언어
- **JAMstack**: JavaScript, APIs, Markup 기반 아키텍처

## 10. 프로젝트 개발 프로세스

### 개발 단계
1. **요구사항 분석**: 프로젝트 목표와 기능 정의
2. **설계**: UI/UX 디자인, 시스템 아키텍처 설계
3. **개발**: 프론트엔드와 백엔드 구현
4. **테스트**: 단위 테스트, 통합 테스트
5. **배포**: 서버 배포 및 운영

### 협업 도구
- **이슈 트래킹**: Jira, GitHub Issues
- **프로젝트 관리**: Trello, Notion
- **커뮤니케이션**: Slack, Discord

---

*이 요약은 일반적인 웹프로그래밍 수업 내용을 기반으로 작성되었습니다. 실제 수업 내용에 따라 세부 사항이 다를 수 있습니다.*
