import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoChevronForwardSharp } from "react-icons/io5";
import { BsChevronDown } from "react-icons/bs";
import { IoIosArrowDropdown } from "react-icons/io";
import AgreeCheckbox from "../components/AgreeCheckbox.jsx";
import Agreedetailbox from "../components/Agreedetailbox.jsx"
import useSignupForm from "../hooks/useSignupForm.js";

const Signup = ({ isBannerVisible }) => {
    const navigate = useNavigate();
    const {
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
    } = useSignupForm(); // useSignupForm 훅 사용

    // 단계별 관리 상태
    const [currentStep, setCurrentStep] = useState(1);


    const gohome = () => { navigate("/")};

    const goBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
            window.location.reload();
        } else {
            gohome(); // 첫 번째 단계일 경우 홈으로 이동
            window.location.reload();
        }
    };

    // Id 부분
    const handleIdFocus = () => {
        // 경고 메시지가 표시된 상태에서는 포커스 시 메시지를 재표시하지 않음
        if (!hasWarningBeenShown) {
            setIsIdInputFocused(true);
        }
    };
    const handleIdBlur = (e) => {
        const idValue = e.target.value;
        setIsIdInputFocused(false);
        setIdValue(idValue); // 입력값을 상태에 저장

        // 아이디가 비어있다면
        if (idValue === "") {
            setIsIdInputEmpty(true);
            setIdWarningMessage("아이디를 입력해 주세요.");
            setHasWarningBeenShown(true); // 경고 메시지가 표시되었음을 추적
        } else if (!/^[a-z0-9]{4,16}$/.test(idValue)) {
            // 아이디가 영문소문자 또는 숫자 4~16자가 아닌 경우
            setIsIdInputEmpty(true);
            setIdWarningMessage("아이디는 영문소문자 또는 숫자 4~16자로 입력해 주세요.");
            setHasWarningBeenShown(true); // 경고 메시지가 표시되었음을 추적
        } else {
            setIsIdInputEmpty(true);
            setIdWarningMessage(`${idValue}는 사용 가능한 아이디입니다.`); // 입력한 아이디 값을 앞에 붙여서 메시지 설정
            setHasWarningBeenShown(true); // 경고 메시지가 표시되었음을 추적
        }
    };

    // Pw 부분
    const handlePasswordFocus = () => {
        setIsPasswordFocused(true); // 비밀번호 입력란에 포커스가 될 때 조건 메시지 표시
    };
    const handlePasswordBlur = (e) => {
        setIsPasswordFocused(false);
        const passwordValue = e.target.value;

        setPassword(passwordValue);

        // 비밀번호 조건 체크
        const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}|\[\]:;,.?\/<>-]).{10,16}$/;
        if (!passwordPattern.test(passwordValue)) {
            setIsPasswordValid(false);
            setPasswordWarningMessage("비밀번호를 다시 입력해주세요.");
        } else {
            setIsPasswordValid(true);
            setPasswordWarningMessage("");
        }
    };

    // Pw 확인 부분
    useEffect(() => {
        // 비밀번호와 비밀번호 확인이 일치하는지 여부를 검사
        if (confirmPassword !== password) {
            setIsConfirmPasswordMatch(false);
            setConfirmPasswordWarningMessage("비밀번호가 일치하지 않습니다.");
        } else {
            setIsConfirmPasswordMatch(true);
            setConfirmPasswordWarningMessage("");
        }
    }, [confirmPassword, password]); // confirmPassword나 password가 바뀔 때마다 실행
    const handleConfirmPasswordChange = (e) => {
        const confirmPasswordValue = e.target.value;
        setConfirmPassword(confirmPasswordValue);
    };
    const handleConfirmPasswordFocus = () => {
        // 경고 메시지가 있을 경우, 포커스를 취소
        if (confirmPasswordWarningMessage) {
            return; // 메시지가 있을 경우 포커스 상태를 변경하지 않음
        }
        else if (isConfirmPasswordMatch) {
            return; // 비밀번호와 확인 비밀번호가 일치하면 포커스 취소
        }

        setIsConfirmPasswordFocused(true);
    };
    const handleConfirmPasswordBlur = () => {
        setIsConfirmPasswordFocused(false);
    };

    // email 부분
    const handleEmailFocus = () => {
        if (emailWarningMessage || isEmailValid) {
            return; // 경고 메시지가 있거나 이메일이 유효한 경우 포커스 상태를 변경하지 않음
        }
        setIsEmailFocused(true); // 이메일 입력란에 포커스 설정
    };
    const handleEmailBlur = () => {
        setIsEmailFocused(false); // 이메일 입력란 포커스 해제

        // 이메일 값이 비어 있으면 "이메일을 입력해 주세요" 메시지 표시
        if (email === "") {
            setEmailWarningMessage("이메일을 입력해 주세요.");
            setIsEmailValid(false); // 유효하지 않음
        }
    };
    const handleEmailChange = (e) => {
        const emailValue = e.target.value;
        setEmail(emailValue); // 이메일 값 변경

        // 이메일이 비어있으면 "이메일을 입력해 주세요" 메시지 표시
        if (emailValue === "") {
            setEmailWarningMessage("이메일을 입력해 주세요.");
            setIsEmailValid(false);
        } else {
            // 이메일 유효성 검사 (정규 표현식)
            const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailPattern.test(emailValue)) {
                setIsEmailValid(false);
                setEmailWarningMessage("이메일 형식이 올바르지 않습니다.");
            } else {
                setIsEmailValid(true);
                setEmailWarningMessage(""); // 이메일이 유효하면 경고 메시지 제거
            }
        }
    };

    const toggleExpand = (number) => {
        setExpandedSections(prevState => {
            if (prevState.includes(number)) {
                return prevState.filter(item => item !== number); // 이미 펼쳐져 있으면 접음
            } else {
                return [...prevState, number]; // 펼쳐져 있지 않으면 펼침
            }
        });
    };

    const steps = [
        { id: 1, label: "약관동의", active: currentStep === 1 },
        { id: 2, label: "정보입력", active: currentStep === 2 },
        { id: 3, label: "가입완료", active: currentStep === 3 },
    ];

    const handleNextStep = () => {
        let isValid = true;

        // 체크박스 유효성 체크 (전체 동의 및 필수 체크박스)
        if (currentStep === 1 && (
            !checkboxes.termsOfUse ||
            !checkboxes.userData
        )) {
            isValid = false;
            alert("모든 필수 동의 항목을 체크해 주세요.");
        }

        // 아이디 유효성 체크
        if (currentStep === 2) {
            if (idValue === "") {
                isValid = false;
            } else if (!/^[a-z0-9]{4,16}$/.test(idValue)) {
                isValid = false;
            }
        }

        // 비밀번호 유효성 체크
        if (currentStep === 2 && (password === "" || !isPasswordValid)) {
            isValid = false;
        }

        // 비밀번호 확인 유효성 체크
        if (currentStep === 2 && (confirmPassword === "" || !isConfirmPasswordMatch)) {
            isValid = false;
        }

        // 이메일 유효성 체크
        if (currentStep === 2 && (email === "" || !isEmailValid)) {
            isValid = false;
        }

        // 2페이지일 때만 오류 메시지 출력
        if (!isValid && currentStep === 2) {
            alert("입력 정보를 확인해주세요");
        }

        // 모든 입력이 유효하면 다음 단계로 진행
        if (isValid && currentStep < steps.length) {
            setCurrentStep(currentStep + 1); // 다음 단계로 이동
        }
    };

    return(
        <div className={`Signup-container ${isBannerVisible ? 'top-[60px]' : 'top-[0px]'}`}>
            <div className="mt-[160px] w-full xl:max-w-[1485px] md:max-w-[1090px]">
                <a className="Signup-submaintext">
                    <span onClick={gohome} className="home-text">홈 /</span> 회원 가입
                </a>
                <div className="Signup-subcontainer">
                    <a className="Signup-maintext">회원 가입</a>
                    <div className="steps-container">
                        {steps.map((step, index) => (
                            <div key={step.id} className="step-item">
                            <span className={`step-text ${step.active ? "active" : ""}`}>
                                {step.id}. {step.label}
                            </span>
                                {/* 화살표 */}
                                {index < steps.length - 1 && (
                                    <IoChevronForwardSharp className="step-arrow"/>
                                )}
                            </div>
                        ))}
                    </div>
                    {currentStep === 1 && (
                        <div className="Signup-levelcontainer">
                            <a className="Signup-maintext2">전체 동의</a>
                            <div className="line"></div>
                            <div className="Signupcheckbox-container">
                                <AgreeCheckbox
                                    isCheckedInitial={checkboxes.agreeAll && checkboxes.termsOfUse && checkboxes.userData && checkboxes.alarm && checkboxes.sms && checkboxes.email}
                                    onToggle={(newState) => handleAgreeAll(newState)}
                                />
                                <div className="flex-col mt-5">
                                    <a className="Signup-maintext3">모든 약관을 확인하고 전체 동의합니다.</a>
                                    <a className="Signup-submaintext2">(전체 동의는 필수 및 선택 정보에 대한 동의가 포함되어 있습니다.)</a>
                                </div>
                            </div>

                            <div className="line2"></div>
                            <div className="Signupcheckbox-container">
                                <AgreeCheckbox isCheckedInitial={checkboxes.termsOfUse}
                                               onToggle={(newState) => setCheckboxes({
                                                   ...checkboxes,
                                                   termsOfUse: newState
                                               })}/>
                                <a className="agree-text">이용약관 동의 (필수)</a>
                                <BsChevronDown
                                    className={`Signup-down ${expandedSections.includes(1) ? "expanded" : ""}`}
                                    onClick={() => toggleExpand(1)}/>
                            </div>
                            <Agreedetailbox isExpanded={expandedSections.includes(1)} type={1}/>

                            <div className="Signupcheckbox-container2">
                                <AgreeCheckbox isCheckedInitial={checkboxes.userData}
                                               onToggle={(newState) => setCheckboxes({
                                                   ...checkboxes,
                                                   userData: newState
                                               })}/>
                                <a className="agree-text">개인정보 수집 및 이용 동의 (필수)</a>
                                <BsChevronDown
                                    className={`Signup-down ${expandedSections.includes(2) ? "expanded" : ""}`}
                                    onClick={() => toggleExpand(2)}/>
                            </div>
                            <Agreedetailbox isExpanded={expandedSections.includes(2)} type={2}/>

                            <div className="Signupcheckbox-container">
                                <AgreeCheckbox isCheckedInitial={checkboxes.alarm}
                                               onToggle={(newState) => setCheckboxes({
                                                   ...checkboxes,
                                                   alarm: newState
                                               })}/>
                                <a className="agree-text">쇼핑정보 수신 동의 (선택)</a>
                                <BsChevronDown
                                    className={`Signup-down ${expandedSections.includes(3) ? "expanded" : ""}`}
                                    onClick={() => toggleExpand(3)}/>
                            </div>
                            <div className="Signupcheckbox-subcontainer">
                                <AgreeCheckbox isCheckedInitial={checkboxes.sms}
                                               onToggle={(newState) => setCheckboxes({...checkboxes, sms: newState})}/>
                                <a className="agree-subtext">SMS 수신 동의 (선택)</a>
                                <AgreeCheckbox isCheckedInitial={checkboxes.Email}
                                               onToggle={(newState) => setCheckboxes({
                                                   ...checkboxes,
                                                   Email: newState
                                               })}/>
                                <a className="agree-subtext">이메일 수신 동의 (선택)</a>
                            </div>
                            <Agreedetailbox isExpanded={expandedSections.includes(3)} type={3}/>
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div className="Signup-levelcontainer">
                            <div className="line3"></div>
                            <div className={`Signup-id ${isIdInputEmpty && !isIdInputFocused ? 'expanded' : ''}`}>
                                <div className="Signup-form">
                                    <a className="Signup-essential">·</a>
                                    <a className="Signup-formtext">아이디</a>
                                </div>
                                <div className={`Signup-inputform ${isIdInputFocused ? "focused" : ""}`}>
                                    <input
                                        type="text"
                                        className="Signup-inputbox"
                                        value={idValue} // 입력값 바인딩
                                        onFocus={handleIdFocus}
                                        onBlur={handleIdBlur}
                                        onChange={(e) => setIdValue(e.target.value)} // 입력값이 변경될 때 상태 업데이트
                                    />
                                    <a className="Signup-inputform-text">(영문소문자/숫자, 4~16자)</a>
                                    {idWarningMessage && (
                                        <a
                                            className={`Signup-warning-text ${idWarningMessage.includes("사용 가능한 아이디") ? 'valid-id' : ''}`}
                                        >
                                            {idWarningMessage}
                                        </a>
                                    )}
                                </div>
                            </div>
                            <div className={`Signup-pw ${(!isPasswordValid || !isPasswordEmpty) ? 'expanded' : ''}`}>
                                <div className="Signup-form">
                                    <a className="Signup-essential">·</a>
                                    <a className="Signup-formtext">비밀번호</a>
                                </div>
                                <div className="Signup-inputform">
                                    <input
                                        type="password" // 보안을 위해 비밀번호 입력란은 password 타입으로 설정
                                        className="Signup-pwinputbox"
                                        onFocus={handlePasswordFocus}
                                        onBlur={handlePasswordBlur}
                                    />
                                    <a className="Signup-inputform-text">
                                        (영문 대소문자/숫자/특수문자 중 2가지 이상 조합, 10자~16자)
                                    </a>
                                    {isPasswordFocused && (
                                        <div className="Signup-password-help">
                                            <a className="Signup-helptext">※ 비밀번호 입력 조건</a>
                                            <a className="Signup-help-subtext mt-[13px]">- 대소문자/숫자/특수문자 중 2가지 이상 조합,
                                                10자~16자</a>
                                            <a className="Signup-help-subtext">- 입력가능 특수 문자</a>
                                            <a className="Signup-help-subtext"> ~ ` ! @ # $ ^ () * _ - {} [] | ; : , ?
                                                /</a>
                                            <a className="Signup-help-subtext">- 공백 입력 불가능</a>
                                            <a className="Signup-help-subtext">- 연속된 문자, 숫자 사용 불가능</a>
                                            <a className="Signup-help-subtext">- 동일한 문자, 숫자를 반복해서 사용 불가능</a>
                                            <a className="Signup-help-subtext">- 아이디 포함 불가능</a>
                                        </div>
                                    )}
                                    {/* 비밀번호 조건에 맞지 않으면 경고 메시지 표시 */}
                                    {!isPasswordValid && passwordWarningMessage && (
                                        <div className="Signup-warning-text">{passwordWarningMessage}</div>
                                    )}
                                </div>
                            </div>
                            <div
                                className={`Signup-repw ${!isConfirmPasswordMatch || isConfirmPasswordFocused ? 'expanded' : ''}`}>
                                <div className="Signup-form">
                                    <a className="Signup-essential">·</a>
                                    <a className="Signup-formtext">비밀번호 확인</a>
                                </div>
                                <div className="Signup-inputform">
                                    <input
                                        type="password"
                                        className="Signup-pwinputbox"
                                        value={confirmPassword}
                                        onChange={handleConfirmPasswordChange}
                                        onFocus={handleConfirmPasswordFocus}
                                        onBlur={handleConfirmPasswordBlur}
                                    />
                                    {!isConfirmPasswordMatch && !isConfirmPasswordFocused && (
                                        <div className="Signup-warning-text">{confirmPasswordWarningMessage}</div>
                                    )}
                                </div>
                            </div>
                            <div className="Signup-name">
                                <div className="Signup-form">
                                    <a className="Signup-formtext ml-[13px]">휴대전화</a>
                                </div>
                                <div className="Signup-inputform2 flex items-center">
                                    <select className="Signup-selectbox">
                                        <option value="010">010</option>
                                        <option value="011">011</option>
                                        <option value="016">016</option>
                                        <option value="017">017</option>
                                        <option value="018">018</option>
                                        <option value="019">019</option>
                                    </select>
                                    <span className="Signup-formtext ml-[13px] mb-[12px]">-</span>
                                    <input
                                        type="tel"
                                        className="Signup-selectbox ml-[13px]"
                                        pattern="[0-9]{4}"
                                        maxLength="4"
                                        required
                                    />
                                    <span className="Signup-formtext ml-[13px] mb-[12px]">-</span>
                                    <input
                                        type="tel"
                                        className="Signup-selectbox ml-[13px]"
                                        pattern="[0-9]{4}"
                                        maxLength="4"
                                        required
                                    />
                                </div>
                            </div>
                            <div className={`Signup-repw ${!isEmailValid || isEmailFocused ? 'expanded' : ''}`}>
                                <div className="Signup-form">
                                    <a className="Signup-essential">·</a>
                                    <a className="Signup-formtext">이메일</a>
                                </div>
                                <div className="Signup-inputform">
                                    <input
                                        type="text"
                                        className="Signup-inputbox"
                                        value={email}
                                        onFocus={handleEmailFocus}
                                        onBlur={handleEmailBlur}
                                        onChange={handleEmailChange}
                                    />
                                    {emailWarningMessage && (
                                        <div className="Signup-warning-text">
                                            {emailWarningMessage}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {currentStep === 3 && (
                        <div className="Signup-levelcontainer2">
                            <div className="line3"></div>
                            <IoIosArrowDropdown className="Signup-logo"/>
                            <a className="Signup-logotext">가입이 완료되었습니다!</a>
                            <a className="Signup-sublogotext">회원 가입이 성공적으로 완료되었습니다.</a>
                        </div>
                    )}

                    <div className="Signup-button">
                        {currentStep !== 3 && (
                            <button className="Signup-cancel" onClick={goBack}>취소</button>
                        )}
                        {currentStep === 3 ? (
                            <button className="Signup-next" onClick={gohome}>메인으로 가기</button>
                        ) : (
                            <button className="Signup-next" onClick={handleNextStep}>다음</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Signup;