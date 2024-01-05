// 데이터등을 새로운 페이지로 이동시킬 때
// useNavigate 리액트훅을 사용하여 손쉽게 작업할 수 있었다.
// 리액트훅의 제약사항은 페이지 구성요소인 '컴포넌트'에서만 사용 가능하다는 문제
// 앱 내 일반함수에서는 리액트훅을 사용할 수 없어서
// 페이지 이동 기능을 이용하지 못한다는 제약사항이 있었다.
// 그래서 유저가 리액트훅의 기능을 직접 코딩하여
// 커스텀훅(유저만의코드) useDiary를 만듭니다.
// 직접 프로그래밍한 함수가 리액트 훅스라는 것을 나타내기 위해
// use앞에 꼭 붙이고, 고유데이터를 구분하는 id를 인풋값으로 받습니다.

// useDiary 함수를 통해 일기 데이터를 불러오는 기능을 구현
// useContext를 통해 전체 일기데이터를 불러온 후 데이터페이지 이동을 처리

// 이제 useNavigate를 통해서 입력 id와 일치하는 일기데이터가 없으면
// hmoe 화면으로 사용자를 리다이렉트 즉, 보내는 기능을 구현하겠습니다.
import { useContext, useEffect, useState } from "react";
import {DiaryStateContext} from "../App"
import { useNavigate } from "react-router-dom";

const useDiary = (id) => {
    const data = useContext(DiaryStateContext);
    const [diary, setDiary] = useState();
    const navigate = useNavigate();
    // return data;

    // useEffect를 이용해 id나 data값이 바뀔때마다 일기데이터에서 id
    // 값과 일치하는 일기를 찾아 해당 일기데이터를 업데이트 합니다
    useEffect(() => {
        const matchDiary = data.find((it) => String(it.id) === String(id));
        if (matchDiary) { 
            setDiary(matchDiary)
        } 
        else {
            alert("일기데이터가 존재하지 않습니다")
            navigate("/",{replace: true});
        }
    }, [id, data]); // 대조하여 달라진 데이터를 넣고 일기상태를 업뎃

    return diary;

}
export default useDiary