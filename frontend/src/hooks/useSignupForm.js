// useSignupForm.js
import { useState } from 'react';

const useSignupForm = () => {
    const [idValue, setIdValue] = useState(""); // 아이디 값 상태
    const [isIdInputFocused, setIsIdInputFocused] = useState(false);
    const [isIdInputEmpty, setIsIdInputEmpty] = useState(false);
    const [hasWarningBeenShown, setHasWarningBeenShown] = useState(false); // 메시지가 한 번 표시되었는지 여부
    const [idWarningMessage, setIdWarningMessage] = useState("");

    const [password, setPassword] = useState(""); // 비밀번호 입력값
    const [isPasswordFocused, setIsPasswordFocused] = useState(false); // 비밀번호 입력란 포커스 상태
    const [isPasswordValid, setIsPasswordValid] = useState(true); // 비밀번호 유효 여부
    const [passwordWarningMessage, setPasswordWarningMessage] = useState(""); // 경고 메시지
    const [isPasswordEmpty, setIsPasswordEmpty] = useState(true); // 비밀번호 입력란이 비었는지 여부

    const [confirmPassword, setConfirmPassword] = useState(""); // 비밀번호 확인 상태
    const [isConfirmPasswordMatch, setIsConfirmPasswordMatch] = useState(true); // 비밀번호 확인 일치 여부
    const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] = useState(false); // 비밀번호 확인 포커스 상태
    const [confirmPasswordWarningMessage, setConfirmPasswordWarningMessage] = useState(""); // 경고 메시지

    const [email, setEmail] = useState(""); // 이메일 입력값
    const [isEmailValid, setIsEmailValid] = useState(true); // 이메일 유효성 여부
    const [emailWarningMessage, setEmailWarningMessage] = useState(""); // 이메일 경고 메시지
    const [isEmailFocused, setIsEmailFocused] = useState(false); // 이메일 입력란 포커스 상태

    const [checkboxes, setCheckboxes] = useState({
        agreeAll: false,
        termsOfUse: false,
        userData: false,
        alarm: false,
        sms: false,
        Email: false,
    });
    const [expandedSections, setExpandedSections] = useState([]);

    const handleAgreeAll = (checked) => {
        setCheckboxes({
            agreeAll: checked,
            termsOfUse: checked,
            userData: checked,
            alarm: checked,
            sms: checked,
            Email: checked,
        });
    };

    return {
        idValue, setIdValue,
        isIdInputFocused, setIsIdInputFocused,
        isIdInputEmpty, setIsIdInputEmpty,
        hasWarningBeenShown, setHasWarningBeenShown,
        idWarningMessage, setIdWarningMessage,

        password, setPassword,
        isPasswordFocused, setIsPasswordFocused,
        isPasswordValid, setIsPasswordValid,
        passwordWarningMessage, setPasswordWarningMessage,
        isPasswordEmpty, setIsPasswordEmpty,

        confirmPassword, setConfirmPassword,
        isConfirmPasswordMatch, setIsConfirmPasswordMatch,
        isConfirmPasswordFocused, setIsConfirmPasswordFocused,
        confirmPasswordWarningMessage, setConfirmPasswordWarningMessage,

        email, setEmail,
        isEmailValid, setIsEmailValid,
        emailWarningMessage, setEmailWarningMessage,
        isEmailFocused, setIsEmailFocused,

        checkboxes, setCheckboxes,
        expandedSections, setExpandedSections,
        handleAgreeAll
    };
};

export default useSignupForm;
