import { useState, useEffect } from "react"; // useEffect 추가
import { useNavigate } from "react-router-dom";
import { IoChevronDownSharp } from "react-icons/io5";

const Header = ({ isBannerVisible }) => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리

    // useEffect를 사용하여 컴포넌트가 처음 렌더링될 때 로그인 상태를 확인
    useEffect(() => {
        const token = localStorage.getItem("token"); // localStorage에서 토큰을 가져옴
        if (token) {
            setIsLoggedIn(true); // 토큰이 존재하면 로그인 상태로 설정
        }
    }, []); // 빈 배열을 두어 컴포넌트가 마운트 될 때만 실행되게 함

    const links = [
        { name: "회원가입", onclick: () => navigate("/Signup") },
        { name: "로그인", onclick: () => navigate("/Login") },
        { name: "주문조회", onclick: () => console.log("주문조회 클릭") },
        { name: "최근본상품", onclick: () => console.log("최근본상품 클릭") },
        { name: "고객센터", onclick: () => console.log("고객센터 클릭") },
    ];

    const handleLogout = () => {
        setIsLoggedIn(false); // 로그인 상태를 false로 변경
        localStorage.removeItem("token"); // 토큰 제거 (로그아웃 처리)
        navigate("/Login"); // 로그아웃 후 로그인 페이지로 이동
    };

    // 로그인을 했을 때 '로그인'을 '로그아웃'으로 변경
    if (isLoggedIn) {
        links[1] = { name: "로그아웃", onclick: handleLogout }; // '로그인'을 '로그아웃'으로 변경
    }

    return (
        <div className={`header-container ${isBannerVisible ? 'top-[60px]' : 'top-0'}`}>
            {links.map((link, index) => (
                <a
                    key={index}
                    className="text-gray-500 text-xs cursor-pointer px-2 flex"
                    onClick={(event) => {
                        event.preventDefault(); // 기본 동작 방지
                        if (link.onclick) link.onclick(); // onclick 함수 호출
                    }}
                >
                    {link.name}
                    {link.name === "고객센터" && (
                        <IoChevronDownSharp className="w-[0.8rem] h-[0.8rem] text-gray-500 ml-[0.35rem]" />
                    )}
                </a>
            ))}
        </div>
    );
};

export default Header;
