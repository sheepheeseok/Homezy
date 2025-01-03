import { useState, useEffect } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";
import { IoBagOutline } from "react-icons/io5";

const Navbar = ({ isBannerVisible }) => {
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
        { name: "Tables", subMenu: ["Table 1", "Table 2"]},
        { name: "Bed Frames" },
        { name: "Sideboards" },
        { name: "Couches" },
        { name: "Furniture" },
    ];

    const iconClass = "w-[1.6rem] h-[1.6rem] cursor-pointer";

    return(
        <div className={`navbar ${isScrolled ? 'scrolled' : 'initial'} ${isBannerVisible ? 'top-[120px]' : 'top-[60px]'}`}>
            {/* 왼쪽 영역: 로고, 메뉴 카테고리 항목 */}
            <a className="text-3xl font-serif">Homezy</a>
            <div className="ml-12 space-x-10 flex">
                {category.map((link, index) => (
                    <div key={index} className="relative group">
                        <a href="#" className="cursor-pointer link-style">
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