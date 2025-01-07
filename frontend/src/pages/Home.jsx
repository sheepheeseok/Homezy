import SwiperComponent from "../components/SwiperComponent.jsx";
import LifestyleCard from "../cards/LifestyleCard.jsx";
import ProductCard from "../cards/ProductCard.jsx";

const products = [{productId: 1}, {productId: 2}, {productId: 3}, {productId: 4}, {productId: 5}, {productId: 6}, {productId: 7}, {productId: 9}];

const Home = ({isBannerVisible}) => {
    return (<div className={`home-container ${isBannerVisible ? 'top-[0px]' : 'top-[-60px]'}`}>
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
                {products && products.length > 0 ? (<ProductCard products={products}/>) : (<p>현재 신상품이 없습니다.</p>)}
            </div>
        </div>)
}

export default Home;