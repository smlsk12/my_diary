// JSX 문법이라고 부릅니다. (JS와 HTML의 혼종이죠...)
// 수치연산 & 문자열 표현식도 됩니다.
// 간단한 조건문 boolean 표현식도 보자
// 안되는 데이터 형식이 있다. 데이터 객체 형식은 안된다. objA이런거
// 단, key값을 명시하여 원시자료형으로 바꾸면 가능담

// html은 태그 표기에 약간 실수가 있어도 브라우저에서 알아서 해석한다
// but, 리액트는 에러가 난다 (여는태그와 닫는태그 반드시 필요)
// JSX가 반환하는 모든 태그는 반드시 최상위 태그로 감싸야 한다 ******
// 페이지 컨텐츠적으로 정말 최상위 태그가 필요없는 경우,
// <> </> 빈 태그로라도 감싸야함
// <React.Fragment>로 감싸면된다.
// 단, <React.Fragment> 쓰려면 import React from "react"; 기능을 불러와야 함
// html 내부조건문 사용 가능함
import React from 'react';

function Body (props) {
    const {name,location} = props;
    const number = 1;
    const number_777 = 88
    const strA = "리액트,"
    const strB = "또 시작이군"
    const boolA = true
    const boolB = false
    const objA = {a: 1, b: 3,}; //JSON형식 못씀(객체내부 값 명시 필요)

    return (
        <div className='body'> {/* style적용시에는 class선언 */}
        <h1>{props.name}</h1>
        <h3>{name}은 {location}살아</h3>

            <h2>본문이다</h2>
            <h2>{objA.a}</h2> {/* {objA} 이건안돼*/}
            <h2>
                {number}는 {number % 2 ===1 ? '짝수' : '홀수'}
            </h2>

            {/* // if (number % 2 ===0) {
                return <div>{number}는 짝수입니다.</div>;
            } else {
                return <div>{number}는 홀수입니다.</div>;
            } */}
        </div>
    )

}

export default Body;