import { IoChevronDownSharp } from "react-icons/io5";

const Header = () => {

    const links = [
        { name: "회원가입" },
        { name: "로그인" },
        { name: "주문조회" },
        { name: "최근본상품" },
        { name: "고객센터" },
    ];


    return(
        <div className="header-container">
            {links.map((link, index) => (
                <a
                    key={index}
                    className="text-gray-500 text-xs cursor-pointer px-2 flex"
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