import { useState, useEffect } from "react";

const useBanner = () => {
    const [isBannerVisible, setIsBannerVisible] = useState(true);  // 기본적으로 배너는 보이도록 설정
    const [isChecked, setIsChecked] = useState(() => {
        // 로컬 스토리지에서 체크박스 상태를 가져오고, 없으면 false로 설정
        const savedIsChecked = localStorage.getItem("isChecked");
        return savedIsChecked ? JSON.parse(savedIsChecked) : false; // 초기값 false로 설정
    });

    // 배너 닫기 핸들러
    const handleBannerClose = () => {
        const isChecked = JSON.parse(localStorage.getItem("isChecked") || "false");  // 로컬 스토리지에서 체크박스 상태를 읽어옴

        if (!isChecked) {
            // 체크박스를 선택하지 않고 배너를 닫으면 배너가 숨겨짐
            setIsBannerVisible(false);
            localStorage.removeItem("bannerClosedTime"); // 배너 닫힌 시간 제거
            return;
        }

        // 체크박스를 선택한 경우에만 24시간 후 다시 표시 로직 수행
        setIsBannerVisible(false);
        const currentTime = Date.now();
        const twentyFourHoursInMs = 86400000; // 24시간을 밀리초로 변환
        localStorage.setItem("bannerClosedTime", (currentTime + twentyFourHoursInMs).toString()); // 24시간 후에 배너 다시 표시
    };

    // 배너 표시 여부 확인
    const checkBannerVisibility = () => {
        const bannerClosedTime = localStorage.getItem("bannerClosedTime");
        const isChecked = JSON.parse(localStorage.getItem("isChecked") || "false"); // 체크박스 상태 확인

        if (isChecked) {
            // 체크박스를 선택한 상태일 때, 배너의 닫힌 시간이 있다면 그 시간까지 배너를 숨김
            const currentTime = Date.now();
            const closedTime = parseInt(bannerClosedTime, 10);

            if (currentTime < closedTime) {
                // 닫힌 시간이 아직 지나지 않은 경우 배너 숨김
                setIsBannerVisible(false);
            } else {
                // 시간이 지나면 배너를 표시
                setIsBannerVisible(true);
                localStorage.removeItem("bannerClosedTime"); // 시간이 지나면 배너 닫힌 시간 제거
            }
        }
    };

    useEffect(() => {

        checkBannerVisibility(); // 배너 표시 여부 확인

        // 1초마다 배너 표시 여부를 체크
        const interval = setInterval(() => {
            checkBannerVisibility();
        }, 1000);

        return () => clearInterval(interval); // 클린업
    }, []);

    const handleCheckboxChange = (newCheckedState) => {
        localStorage.setItem("isChecked", JSON.stringify(newCheckedState)); // 체크박스 상태를 로컬 스토리지에 저장
        // 체크박스 상태가 변경될 때마다 배너 표시 여부를 재확인
        checkBannerVisibility();
    };

    return {
        isBannerVisible,
        handleBannerClose,
        handleCheckboxChange,
        isChecked,
    };
};

export default useBanner;
