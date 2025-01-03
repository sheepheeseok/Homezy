import SwiperComponent from "../hooks/SwiperComponent.jsx";
import LifestyleCard from "../cards/LifestyleCard.jsx";

const Home = () => {
    return(
        <div className="home-container">
            <div className="mt-[140px] w-full xl:max-w-[1650px] md:max-w-[1090px]">
                <SwiperComponent/>
            </div>
            <div className="lifestyle">
                <a className="lifestyle-link">Lifestyle</a>
                <a className="lifestyle-subtitle">프리미엄 라이프스타일의 완성</a>
                <LifestyleCard />
            </div>
        </div>
    )
}

export default Home;