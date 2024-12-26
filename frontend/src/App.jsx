import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home.jsx";
import Header from "./components/Header.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {
    return(
    <>
        <Header/>
        <Navbar/>
        <Routes>
            <Route path="/" element={<Home/>} /> {/* 홈 */}
        </Routes>
    </>
    )
}

export default App;