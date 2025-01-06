import {useState} from "react";
import {TfiClose, TfiPlus, TfiMinus} from "react-icons/tfi";
import PropTypes from "prop-types";

const CartPopup = ({product, onClose}) => {
    const imageUrl = product.images && product.images.length > 0 ? product.images.find((img) => img.is_primary)?.image_url || product.images[0].image_url : null;

    const [selectedProducts, setSelectedProducts] = useState([]); // 여러 제품을 관리
    const [selectedOptionValue, setSelectedOptionValue] = useState(""); // 선택된 옵션 값을 추적

    const handleChange = (e) => {
        const selectedValue = e.target.value;
        const selectedOption = product.options.find(option => option.option_value === selectedValue);

        if (selectedOption) {
            // 선택된 옵션이 이미 있는지 확인
            const existingProduct = selectedProducts.find(p => p.option === selectedValue);

            if (existingProduct) {
                // 이미 선택된 옵션이 있다면, 알림을 띄우고 해당 옵션을 삭제
                alert("아래 리스트에서 이미 선택된 옵션을 삭제 후 다시 선택해 주세요.");
                setSelectedOptionValue(""); // 선택 값을 초기화 (문구가 다시 보이도록)
                return; // 새로운 옵션을 추가하지 않음
            }

            const newProduct = {
                id: selectedValue, // 고유 식별자
                name: product.product.name, option: selectedValue, price: selectedOption.price, quantity: 1,
            };

            // 새로운 옵션 추가
            setSelectedProducts(prev => [...prev, newProduct]);
            setSelectedOptionValue(selectedValue);
        }
    };

    const handleRemove = (id) => {
        setSelectedProducts(prev => prev.filter(item => item.id !== id)); // 해당 제품 제거
    };

    const handleIncrease = (id) => {
        setSelectedProducts(prev => prev.map(item => item.id === id ? {...item, quantity: item.quantity + 1} : item));
    };

    const handleDecrease = (id) => {
        setSelectedProducts(prev => prev.map(item => item.id === id ? {
            ...item, quantity: item.quantity > 1 ? item.quantity - 1 : (() => {
                alert("최소 수량은 1개입니다");
                return item.quantity;
            })(),
        } : item));
    };

    const handlePopupClick = (e) => {
        e.stopPropagation(); // 클릭이 오버레이로 전달되지 않게 함
    };

    const totalQuantity = selectedProducts.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = selectedProducts.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (<div className="cart-popup-overlay" onClick={onClose}>
        <div className="cart-popup open" onClick={handlePopupClick}>
            <div className="cart-popup-container">
                <TfiClose className="close-button" onClick={onClose}/>
                <div className="cart-popup-content">
                    <a className="cartPopup-title">옵션 선택</a>
                    <div className="cart-popup-title">
                        {imageUrl && (<img
                            className="cartpopup-img"
                            src={imageUrl}
                        />)}
                        <a className="cart-popup-name ml-[13px]">{product.product.name}</a>
                    </div>
                    <div className="cart-popup-option">
                        <a className="cart-popup-name2">색상-사이즈</a>
                        <select
                            className="cart-popup-select"
                            required
                            onChange={handleChange}
                            value={selectedOptionValue} // 선택된 값을 추적
                        >
                            <option value="">
                                - [필수] 옵션을 선택해 주세요 -
                            </option>
                            {product.options.map((option, index) => (<option key={index} value={option.option_value}>
                                {option.option_value}
                            </option>))}
                        </select>
                    </div>
                    <div className="line2"></div>
                    {selectedProducts.map((item, index) => (<div className="cart-popup-cartbox" key={index}>
                        <div className="flex flex-col">
                            <a className="cart-popup-cartboxtext">{item.name}</a>
                            <a className="cart-popup-cartboxtext2">- {item.option}</a>
                        </div>
                        <div className="cart-popup-quantity-controls">
                            <button
                                className="cart-popup-quantity-btn"
                                onClick={() => handleDecrease(item.id)}
                            >
                                <TfiMinus/>
                            </button>
                            <span className="cart-popup-quantity">{item.quantity}</span>
                            <button
                                className="cart-popup-quantity-btn"
                                onClick={() => handleIncrease(item.id)}
                            >
                                <TfiPlus/>
                            </button>
                        </div>
                        <TfiClose
                            className="cart-popup-quantity2 fill-gray-400 cursor-pointer"
                            onClick={() => handleRemove(item.id)}
                        />
                        <a className="cart-popup-cartboxtext ml-[30px]">
                            {(item.price * item.quantity).toLocaleString()}원
                        </a>
                    </div>))}
                    <div className="cart-popup-resultbox">
                        <div className="cart-popup-left">
                            <a className="cart-popup-result">TOTAL</a>
                            <a className="cart-popup-result2">(QUANTITY)</a>
                        </div>
                        <div className="cart-popup-right">
                            <a className="cart-popup-result3">
                                {totalPrice.toLocaleString()}원
                            </a>
                            <a className="cart-popup-result4">({totalQuantity}개)</a>
                        </div>
                    </div>
                    <div className="cart-buy-box">
                        <div className="cart-cart-button">장바구니 담기</div>
                        <div className="cart-buy-button">바로구매</div>
                    </div>
                </div>
            </div>
        </div>
    </div>);
};

CartPopup.propTypes = {
    product: PropTypes.shape({
        images: PropTypes.array.isRequired, product: PropTypes.shape({
            name: PropTypes.string.isRequired, price: PropTypes.number, // 필수 아님으로 수정
        }).isRequired, options: PropTypes.arrayOf(PropTypes.shape({
            option_value: PropTypes.string.isRequired, price: PropTypes.number.isRequired,
        })).isRequired,
    }).isRequired, onClose: PropTypes.func.isRequired,
};

export default CartPopup;
