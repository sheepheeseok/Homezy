const Colorbox = ({options}) => {
    // 중복을 제거하기 위해 Set 사용
    const colorsSet = new Set();

    // 옵션값을 소문자로 변환하여 배열로 나누고, 색상만 필터링해서 Set에 추가
    options.forEach((option) => {
        const optionValue = option.option_value?.toLowerCase();

        if (optionValue?.includes("브라운")) {
            colorsSet.add("#A37E65"); // 브라운 색상
        } else if (optionValue?.includes("블루")) {
            colorsSet.add("#0000FF"); // 블루 색상
        } else if (optionValue?.includes("그린")) {
            colorsSet.add("#008000"); // 그린 색상
        } else if (optionValue?.includes("그레이")) {
            colorsSet.add("#9E9E9E"); // 그레이 색상
        } else if (optionValue?.includes("블랙")) {
            colorsSet.add("#000000"); // 그레이 색상
        }

    });

    // 중복되지 않는 색상만 처리
    return (<div className="option-item">
            {[...colorsSet].map((color, index) => (<div key={index}>
                    <div
                        className="Colorbox-css"
                        style={{backgroundColor: color}}
                    />
                </div>))}
        </div>);
};

export default Colorbox;
