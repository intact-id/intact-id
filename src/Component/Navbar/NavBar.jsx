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
                    <li>Features</li>
                    <li>Security</li>
                    <Link to="/pricing" style={{ textDecoration: 'none' }}>
                        <li>Pricing</li>
                    </Link>
                    <Link to="/contact" style={{ textDecoration: 'none' }}>
                        <li className="Contact">Get Started</li>
                    </Link>
                </ul>
            </div>
        </nav>
    );
}
export default NavBar;