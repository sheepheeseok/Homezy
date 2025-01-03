import SwiperComponent from "../hooks/SwiperComponent.jsx";
import LifestyleCard from "../cards/LifestyleCard.jsx";

const Home = ({ isBannerVisible }) => {
    return(
        <div className={`home-container ${isBannerVisible ? 'top-[0px]' : 'top-[-60px]'}`}>
            <div className="mt-[200px] w-full xl:max-w-[1485px] md:max-w-[1090px]">
                <SwiperComponent/>
            </div>
            <div className="lifestyle">
                <a className="lifestyle-link">Lifestyle</a>
                <a className="lifestyle-subtitle">프리미엄 라이프스타일의 완성</a>
                <LifestyleCard/>
            </div>
            <div className="lifestyle">
                <a className="lifestyle-link">New Product</a>
                <a className="lifestyle-subtitle">새롭게 입고된 신상품들을 만나보세요</a>
            </div>
            <div className="lifestyle">
                <a className="lifestyle-link">비고</a>
            </div>
        </div>
    )
}

export default Home;