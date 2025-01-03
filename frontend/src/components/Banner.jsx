import React, { useState, useEffect } from 'react';
import { IoCloseOutline } from "react-icons/io5";

const Banner = ({ onClose, onCheckboxChange }) => {
    // 로컬 스토리지에서 체크 상태를 가져옴
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        const storedCheckedState = localStorage.getItem("isChecked");
        if (storedCheckedState !== null) {
            setIsChecked(JSON.parse(storedCheckedState)); // 로컬 스토리지에서 값 가져오기
        }
    }, []);

    const handleCheckboxToggle = () => {
        const newCheckedState = !isChecked;
        setIsChecked(newCheckedState); // 상태 변경
        localStorage.setItem("isChecked", JSON.stringify(newCheckedState)); // 로컬 스토리지에 저장
        onCheckboxChange(newCheckedState); // 부모에게 상태 전달
    };

    const handleBannerClose = () => {
        onClose();  // 배너를 닫을 때 부모로부터 전달받은 함수 호출
    };

    return (
        <div className="banner-container">
            <a className="banner-text">첫 쇼핑을 지원하는 3,000원 할인 회원가입 쿠폰</a>

            <div className="banner-checkbox-container">
                <label className="checkbox-label">
                    <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={handleCheckboxToggle}
                        className="checkbox-input"
                    />
                    <div className={`checkbox-box ${isChecked ? "checked" : "unchecked"}`}>
                        {isChecked && (
                            <svg xmlns="http://www.w3.org/2000/svg" className="checkbox-icon" fill="none" viewBox="0 0 24 24" stroke="black">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        )}
                    </div>
                    <span className="banner-subtext">오늘 하루 보지 않기</span>
                </label>
                <IoCloseOutline onClick={handleBannerClose} className="close-icon" />
            </div>
        </div>
    );
};

export default Banner;
