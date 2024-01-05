import './App.css';
import Header from './component/Header';

import Body from './component/Body';
import Footer from './component/Footer';
// 리액트에서 정말 함수형 컨텐츠를 만들어서 사용 가능한가?
// 대소문자를 구분해야하는 정도가 아니고
// 컴포넌트의 이름은 반드시 대문자로 시작해야 한다

// props로 컴포넌트 전달하기

// 함수를 통째로 전달
// function ChildComp() {
//   return <div>넘겨줄 자식 컴포넌트</div>;
// }

// function Header() {
//   return (
//     <header>
//     <h1>헤더에요, 헤더라고!</h1>
//     </header>
//   );
// }

function App() {

  // 스프레드 연산자로 여러개의 값을 동시에 전달 {...BodyProps}
  // 1. body 컴포넌트에서 전달할 값을 객체 BodyProps로 만들어

  const BodyProps = {
    name: "나",
    location: "노르트담",
    favorList: ["파스타", "빵", "떡볶이"] }
  // const name = "나"



  return (
    <div className="App">

        {/* <h2>리액트는 처음...</h2> */}
        <Header />
        {/* <Body /> */}

        {/* props를 전달하려는 자식 컴포넌트 태그에서
        이름={값} 형식으로 작성 */}
        {/* <Body name={"냠냠"} location={"인천시"} /> */}

        {/* 2. 스프레드 연산자로 개별 프로퍼티를 Props값으로 전달함 */}
        {/* <Body {...BodyProps} /> */}


        <Body>
          {/* <ChildComp /> */}
        </Body>

        <Footer />
    </div>
  );
}

export default App;
