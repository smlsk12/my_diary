import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// ReactDOM.createRoot : 인풋으로 전달한 요소를
// 리액트 앱의 루트로 결과를 보임(리턴하다)
// 자바스크립트로 작성된 요소들의 루트를 가리킴
// id가 root인 요소를 루트개념으로 만들어서 root라는 변수에 저장
// 홈페이지 요소를 root로 만들어 변수저장. 최상단 개념을 화면에 표시(render)

// 삭제한 파일은 리액트 앱의 성능측정 도구이다*
// import reportwebVitals from './reportwebvitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
// 리액트의 루트요소 아래에 'App' 컴포넌트를 배치해 렌더링 한다
root.render(

  // 리액트 앱 내부의 잠재적인 문제를 검사하는 도구*

    <App /> // 현재 코드상에서 root컴포넌트가 된다

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

