import SwiperComponent from "../hooks/SwiperComponent.jsx";

const Home = () => {
    return(
        <div className="home-container">
            <div className="w-full xl:max-w-[1650px] md:max-w-[1090px] max-h-full">
                <SwiperComponent/>
            </div>
        </div>
    )
}

export default Home;