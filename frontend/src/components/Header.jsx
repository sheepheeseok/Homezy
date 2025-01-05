import { useNavigate } from "react-router-dom";
import { IoChevronDownSharp } from "react-icons/io5";

const Header = ({ isBannerVisible }) => {
    const navigate = useNavigate();

    const links = [
        { name: "회원가입", onclick: () => navigate("/Signup") },
        { name: "로그인", onclick: () => console.log("로그인 클릭") },
        { name: "주문조회", onclick: () => console.log("주문조회 클릭") },
        { name: "최근본상품", onclick: () => console.log("최근본상품 클릭") },
        { name: "고객센터", onclick: () => console.log("고객센터 클릭") },
    ];

    return(
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
                        <IoChevronDownSharp className="w-[0.8rem] h-[0.8rem] text-gray-500 ml-[0.35rem]"/>
                    )}
                </a>
            ))}
        </div>
    )
}

export default Header;