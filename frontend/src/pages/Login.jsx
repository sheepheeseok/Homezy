import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import AgreeCheckbox from "../components/Signup/AgreeCheckbox.jsx";

const Login = ({isBannerVisible}) => {
    const navigate = useNavigate();
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const gohome = () => navigate("/");
    const goSignup = () => navigate("/Signup");

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/login', {
                id: id, password: password
            });

            if (response.data.success) {
                alert("로그인 성공!");
                localStorage.setItem('token', response.data.token);
                navigate("/"); // 로그인 성공 후 대시보드 페이지로 이동
                window.location.reload();
            } else {
                // 오류 메시지 출력
                setErrorMessage(response.data.message);
            }
        } catch (error) {
            console.error('Login error:', error);
            // 서버 오류일 경우
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage("로그인 중 오류가 발생했습니다.");
            }
        }
    };

    return (<div className={`Login-container ${isBannerVisible ? 'top-[60px]' : 'top-[0px]'}`}>
            <div className="mt-[160px] w-full xl:max-w-[1485px] md:max-w-[1090px]">
                <a className="Signup-submaintext">
                    <span onClick={gohome} className="home-text">홈 /</span> 로그인
                </a>
                <div className="Signup-subcontainer">
                    <a className="Signup-maintext">로그인</a>

                    {/* 아이디와 비밀번호 입력란 */}
                    <input className="Login-inputbox mt-[42px]" type="text" placeholder="아이디" value={id}
                           onChange={(e) => setId(e.target.value)}/>
                    <input className="Login-inputbox mt-[10px]" type="text" placeholder="비밀번호" value={password}
                           onChange={(e) => setPassword(e.target.value)}/>
                    {errorMessage && <div className="Signup-warning-text">{errorMessage}</div>}
                    {/* 보안 접속 체크박스 */}
                    <div className="Login-checkbox-area">
                        <AgreeCheckbox/>
                        <a className="Login-text ml-[7px]">보안접속</a>
                    </div>

                    {/* 로그인 버튼 */}
                    <div className="Login-Login" onClick={handleLogin}>로그인</div>

                    {/* 아이디/비밀번호 찾기 */}
                    <div className="Login-find-area">
                        <a className="Login-text cursor-pointer">아이디 찾기</a>
                        <div className="find-line"></div>
                        <a className="Login-text cursor-pointer ml-[12.5px]">비밀번호 찾기</a>
                    </div>

                    {/* 회원가입 안내 */}
                    <div className="Login-Signup-box">
                        <a className="Login-box-text">아직 회원이 아니신가요?</a>
                        <a className="Login-box-subtext mt-[11px]">지금 회원가입을 하시면</a>
                        <a className="Login-box-subtext">다양하고 특별한 혜택이 준비되어 있습니다.</a>

                        {/* 회원가입 이동 버튼 */}
                        <div onClick={goSignup} className="Login-Signbox">
                            <a className="Login-Signbox-text">회원가입</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
}

export default Login;
