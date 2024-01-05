// app.js에서 부여한 다이나믹 컨텐츠 라우팅 주소에 대한
// 컴포넌트를 부여하고자 함

// 비동기처리 이슈*
// 데이터가 느리게 로딩이 되면 데이터를 표시하는 헤더와 뷰어섹션이
// 데이터 도착전에 렌더링 되어서는 안됩니다
import { useParams, useNavigate } from "react-router-dom";
import useDiary from "../hooks/useDiary";
import Button from "../component/Button";
import Header from "../component/Header"; // 컴포넌트 (괄호X)
import { getFormattedDate } from "../util"; // 함수 {중괄호}
import Viewer from "../component/Viewer";
import { setPageTitle } from "../util";
import { useEffect } from "react";

const Diary = () => {
    useEffect(() => {
        setPageTitle("일기내용")
    }, []);
    const {id} = useParams();
    const data = useDiary(id);
    const navigate = useNavigate();
    // const params = useParams();
    // console.log(data);

    const goBack = () => {
        navigate(-1);
    }

    const goEdit = () => {
        navigate(`/edit/${id}`);
    }

    if(!data) {
        return <div>일기 데이터를 불러오고 있습니다</div>
    }
    else {
        // 키값에 해당하는 value데이터를 뽑아낸다
        const {date, emotionId, content} = data; 
        const title = `${getFormattedDate(new Date(Number(date)))} 기록`
    return (
    <div>
        <Header title={title}
        leftChild={<Button text={"<뒤로가기"} onClick={goBack}/>}
        rightChild={<Button text={"수정하기"} onClick={goEdit}/>}
        />
    <div>{id}번 일기</div>
    <div>Diary 페이지 입니다</div>
    <Viewer content={content} emotionId={emotionId} />
    </div>
    );
}
};
export default Diary;