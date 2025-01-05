import React, { useState, useEffect } from "react";

const AgreeCheckbox = ({ isCheckedInitial = false, onToggle }) => {
    const [isChecked, setIsChecked] = useState(isCheckedInitial);

    useEffect(() => {
        setIsChecked(isCheckedInitial);
    }, [isCheckedInitial]);

    // 체크박스를 클릭하면 상태를 토글하는 함수
    const toggleCheckbox = () => {
        const newCheckedState = !isChecked;
        setIsChecked(newCheckedState);
        if (onToggle) onToggle(newCheckedState); // 부모 컴포넌트에 상태 전달
    };

    return (
        <label className={`custom-Signupcheckbox ${isChecked ? "checked" : ""}`}>
            <input
                type="checkbox"
                checked={isChecked}
                onChange={toggleCheckbox} // onChange로 체크박스 상태 토글
                style={{display: "none"}} // 실제 input은 숨기고 스타일로만 체크박스를 표시
            />
            <span className="checkbox-mark"></span>
        </label>
    );
};

export default AgreeCheckbox;
