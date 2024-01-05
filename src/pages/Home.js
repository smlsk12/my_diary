// 메인페이지에 이번달 기준 날짜데이터가 필요하다 (Home)
// state의 초기값으로
// 날짜객체를 부르는 방법을 통하여 현재날짜를 초기값으로 전달
// 월별로 일기 데이터를 구분하려면 date 객체에서 해당월의 가장
// 빠른시간과 가장 늦은시간의 타임스탬프 값을 구해야 함
import Button from "../component/Button";
import Header from "../component/Header";
import Editor from "../component/Editor";
import DiaryList from "../component/DiaryList";

import { useState, useContext, useEffect } from "react";
import { DiaryStateContext } from "../App";
import {getMonthRangeByDate, setPageTitle} from "../util"

const Home = () => {
    const data = useContext(DiaryStateContext);
    const [pivotDate, setPivotDate] = useState(new Date());
    //날짜데이터 기준으로 일기분류
    const [filteredData, setFilteredData] = useState([]);
    const headerTitle = `${pivotDate.getFullYear()}년
    ${pivotDate.getMonth()+1}월`;

    useEffect(() => {
        setPageTitle("내 일기장 메인")
        if (data.length >=1) { // 데이터가 존재한다면...
            const {beginTimeStamp, endTimeStamp} =
            getMonthRangeByDate(pivotDate);
            setFilteredData(
                data.filter((it) =>
                beginTimeStamp <= it.date && it.date <= endTimeStamp)
            );
        } 
        else {
            setFilteredData([]);
        }
    }, [data, pivotDate]);

    const onIncreaseMonth = () => {
        setPivotDate(new Date(pivotDate.getFullYear(),
        pivotDate.getMonth() + 1))
    };

    const onDecreaseMonth = () => {
        setPivotDate(new Date(pivotDate.getFullYear(),
        pivotDate.getMonth() - 1))
    };

    return (
    <div>
        <div>
            <Header
            title={headerTitle}
            leftChild={
                <Button
                type="positive"
                text={"<"} onClick={onDecreaseMonth} />
                // onClick={() => {
                //     alert("positive button");
                // }} />
            }
            rightChild={
                <Button
                type="negative"
                text={">"} onClick={onIncreaseMonth} />
                // onClick={() => {
                //     alert("negative button");
                // }} />
            }
            />
        </div>
        <DiaryList data={filteredData} />
        {/* <Editor initData={{
            date: new Date().getTime(),
            emotionId: 1,
            content: "이전에 작성했던 샘플일기",
        }}
        onSubmit={() => {
            alert("작성완료를 클릭했대")
        }}/> */}
        
        </div>
    );
};
export default Home;