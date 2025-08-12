import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getCartItemsCount } = useCart();
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo" onClick={closeMenu}>
            <span className="logo-text">Oleo Organics</span>
            <span className="logo-subtitle">Natural Hair Care</span>
          </Link>

          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <ul className="nav-list">
              <li className="nav-item">
                <Link 
                  to="/" 
                  className={`nav-link ${isActiveLink('/') ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  to="/shop" 
                  className={`nav-link ${isActiveLink('/shop') ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  Shop
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  to="/about" 
                  className={`nav-link ${isActiveLink('/about') ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  to="/contact" 
                  className={`nav-link ${isActiveLink('/contact') ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  Contact
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  to="/cart" 
                  className={`nav-link cart-link ${isActiveLink('/cart') ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  <span className="cart-icon">🛒</span>
                  Cart
                  {getCartItemsCount() > 0 && (
                    <span className="cart-badge">{getCartItemsCount()}</span>
                  )}
                </Link>
              </li>
            </ul>
          </nav>

          <button 
            className="menu-toggle"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span className={`hamburger ${isMenuOpen ? 'hamburger-open' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
