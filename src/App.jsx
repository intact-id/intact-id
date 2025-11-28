import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from "./Component/Navbar/NavBar.jsx";
import Hero from "./Component/Hero/Hero.jsx";
import Support from "./Component/support/Support.jsx";
import Contact from "./Component/Contact/Contact.jsx";
import Pricing from "./Component/Pricing/Pricing.jsx";
import Process from "./Component/Process/Process.jsx";
import Developer from "./Component/Developer/Developer.jsx";
import Footer from "./Component/Footer/Footer.jsx";
import About from "./Component/About/About.jsx";
import Features from "./Component/Features/Features.jsx";
import Security from "./Component/Security/Security.jsx";
import Apply from "./Component/Apply/Apply.jsx";
import HomeCTA from "./Component/HomeCTA/HomeCTA.jsx";
import Blog from "./Component/Blog/Blog.jsx";


const App = () => {
    return (
        <BrowserRouter>
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <NavBar />
                <Routes>
                    <Route path="/" element={
                        <>
                            <Hero />
                            <Support />
                            <Process />
                            <Developer />
                            <HomeCTA />
                        </>
                    } />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/pricing" element={<Pricing />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/features" element={<Features />} />
                    <Route path="/security" element={<Security />} />
                    <Route path="/apply" element={<Apply />} />
                    <Route path="/blog" element={<Blog />} />
                </Routes>
                <Footer />
            </div>
        </BrowserRouter>
    );
}
export default App;