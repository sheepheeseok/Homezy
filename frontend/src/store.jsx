import { create } from 'zustand';
import axios from 'axios';

const useProductStore = create((set, get) => ({
    mainCategory: null, // 주 카테고리
    subCategory: null, // 서브 카테고리
    products: [], // 제품 목록
    productData: [], // 제품 상세 정보
    setProducts: (products) => set({ products }), // 제품 목록 설정
    setProductData: (data) => set({ productData: data }), // 제품 상세 정보 설정
    setCategories: (mainCategory, subCategory) => set({ mainCategory, subCategory }), // 카테고리 설정
    fetchProducts: async () => {
        try {
            const products = get().products; // 상태에서 제품 목록 가져오기
            const productPromises = products.map(async (product) => {
                const response = await axios.get(`http://localhost:3000/api/product/${product.productId}`);
                return response.data;
            });
            const productsData = await Promise.all(productPromises);

            // 주 카테고리와 서브 카테고리 정보 업데이트
            if (productsData.length > 0) {
                const { main_category, sub_category } = productsData[0].product; // 첫 번째 제품의 카테고리 정보 사용
                set({ mainCategory: main_category, subCategory: sub_category });
            }

            // 제품 데이터 상태 설정
            set({
                productData: productsData.map((productData) => ({
                    ...productData,
                    images: productData.images || [], // 기본값을 빈 배열로 설정
                    options: productData.options || [], // 옵션이 없는 경우 대비
                })),
            });
        } catch (err) {
            console.error("제품 데이터를 불러오는 데 실패했습니다.", err);
        }
    },
}));

export { useProductStore };
