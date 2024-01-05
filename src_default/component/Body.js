// JSX 문법이라고 부릅니다. (JS와 HTML의 혼종이죠...)
// 수치연산 & 문자열 표현식도 됩니다.
// 간단한 조건문 boolean 표현식도 보자
// 안되는 데이터 형식이 있다. 데이터 객체 형식은 안돼

// html은 태그 표기에 약간 실수가 있어도 브라우저에서 알아서 해석한다
// but, 리액트는 에러가 난다 (여는태그와 닫는태그 반드시 필요)
// JSX가 반환하는 모든 태그는 반드시 최상위 태그로 감싸야 한다
// 페이지 컨텐츠적으로 정말 최상위 태그가 필요없는 경우,
// <React.Fragment></React.Fragment>로 감싸면된다.
// JSX안의 CSS는 {{스타일 규칙들}} 이런식으로 작성

// import React from 'react';
import "./Body.css";
import {useRef, useState} from "react";

// Ref 참조의 줄임말인데, DOM요소의 조작을 위해 사용된다
// 웹서비스 로그인 페이지를 생각해시죠
// 로그인 서비스는 입력폼을 초기화해야 하는데
// useRef를 통해서 텍스트 입력폼을 초기화 합니다

// useRef, useState와 같이 리액트에서 불러오는 use로 시작하는 친구들을
// 리액트 훅의 일종이다. 리액트 훅이란 함수로 만든 리액트 컴포넌트에서
// 클래스로 만든 리액트 컴포넌트 사용을 가능하도록 도와주는 함수이다.
// 원래 리액트 컴포넌트는 함수로 간단하게 사용할 수 없었고
// 반드시 클래스로 만들어야 했다.(클래스로 전부 만들려고 하면 코딩난이도 올라감)
// 2018년도에 리액트 훅이 처음 소개되었다. reqct hook
// 클래스로 만든 기능을 고리가지고 낚아채서 쓴다는 의미


// 포커스란 마우스로 입력폼을 클릭한 상태값이
// 사용자가 데이터를 입력하도록 커서가 깜빡이며 대기하는 상태를 의미
function Body() {
    // 7. 5글자 미만으로 글자입력시 포커스 기능을 켜서 사용자의 데이터 입력을 유도

    const [text, setText] = useState("");
    // useRef()의 선언이 필요
    const textRef = useRef();
    // state상태변화 업데이트 함수
    const handleOnChange = (e) => {
        setText(e.target.value);
    }
    // 버튼 태그 클릭시 실행되는 함수인데,
    // textRef.current.value = ""로 html의 input태그에 접근하여 데이터 초기화시킴
    const handleOnClick = () => {
        if (text.length < 5) {
            textRef.current.focus();
        } else {
            alert(text);
            setText("");
        }  
    };

    return (
        <div>
            <input ref={textRef} value={text} onChange={handleOnChange} />
            <button onClick={handleOnClick}>작성완료</button>
        </div>
    )
}


// function Body() {
//     // state변수 text로 관리하는 텍스트 입력폼 하나의 버튼하나를 만들었다
//     // 1. 내가 입력창에 뭔가 입력하면 입력창 데이터의 변화를 감지하여 handleOnChange가 실행
//     // 2. handleOnChange이 실행되면 setText(상태변화 업데이트)가 업데이트 된다.
//     // 3. 변화된 상태가 text변수에 저장 (state의 메가니즘에 의해)
//     // 4. 마우스 클릭 시 handleOnClick함수가 실행되고 그 handleOnClick함수가 text출력
//     // 5. 텍스트 출력 후에 textRef.current.value = ""를 통해서 입력폼 초기화
//     // 6. useRef를 사용해서 html의 input태그에 접근하여 alert 출력 후 데이터 초기화

//     const [text, setText] = useState("");
//     // useRef()의 선언이 필요
//     const textRef = useRef();
//     // state상태변화 업데이트 함수
//     const handleOnChange = (e) => {
//         setText(e.target.value);
//     }
//     // 버튼 태그 클릭시 실행되는 함수인데,
//     // textRef.current.value = ""로 html의 input태그에 접근하여 데이터 초기화시킴
//     const handleOnClick = () => {
//         alert(text)
//         textRef.current.value = "";
//     }

//     return (
//         <div>
//             <input ref={textRef} value={text} onChange={handleOnChange} />
//             <button onClick={handleOnClick}>작성완료</button>
//         </div>
//     )
// }


// 이벤트 객체 사용하기
// 이벤트 객체란 이벤트가 어떤 요소에서 발생했는지 관련된 정보를 아는 것

// 리액트에서 이벤트함수 처리방법은
// 이벤트처리 자바스크립트 함수를 사전 정의 후
// 메인함수 내 html에서 정의된 함수를 쓴다

// ※※※ 주의 ※※※
// 1. html에선 onclick인데 리액트에선 onClick 캐멀표기법 반드시 사용
// 2. html에선 "handleOnClick()"인데 리액트에선 {handleOnClick}
// 3. html : 함수 호출의 결과를 제공 | 리액트 : 함수 그 자체를 전달

// function Body() {
//     function handleOnClick() {
//         alert("버튼이 눌러졌습니다");
//     }
//     return (
//         <div className="body">
//             <button onClick={handleOnClick}>어서누르세요</button>
//         </div>
//     );    
// }


// function Body() {
//     function handleOnClick(e) {
//         alert(e.target.name);
//     }
//     return (
//         <div className='body'>
//             <button name='a버튼인데...' onClick={handleOnClick}>a버튼눌러</button>
//             <button name='b버튼인데...' onClick={handleOnClick}>b버튼눌러</button>
//         </div>
//     );
// }


// ※※※※※※※※※※※※※※※

// state란 웹서비스의 상태와
// 업데이트 상태를 반영하는 기법으로
// 웹서비스 상태변화에 따른 달라진 업데이트된 컨텐츠
// 즉, 달라진 상태를 표기하는 방법이다
// 일반화된 state함수 표기법은 아래와 같다
// const [light, setLight] = useState('off')
// light는 state변수 (상태변수)이먀, setLight는
// state변수의 상태변화(업데이트)를 나타내는 변수입니다
// uesState() 안의 소괄호에는 초기값을 지정하면 됩니다

// useState로 State생성하기 ★
// [useState의 용법]
// const [light, setLight] = useState('off');
// light는 현재 상태의 값을 저장하는 변수, 이 변수를 state변수라고 부름
// setLight는 State 변수의 값을 업데이트하는 함수이다.
// useState를 호출할 때 인수로 값을 전달하면 이 값이 State의 초기값이 된다
// 위 예시에서 off를 전달했으므로 State변수 light의 초기값은 off가 된다.
// import {useState} from "react";

// function Body() { 
//     // 함수 useState는 초기값으로 0을 전달
//     // 받은 결과값을 State변수 count로 반환
//     const [count, setCount] = useState(0);
//     return (
//         <div>
//             <h2>{count}</h2>
//         </div>
//     );
// }

// 컴포넌트에 버튼을 하나 만들고 버튼 클릭시, State(count)이거 1씩 눌러보자 ★
// 이렇게 set함수를 호출해서 State값을 변경하면,
// 이 값을 페이지에 반영하기 위해 컴포넌트를 다시 렌더링합니다. (다시호출)
// 이거를 '컴포넌트의 업데이트' 라고 합니다.
// 컴포넌트를 렌더링한다 = 컴포넌트 '함수를 다시 호출'한다
// state 값이 변해서 컴포넌트를 다시 렌더링 하는 것을 '리렌더링'이라고 함

// state 사용의 대표적예시 - 사용자 입력태그를 확인하세요
// <input>, <select>, <textarea>

// import {useState} from "react";

// function Body() {
//     // 컴포넌트를 렌더링할때마다 콘솔에 메세지를 출력하도록 설정 (눈으로 확인할 수 있게 console 메시지)
//     console.log("업데이트했어");
//     // 함수 useState는 초기값으로 0을 전달
//     // 받은 결과값을 State변수 count로 반환
//     const [count, setCount] = useState(0);

//     const onIncrease = () => {
//         setCount(count+1);
//     };
//     return (
//         <div>
//             <h2>{count}</h2>
//             <button onClick={onIncrease}>이거눌러봐</button>
//         </div>
//     );
// }


// state를 하나 만들고 사용자가 폼에 데이터 입력할 때마다 결과텍스트 데이터를 ★
// state값으로 저장하는 작업을 해보자~
// import {useState} from "react";

// function Body() {
//     const [text, setText] = useState("");

//     const handleOnChange = (e) => {
//         // 폼에 입력된 텍스트를 변경할 때마다 set함수를 호출해서 text값을 바꿈
//         setText(e.target.value);
//     };
//     return (
//         <div>
//             <input value={text} onChange={handleOnChange} />
//             <div>{text}</div>
//         </div>
//     );
// }

// 날짜 데이터 다루기 ★
// 초기상태,업데이트 상태를 가진 useState를 선언 
// import {useState} from "react";

// function Body() {
//     const [date, setDate] = useState("");

//     const handleOnChange = (e) => {
//         // 폼에 입력된 텍스트를 변경할 때마다 set함수를 호출해서 text값을 바꿈
//         setDate(e.target.value);
//     };
//     return (
//         <div>
//             <input type="date" value={date} onChange={handleOnChange} />
//             <div>{date}</div>
//         </div>
//     );
// }


// 드랍다운 상자로 옵션 선택하기 ★
// 드랍다운 입력폼에서 사용자가 옵션을 바꾸면 onChange 이벤트가 발생

// import {useState} from "react";
// function Body() {
//     const [option, setOption] = useState("");

//     const handleOnChange = (e) => {
//         console.log("변경된 값", e.target.value);
//         setOption(e.target.value);
//     };
//     return (
//         <div>
//             <select value={option} onChange={handleOnChange}>
//             <option key={"1번"}>1번</option>
//             <option key={"2번"}>2번</option>
//             <option key={"3번"}>3번</option>
//             </select>
//         </div>
//     );
// }

// // 여러개의 사용자 입력 데이터 관리 (state로 어떻게 관리하는가?) ★
// import {useState} from "react";
// function Body() {
//     // 1. useState의 초기 변수를 원하는 데이터셋의 종류만큼 선언
//     const [name, setName] = useState("");
//     const [gender, setGender] = useState("");
//     const [birth, setBirth] = useState("");
//     const [bio, setBio] = useState("");
// // 2. 선언된 데이터 셋만큼 이벤트처리 함수를 만들어 준다.
//     const OnChangeName = (e) => {
//         setName(e.target.value);
//     };
//     const OnChangeGender = (e) => {
//         setGender(e.target.value);
//     };
//     const OnChangeBirth = (e) => {
//         setBirth(e.target.value);
//     };
//     const OnChangeBio = (e) => {
//         setBio(e.target.value);
//     };

//     // 3. html 컨텐츠를 만들어서 데이터 입력을 받는다
//     // 데이터 입력 시 onChange 조건이 트리거 되어 각 저장된 함수가 실행되고
//     // 그 지정함수는 위에 사전 정의되어 있다
//     return (
//         <div>
//             <div>
//             <input value={name} onChange={OnChangeName} placeholder='이름' />
//             </div>
//              <select value={gender} onChange={OnChangeGender}>
//           <option key={""}></option>
//           <option key={"남성"}>남성</option>
//           <option key={"여성"}>여성</option>
//         </select>
//         <div>
//         <input type="date" value={birth} onChange={OnChangeBirth}/>
//         </div>
//         <div>
//             <textarea value={bio} onChange={OnChangeBio} />
//              </div>
//       </div>
//     );
// }


// return (
//     <div>
//       <div>
//         <input value={name} onChange={OnChangeName} placeholder="이름" />
//       </div>
//       <div>
//         <select value={gender} onChange={OnChangeGender}>
//           <option key={""}></option>
//           <option key={"남성"}>남성</option>
//           <option key={"여성"}>여성</option>
//         </select>
//       </div>
//       <div>
//       <input type="date" value={birth} onChange={OnChangeBirth} />
//       </div>
//       <div>
//         <textarea value={bio} onChange={OnChangeBio} />
//       </div>
//     </div>
//     );
// }


// props와 state
// body의 state를  props로 전달할 수 있다는 얘기
// 버튼을 통해서 버튼에 지정된 함수를 실행시킴 (이벤트발생)
// +1, -1 데이터를 useState를 통해서 데이터를 업데이트 합니다. (함수실행)
// 자식 컴포넌트도(viewer) 데이터가 state를 통해서 업데이트 되면 자신도 리렌더링 됩

// import { useState } from "react";

// function Viewer({number}) {  //뷰어컴포넌트 사전정의
//     return <div>
//         {number % 2 === 0 ? <h3>짝수</h3> : <h3>홀수</h3>}
//     </div>; }

// function Body() {
//     const [number, setNumber] = useState(0);
//     function onIncrease(){ // 함수표현식
//         setNumber(number +1)
//     };
//     const onDecrease = () => { // 화살표함수
//         setNumber(number -1)
//     };

//     return (
//         <div>{number}
//         <Viewer number={number} />
//         <div>
//             <button onClick={onDecrease}>-1</button>
//             <button onClick={onIncrease}>+1</button>
//         </div>
//         </div>
//     );
//     }
// ※※※※※※※※※※※※※※※



// props를 사용하기 위해 해당함수는 데이터를 인수로 받음(부모(App) > 자식(Body))
// function Body ({children}) {

    // const {name, location, favorList} = props; ★
    // 구조분해할당으로 여러개의 값을 쓰는 경우
    // 코드가 간결해 지는 장점

    // const number = 1; ★
    // const number_777 = 88
    // const strA = "리액트,"
    // const strB = "또 시작이군"
    // const boolA = true
    // const boolB = false
    // const objA = {a: 1, b: 3,} //JSON형식 못씀(객체내부 값 명시 필요)

    // return (
        // <div className='body'> ★
        //     {children}
        // </div>

        // <div className='body'> ★
        //     {/* 객체에 props로 받은 값을 출력합니다 */}
        //     {/* {props.name}는 {props.location}에 거주함 */}

        //     {/* 구조분해할당 예시 */}
        //     {name}는 {location}에 거주함^^^
        //     <br />
        //     {favorList.length}개의 음식을 좋아합니다
        // </div>

        // <div className='body'> ★
        //     <h2>본문입니다...</h2>
        //     {/* 아래에 전달하려는 porps가 단일객체인 케이스이다 */}
        //     <h3>{number + number_777}</h3>
        //     <h3>{strA + strB} </h3>
        //     <h3>{String(boolA || boolB)} </h3>

        // <h3>a: {objA.a}</h3> ★
        //     <h4>
        //     {/* 프로퍼티 접근 표기법을 통해
        //     (객체내부의 값 명시함으로써) 원시자료형으로 변환 */}
        //     
        //         {number}는 {number % 2 ===0 ? "짝수": "홀수"}입니다 ★
        //     </h4>
        //     </div>
//     );
// }

// 받을 데이터의 디폴트값 설정가능 ★
// 개발단계에서 전체 서비스 프레임 만들 때 기본값 설정에서 개발하기
// Body.defaultProps = {
//     favorList: ["마라탕"],
// }

export default Body;