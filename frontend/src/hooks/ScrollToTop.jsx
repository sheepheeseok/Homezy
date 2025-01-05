import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0); // 페이지 이동 시 맨 위로 스크롤
    }, [pathname]); // 경로가 변경될 때마다 실행

    return null; // 렌더링할 UI는 없음
};

export default ScrollToTop;
