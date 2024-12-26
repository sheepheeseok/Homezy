import { useState, useEffect } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";
import { IoBagOutline } from "react-icons/io5";

const Navbar = () => {
    // 스크롤 위치 상태 추가
    const [isScrolled, setIsScrolled] = useState(false);

    // 스크롤 위치에 따라 상태 변경
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        // Cleanup
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const category = [
        { name: "Tables", subMenu: ["Blazer", "Jacket"]},
        { name: "Bed Frames" },
        { name: "Sideboards" },
        { name: "Couches" },
        { name: "Furniture" },
    ];

    const iconClass = "w-[1.6rem] h-[1.6rem] cursor-pointer";

    return(
        <div
            className={`fixed inset-x-0 ${isScrolled ? "top-0" : "top-[60px]"} w-full h-[80px] flex items-center xl:px-[218px] md:px-[46px] shadow-sm bg-white transition-all`}>
            {/* 왼쪽 영역: 로고, 메뉴 카테고리 항목 */}
            <a className="text-3xl font-serif">Homezy</a>
            <div className="ml-8 space-x-3 flex">
                {category.map((link, index) => (
                    <div key={index} className="relative group">
                        <a
                            href="#"
                            className="cursor-pointer link-style"
                        >
                            {link.name}
                        </a>
                        {/* 서브 메뉴 */}
                        {link.subMenu && (
                            <div
                                className="sub-menu">
                                {link.subMenu.map((item, idx) => (
                                    <a key={idx} href="#" className="block px-4 py-2 text-gray-700 hover:text-gray-950">
                                        {item}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* 오른쪽 영역: 아이콘 */}
            <div className="ml-auto flex items-center space-x-8 mr-2">
                <IoPersonOutline className={iconClass}/>
                <IoBagOutline className={iconClass}/>
                <IoSearchOutline className={iconClass}/>
            </div>
        </div>
    )
}

export default Navbar;