import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from "./pages/Home.jsx";
import Header from "./components/Header.jsx";
import Navbar from "./components/Navbar.jsx";
import Banner from "./components/Banner.jsx";
import useBanner from "./hooks/useBanner.js";
import Signup from "./pages/Signup.jsx";
import Footer from "./components/Footer.jsx";
import ScrollToTop from "./hooks/ScrollToTop.jsx";
import Login from "./pages/Login.jsx";
import Product from "./pages/Product.jsx";

function App() {
    const { isBannerVisible, handleBannerClose, handleCheckboxChange } = useBanner(); // isChecked는 로컬 스토리지에서 직접 관리하므로 불필요



    return(
    <>
        {isBannerVisible && (
            <Banner
                onClose={handleBannerClose}
                onCheckboxChange={handleCheckboxChange} // handleCheckboxChange만 전달
            />
        )}
        <Header isBannerVisible={isBannerVisible}/>
        <Navbar isBannerVisible={isBannerVisible}/>
            <ScrollToTop />
        <Routes>
            <Route path="/" element={<Home isBannerVisible={isBannerVisible}/>} /> {/* 홈 */}
            <Route path="/Signup" element={<Signup isBannerVisible={isBannerVisible}/>} /> {/* 회원가입 */}
            <Route path="/Login" element={<Login isBannerVisible={isBannerVisible}/>} /> {/* 로그인 */}
            <Route path="/Product/:id" element={<Product isBannerVisible={isBannerVisible}/>} /> {/* 제품 페이지 */}
        </Routes>
        <Footer/>
    </>
    )
}

export default App;