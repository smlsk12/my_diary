import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useDiary from "../hooks/useDiary";
import Button from "../component/Button";
import Header from "../component/Header";
import { DiaryDispatchContext } from "../App";
import Editor from "../component/Editor";
import { setPageTitle } from "../util";

const Edit = () => {
    useEffect(() => {
        setPageTitle("일기수정")
    }, []);
    const {id} = useParams();
    const data = useDiary(id);
    const navigate = useNavigate();
    const {onUpdate, onDelete} = useContext(DiaryDispatchContext);

    const onSubmit = (data) => {
        if(window.confirm("일기를 진짜 수정할까요?")) {
            const {date, content, emotionId} = data; // 구조분해할당으로 ~를 따온다
            onUpdate(id, date, content, emotionId);
            navigate("/", {replace: true});
        }
    }

    const onClickDelete = () => {
        if (window.confirm("진짜 삭제하려고? 복구안됨!"))
        onDelete(id);
        navigate("/", {replace: true});
    }

    const goBack = () => {
        navigate(-1);
    }
    
    if (!data) {
        return <div>일기를 불러오고 있습니다</div>
    }
    else {
        return (<div>
            <Header title={"일기수정하기"}
            leftChild={<Button text={"< 뒤로가기"} onClick={goBack} />}
            rightChild={<Button type={"negative"} text={"삭제하기"} 
            onClick={onClickDelete} />}
            />
            <Editor initData={data} onSubmit={onSubmit} />
        </div>)
    }
    
};
export default Edit;