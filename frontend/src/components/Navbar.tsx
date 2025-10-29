import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          🎮 GameVault
        </Link>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/" className={`navbar-link ${isActive('/')}`}>
              Home
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/random" className={`navbar-link ${isActive('/random')}`}>
              Random
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/search" className={`navbar-link ${isActive('/search')}`}>
              Search
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/library" className={`navbar-link ${isActive('/library')}`}>
              Library
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
