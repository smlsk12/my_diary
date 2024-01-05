// 감정이미지 선택과 관련된 기능을 구현하기 위한 컴포넌트 생성

import React from "react";
import "./EmotionItem.css"
// 함수 EmotionItem은 부모인 editor컴포넌트에서 props를 통해
// 5개의 값을 받습니다.
// id: 감정이미지 아이디
// img: 감정미미지 주소
// name: 감정이미지 이름
// onClick: 감정이미지 클릭시 동작하는 이벤트함수
// isSelected: 감정이미지의 선택여부
const EmotionItem = ({id, img, name, onClick, isSelected}) => {
    const handleOnClick = () => {
        onClick(id);
    }
    return (
        <div className={["EmotionItem", isSelected ?
        `EmotionItem_on_${id}` : `EmotionItem_off`,].join(" ")}
        onClick={handleOnClick}>
         {/* <div className="EmotionItem" onClick={handleOnClick}> */}
            <img alt={`emotion${id}`} src={img} />
            <span>{name}</span>
        </div>

    )
}

export default React.memo(EmotionItem);