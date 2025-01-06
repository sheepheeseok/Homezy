const LifestyleCard = () => {
    const lifestyleData = [{
        imgSrc: "https://ifh.cc/g/pzbB9f.jpg", text: "편안함이 느껴지는 원목 소파", subText: "자세히 살펴보기"
    }, {
        imgSrc: "https://ifh.cc/g/qXCASF.jpg", text: "감성 인테리어 소품 시즌 OFF", subText: "자세히 살펴보기"
    }, {
        imgSrc: "https://ifh.cc/g/mOw2DS.jpg", text: "감각적인 디자인 브랜드", subText: "자세히 살펴보기"
    }];

    return (<div className="lifestyle-cards-container">
            {/* map을 사용해 여러 개의 카드를 렌더링 */}
            {lifestyleData.map((item, index) => (<div key={index} className="lifestyle-card">
                    <a className="lifestylecard-text">{item.text}</a>
                    <a className="lifestylecard-subtext">{item.subText}</a>
                    <img src={item.imgSrc} alt="Lifestyle"/>
                </div>))}
        </div>)
}

export default LifestyleCard;