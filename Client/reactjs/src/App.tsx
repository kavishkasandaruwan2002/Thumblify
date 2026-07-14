import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./globals.css";
import LenisScroll from "./components/LenisScroll";
import Genarate from "./pages/Genarate";
import Mygenaration from "./pages/Mygenaration";
import Ytpriew from "./pages/Ytpriew";
import Login from "./components/Login";


export default function App() {
    return (
        <>
            <LenisScroll />
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/generate" element={<Genarate />} />
                <Route path="/generate/:id" element={<Genarate />} />
                <Route path="/my-generations" element={<Mygenaration />} />
                <Route path="/ytpriew" element={<Ytpriew />} />
                <Route path="/login" element={<Login />} />
                {/* <Route path="/register" element={<Register />} /> */}
            </Routes>
            <Footer />
        </>
    );
}