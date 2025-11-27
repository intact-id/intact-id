import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from "./Component/Navbar/NavBar.jsx";
import Hero from "./Component/Hero/Hero.jsx";
import Support from "./Component/support/Support.jsx";
import Contact from "./Component/Contact/Contact.jsx";
import Pricing from "./Component/Pricing/Pricing.jsx";
import Process from "./Component/Process/Process.jsx";
import Developer from "./Component/Developer/Developer.jsx";
import Ticker from "./Component/Ticker/Ticker.jsx";
import Footer from "./Component/Footer/Footer.jsx";


const App = () => {
    return (
        <BrowserRouter>
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <NavBar />
                <Routes>
                    <Route path="/" element={
                        <>
                            <Hero />
                            <Process />
                            <Developer />
                            <Support />
                        </>
                    } />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/pricing" element={<Pricing />} />
                </Routes>
                <Footer />
            </div>
        </BrowserRouter>
    );
}
export default App;