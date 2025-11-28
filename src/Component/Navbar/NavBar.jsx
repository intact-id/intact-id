import "./NavBar.css"
import logo from "../../assets/intact-logo.svg"
import { Link } from 'react-router-dom'

const NavBar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="logo">
                    <img src={logo} alt="Intact ID Logo" />
                </Link>
                <ul className="menu">
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <li>Home</li>
                    </Link>
                    <Link to="/features" style={{ textDecoration: 'none' }}>
                        <li>Features</li>
                    </Link>
                    <Link to="/about" style={{ textDecoration: 'none' }}>
                        <li>About</li>
                    </Link>
                    <Link to="/security" style={{ textDecoration: 'none' }}>
                        <li>Security</li>
                    </Link>
                    <Link to="/blog" style={{ textDecoration: 'none' }}>
                        <li>Resources</li>
                    </Link>
                    <Link to="/pricing" style={{ textDecoration: 'none' }}>
                        <li>Pricing</li>
                    </Link>
                    <Link to="/apply" style={{ textDecoration: 'none' }}>
                        <li className="Contact">Get Started</li>
                    </Link>
                </ul>
            </div>
        </nav>
    );
}
export default NavBar;