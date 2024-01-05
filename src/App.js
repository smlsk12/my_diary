import { Routes, Route, Link } from 'react-router-dom';
// routes는 여러 route컴포넌트를 감쌉니다. 그리고
// 현재 url 경로에 맞게 적절한 route 컴포넌트를 페이지에 렌더링 한다.
import React, { useReducer, useRef, useEffect, useState } from 'react';
import Home from './pages/Home';
import Edit from './pages/Edit';
import New from './pages/New';
import Diary from './pages/Diary';
import './App.css';
// import {emotion1} from "./img/emotion1.png";
// import {getEmotionImgById} from "./util";

// 일기 state값 컴포넌트 그룹에 전달할 context를 만든다
// 이때 이 컨텍스트를 다른파일(컴포넌트)에서 불러올 수 있게 export
// context사용시 지나친 페이지 리렌더링 이슈를 막기 위한
// dispathch도 사용을 위해 불러온다
export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function reducer(state, action) {
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      const newState = [action.data, ...state];
      localStorage.setItem("diary", JSON.stringify(newState))
      // "diary"라는 키값에 새로운 아이템 저장
      return newState;
      // return [action.data, ...state];
    }
    case "UPDATE": {
      //반환전에 반환데이터를 저장하고 해석후 리턴
      const newState = state.map((it) =>
      // id가 일치하는 조건이 만족될시 업데이트(덮어씌움)
      String(it.id) === String(action.data.id) ? {...action.data} : it
      );
      localStorage.setItem("diary", JSON.stringify(newState));
      return newState;
    }
    case "DELETE": {
      const newState = state.filter((it) => String(it.id) !== String(action.targetId));
      localStorage.setItem("diary", JSON.stringify(newState));
      // return state.filter((it) => String(it.id) !== String(action.targetId));
      return newState;
    }
    default: {
      return state;
    }
  }
}

const mockData = [
{
  id: "mock1",
  date: new Date().getTime() -1,
  content: "mock1",
  emotionId: 1,
},
{
  id: "mock2",
  date: new Date().getTime()-2,
  content: "mock2",
  emotionId: 2,
},
{
  id: "mock3",
  date: new Date().getTime()-3,
  content: "mock3",
  emotionId: 3, 
},
]
function App() {
  const [IsDataLoaded, setIsDataLoaded] = useState(false);
  const [data, dispatch] = useReducer(reducer, []);
  const idRef = useRef(0);

  // 함수 onCreate는 사용자가 선택한 날짜, 입력일기 데이터, 선택한 감정
  // 세가지 데이터를 인풋으로 받아서 저장한다
  // 상단의 함수 dispatch를 호출하여
  // 데이터는 객체로 저장할 때 타입은 "CREATE"로 합니다
  // 마지막으로 일기를 저장할 때마다 idRef.current +=1 로 id값을
  // 1씩 늘려서 id 데이터가 중복되지 않도록 한다

  useEffect(() => {
    // 로컬 스토리지로부터 diary라는 키 값에 저장해 둔 데이터를
    // 불러와서 rawData로 저장한다
    // 만약에 rawData가 존재하지 않는다면
    // setIsDataLoaded를 true로 업데이트하고 종료한다
    // 데이터가 존재하면 JSON객체로 복원
      const rawData = localStorage.getItem("diary");
      if (!rawData) {
        setIsDataLoaded(true);
        return;
      }
      const localData = JSON.parse(rawData);
      if (localData.length === 0) {
        setIsDataLoaded(true);
        return;
      }
      // 불러온 일기데이터를 id기준 내림차순 정렬합니다
      // 내림차순 정렬이기에 localData[0] 즉,
      // 데이터 배열의 첫 원소는 id중 가장 큰값이 됩니다
      // 그렇게 해서 idRef.current 즉, id의 현재값은
      // 일기 id에서 가장 큰 값에 1 더한값으로 설정합니다
      localData.sort((a,b) => Number(b.id) - Number(a.id));
      idRef.current = localData[0].id +1
      // mock데이터가 아닌 로컬스토리지에 저장한 데이터 불러옴
      dispatch({type: "INIT", data: localData});
      setIsDataLoaded(true);
  }, []);

  // useEffect(() => { // 데이터 변화가 있을때만 새로고침하는 리액트훅
  //   dispatch({
  //     type: "INIT", // 초기
  //     data: mockData,
  //   });
  // }, [])

  const onCreate = (date, content, emotionId) => {
    // onCreate에 인풋값이 들어오면 dispatch 함수 실행
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current,
        date: new Date(date).getTime(),
        content,
        emotionId,
      },
    });
    // 위 작업이 끝나면 id값 더해준다
    idRef.current +=1
  };
  
  const onUpdate = (targetId, date, content, emotionId) => {
    dispatch({
      type: "UPDATE",
      data: {
        id: targetId, //업뎃하려 지정한 id
        date: new Date(date).getTime(),
        content,
        emotionId,
      },
    })
  }
  // 일기 state를 업데이트하는 삭제함수인데 (삭제상태를 업데이트)
  // 변수 targetId로 삭제할 아이디를 저장
  // 일기 객체의 타입으로 삭제를 의미하는 delete와 targetId로 삭제할 일기id를 저장
  const onDelete = (targetId) => {
    dispatch({ //dispatch 리액트훅스이용해 삭제상태업데이트
      type: "DELETE", // id에 대한 삭제모드 스위치 구문에서 찾아 실행
      targetId,
    });
  };

  if(!IsDataLoaded) {
    return <div>아직 데이터를 불러오는 중입니다</div>;
  }
  else {
  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider
      value={{
        onCreate,
        onUpdate,
        onDelete,
      }}>
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/edit/:id' element={<Edit />} />
        <Route path='/new' element={<New />} />
        <Route path='/diary/:id' element={<Diary />} />
      </Routes>

      {/* 페이지 이동 구현하기 a태그 = Link태그 */}
        {/* <div>
          <Link to ={"/"}>Home</Link>
          <Link to ={"/edit"}>Edit</Link>
          <Link to ={"/new"}>New</Link>
          <Link to ={"/diary"}>Diary</Link>
        </div> */}

      {/* 이미지 콘텐츠에 {} 중괄호 넣는다 */}
      {/* <img alt="감정1" src={emotion1} /> */}
      {/* <img alt="감정1" src={getEmotionImgById(1)} />
      <img alt="감정2" src={getEmotionImgById(2)} />
      <img alt="감정3" src={getEmotionImgById(3)} />
      <img alt="감정4" src={getEmotionImgById(4)} />
      <img alt="감정5" src={getEmotionImgById(5)} /> */}
      
    </div>
    </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}
}

export default App;
