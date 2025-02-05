import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import { useProductStore } from "../store.jsx";
import Colorbox from "../components/Colorbox.jsx";
import CartPopup from "../popups/CartPopup.jsx";
import PropTypes from 'prop-types';

const ProductCard = ({products}) => {
    const [isCartPopupOpen, setIsCartPopupOpen] = useState(false); // 팝업 상태 관리
    const [selectedProduct, setSelectedProduct] = useState(null); // 선택된 제품 정보 상태
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리
    const navigate = useNavigate(); // useHistory 대신 useNavigate 사용

    const { setProducts, fetchProducts, productData } = useProductStore();

    const handleOpenCartPopup = (product) => {
        setSelectedProduct(product); // 클릭한 제품 정보 설정
        setIsCartPopupOpen(true); // 팝업 열기
    };

    const handleCloseCartPopup = () => {
        setIsCartPopupOpen(false);
        setSelectedProduct(null);
    };

    // 로그인 상태를 체크하는 useEffect
    useEffect(() => {
        const token = localStorage.getItem("token"); // localStorage에서 토큰을 가져옴
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    // WISH 버튼 클릭 이벤트
    const handleWishButtonClick = () => {
        if (!isLoggedIn) {
            alert("로그인 후 관심상품 등록을 해주세요.");
            navigate("/Login"); // 로그인 페이지로 리디렉션 (useNavigate 사용)
        } else {
            // 로그인된 경우, 관심상품 처리 로직 추가
            console.log("관심상품 등록");
        }
    };

    // zustand 스토어에 제품 데이터를 설정하고 fetchProducts 호출
    useEffect(() => {
        setProducts(products); // 전달된 products 배열을 zustand에 설정
        fetchProducts(); // 제품 데이터를 불러오기
    }, [products, setProducts, fetchProducts]);

    if (productData.length === 0) {
        return <div>제품을 불러오는 중...</div>;
    }

    // 이미지 타입을 직접 지정하여 선택 (예: 'primary', 'detail')
    const imageType = 'primary'; // 원하는 타입을 지정 (primary, detail, spec 등)

    return (
        <div className="productCard-container">
            {productData.map((product, index) => (
                <div key={index} className="productCard-css">
                    {/* 제품 이미지 */}
                    {product.images && product.images.length > 0 ? (
                        // 지정된 imageType에 해당하는 이미지를 찾습니다
                        <img
                            src={product.images.find((img) => img.type === imageType)?.image_url ||
                                product.images.find((img) => img.type === 'primary')?.image_url ||
                                product.images[0].image_url}
                            alt={product.product.name}
                            className="cursor-pointer object-cover w-full h-full"
                        />
                    ) : (
                        <div>No image available</div>
                    )}

                    <a className="productCard-text mt-[30px]">{product.product.name}</a>
                    <a className="productCard-description">{product.product.description}</a>
                    <a className="productCard-price">
                        {product.product.base_price?.toLocaleString() || "0"}원
                    </a>
                    <div className="option-item">
                        <Colorbox options={product.options}/> {/* options 배열을 Colorbox로 전달 */}
                    </div>

                    <div className="button-background"></div>
                    <div className="button-container">
                        <button onClick={handleWishButtonClick} className="add-wish-button">WISH</button>
                        <button onClick={() => handleOpenCartPopup(product)} className="add-cart-button">ADD</button>
                    </div>

                    {/* 팝업 열기 */}
                    {isCartPopupOpen && selectedProduct && (
                        <CartPopup product={selectedProduct} onClose={handleCloseCartPopup}/>)}
                </div>
            ))}
        </div>
    );
};

// PropTypes 관련 코드를 아예 삭제하거나 주석 처리
ProductCard.propTypes = {
    products: PropTypes.arrayOf(PropTypes.shape({
        productId: PropTypes.number.isRequired,
    })).isRequired,
};

export default ProductCard;
