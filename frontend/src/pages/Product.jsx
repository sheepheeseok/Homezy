import {useNavigate, useParams} from 'react-router-dom';
import {useEffect, useState} from "react";
import {useProductStore} from "../store.jsx";

const Product = ({isBannerVisible}) => {
    const navigate = useNavigate();
    const {id} = useParams(); // URL에서 id를 받아옴
    const [mousePosition, setMousePosition] = useState({x: 0, y: 0});
    const [isMouseOverImage, setIsMouseOverImage] = useState(false);
    const [primaryImage, setPrimaryImage] = useState(null);
    const {mainCategory, subCategory, productData, fetchProducts, setProducts} = useProductStore((state) => state);

    const gohome = () => {
        navigate("/");  // 홈으로 이동
    };

    // 마우스가 이미지 위로 올려졌을 때의 동작
    const handleMouseMove = (e) => {
        const {left, top, width, height} = e.target.getBoundingClientRect();
        const squareSize = 250;  // 정사각형 크기

        // 마우스 위치 비율 계산
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;

        // 정사각형이 이미지 영역을 벗어나지 않도록 위치 제한
        const limitedX = Math.min(Math.max(x, (squareSize / width) * 50), 100 - (squareSize / width) * 50);
        const limitedY = Math.min(Math.max(y, (squareSize / height) * 50), 100 - (squareSize / height) * 50);

        setMousePosition({x: limitedX, y: limitedY});
    };

    // 마우스가 이미지에 올라갔을 때 상태 업데이트
    const handleMouseEnter = () => {
        setIsMouseOverImage(true);
    };

    // 마우스가 이미지 밖으로 나갔을 때 상태 업데이트
    const handleMouseLeave = () => {
        setIsMouseOverImage(false);
    };

    const handleImageClick = (imageUrl) => {
        setPrimaryImage(imageUrl); // 클릭된 이미지를 새로운 primaryImage로 설정
    };

    useEffect(() => {
        if (id) {
            setProducts([{productId: id}]);  // 제품 ID를 상태에 설정
            fetchProducts();  // 제품 상세 정보를 가져오는 함수 호출
        }
    }, [id, fetchProducts, setProducts]);

    if (!productData || productData.length === 0) return <div>Loading...</div>;

    const product = productData[0];
    const defaultPrimaryImage = product?.images?.find(image => image.is_primary)?.image_url || product?.images?.[0]?.image_url;

    const imageToShow = primaryImage || defaultPrimaryImage;
    const specImages = product?.images?.filter(image => image.image_type === 'spec') || [];

    return (<div className={`Product-container ${isBannerVisible ? 'top-[60px]' : 'top-[0px]'}`}>
        <div className="mt-[160px] w-full xl:max-w-[1485px] md:max-w-[1090px]">
            <a className="page-text-gray">
                <span onClick={gohome} className="home-text">홈 /</span>
                <span className="mr-[7px]">{mainCategory ? `${mainCategory} /` : "카테고리 없음"}</span>
                <span>{subCategory ? subCategory : ""}</span>
            </a>
            <div className="Product-info-area">
                <div className="Product-specpicture">
                    {specImages.length > 0 ? (
                        specImages.map((image, index) => (
                            <img
                                key={index}
                                src={image.image_url}
                                alt={`Spec image ${index}`}
                                onClick={() => handleImageClick(image.image_url)} // 클릭 시 이미지 변경
                                className="cursor-pointer"
                            />
                        ))
                    ) : (
                        <div>이미지가 없습니다.</div>
                    )}
                </div>
                <div
                    className="Product-picture"
                    onMouseMove={handleMouseMove}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <img src={imageToShow} alt="Product Image"/>
                    {isMouseOverImage && (<div
                        className="zoomed-area"
                        style={{
                            top: `${mousePosition.y}%`, left: `${mousePosition.x}%`,
                        }}
                    />)}
                </div>
                {/* 확대된 이미지 영역, 마우스 올렸을 때만 보이게 */}
                <div
                    className="enlarged-image-container"
                    style={{
                        display: isMouseOverImage ? 'block' : 'none', // 마우스가 올라갔을 때만 보이게
                        backgroundImage: `url(${primaryImage})`,
                        backgroundPosition: `${mousePosition.x}% ${mousePosition.y}%`, // 확대 영역 위치
                    }}
                />
            </div>
        </div>
    </div>);
};

export default Product;
